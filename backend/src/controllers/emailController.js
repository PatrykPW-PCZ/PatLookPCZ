const Imap = require('node-imap');
const { simpleParser } = require('mailparser');
const nodemailer = require('nodemailer');
const EmailAccount = require('../models/EmailAccount');
const demoEmailController = require('./demoEmailController');

// Funkcja pomocnicza do mapowania nazw folderów
const getSentFolderName = (provider, requestedFolder) => {
  if (requestedFolder === 'INBOX') return 'INBOX';

  // Mapowanie folderów "Wysłane" dla różnych providerów
  const sentFolderMap = {
    'gmail': '[Gmail]/Sent Mail',
    'outlook': 'Sent Items',
    'yahoo': 'Sent',
    'onet': 'Wysłane',
    'wp': 'Sent',
    'interia': 'Wysłane',
    'DEMO': 'Sent'
  };

  // Mapowanie folderów "Kosz" dla różnych providerów
  const trashFolderMap = {
    'gmail': '[Gmail]/Trash',
    'outlook': 'Deleted Items',
    'yahoo': 'Trash',
    'onet': 'Kosz',
    'wp': 'Trash',
    'interia': 'Kosz',
    'DEMO': 'Trash'
  };

  // Jeśli requestedFolder zawiera "Sent" lub "[Gmail]", mapuj go
  if (requestedFolder.includes('Sent') || requestedFolder.includes('[Gmail]') || requestedFolder.includes('Wys')) {
    return sentFolderMap[provider.toLowerCase()] || 'Sent';
  }

  // Jeśli requestedFolder zawiera "Trash" lub "Kosz", mapuj go
  if (requestedFolder.includes('Trash') || requestedFolder.includes('Kosz') || requestedFolder.includes('Deleted')) {
    return trashFolderMap[provider.toLowerCase()] || 'Trash';
  }

  return requestedFolder;
};

const emailController = {
  async getEmails(req, res) {
    try {
      const { accountId } = req.params;
      let { folder = 'INBOX', limit = 50 } = req.query;

      const account = await EmailAccount.findById(accountId, req.userId);

      if (account && account.provider) {
        folder = getSentFolderName(account.provider, folder);
      }

      if (!account) {
        return res.status(404).json({ error: 'Konto nie znalezione' });
      }

      // Jeśli to konto DEMO, użyj demo kontrolera
      if (account.provider === 'DEMO') {
        return demoEmailController.getEmails(req, res);
      }

      const imap = new Imap({
        user: account.username,
        password: account.password,
        host: account.imap_host,
        port: account.imap_port,
        tls: account.use_tls === 1,
        tlsOptions: { rejectUnauthorized: false },
        connTimeout: 15000,
        authTimeout: 15000
      });

      const emails = [];
      let responseSent = false;

      imap.once('ready', () => {
        imap.openBox(folder, true, (err, box) => {
          if (err) {
            console.error('Błąd otwierania skrzynki:', err);
            if (!responseSent) {
              responseSent = true;
              return res.status(500).json({ error: 'Błąd otwierania skrzynki pocztowej' });
            }
            return;
          }

          const totalMessages = box.messages.total;
          if (totalMessages === 0) {
            imap.end();
            if (!responseSent) {
              responseSent = true;
              return res.json({ emails: [], total: 0 });
            }
            return;
          }

          const fetchLimit = Math.min(limit, totalMessages);
          const start = Math.max(1, totalMessages - fetchLimit + 1);

          const fetch = imap.seq.fetch(`${start}:${totalMessages}`, {
            bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'],
            struct: true
          });

          fetch.on('message', (msg, seqno) => {
            const email = { uid: seqno, flags: [] };

            msg.on('body', (stream, info) => {
              let buffer = '';
              stream.on('data', (chunk) => {
                buffer += chunk.toString('utf8');
              });
              stream.once('end', () => {
                const parsed = Imap.parseHeader(buffer);
                email.from = parsed.from ? parsed.from[0] : '';
                email.to = parsed.to ? parsed.to[0] : '';
                email.subject = parsed.subject ? parsed.subject[0] : '(bez tematu)';
                email.date = parsed.date ? parsed.date[0] : '';
              });
            });

            msg.once('attributes', (attrs) => {
              email.flags = attrs.flags;
              email.uid = attrs.uid;
            });

            msg.once('end', () => {
              emails.push(email);
            });
          });

          fetch.once('error', (err) => {
            console.error('Błąd pobierania wiadomości:', err);
            imap.end();
            if (!responseSent) {
              responseSent = true;
              return res.status(500).json({ error: 'Błąd pobierania wiadomości' });
            }
          });

          fetch.once('end', () => {
            if (!responseSent) {
              responseSent = true;
              res.json({ emails: emails.reverse(), total: emails.length });
            }
            imap.end();
          });
        });
      });

      imap.once('error', (err) => {
        console.error('Błąd IMAP:', err);
        if (!responseSent) {
          responseSent = true;
          return res.status(500).json({ error: 'Błąd połączenia z serwerem pocztowym' });
        }
      });

      imap.once('timeout', () => {
        console.error('Timeout IMAP dla konta:', account.email);
        if (!responseSent) {
          responseSent = true;
          imap.end();
          return res.status(408).json({ error: 'Przekroczono czas oczekiwania na odpowiedź serwera pocztowego' });
        }
      });

      imap.once('end', () => {
        if (!responseSent) {
          responseSent = true;
          res.json({ emails: emails.reverse(), total: emails.length });
        }
      });

      imap.connect();
    } catch (error) {
      console.error('Błąd pobierania emaili:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Błąd serwera' });
      }
    }
  },

  async getEmailById(req, res) {
    try {
      const { accountId, emailId } = req.params;
      let { folder = 'INBOX' } = req.query;

      const account = await EmailAccount.findById(accountId, req.userId);

      if (account && account.provider) {
        folder = getSentFolderName(account.provider, folder);
      }

      if (!account) {
        return res.status(404).json({ error: 'Konto nie znalezione' });
      }

      // Jeśli to konto DEMO, użyj demo kontrolera
      if (account.provider === 'DEMO') {
        return demoEmailController.getEmailById(req, res);
      }

      const imap = new Imap({
        user: account.username,
        password: account.password,
        host: account.imap_host,
        port: account.imap_port,
        tls: account.use_tls === 1,
        tlsOptions: { rejectUnauthorized: false },
        connTimeout: 15000,
        authTimeout: 15000
      });

      let responseSent = false;

      imap.once('ready', () => {
        imap.openBox(folder, false, (err, box) => {
          if (err) {
            console.error('Błąd otwierania skrzynki:', err);
            imap.end();
            if (!responseSent) {
              responseSent = true;
              return res.status(500).json({ error: 'Błąd otwierania skrzynki pocztowej' });
            }
            return;
          }

          const fetch = imap.fetch([emailId], {
            bodies: '',
            struct: true
          });

          fetch.on('message', (msg, seqno) => {
            let emailUid = null;

            msg.once('attributes', (attrs) => {
              emailUid = attrs.uid;
            });

            msg.on('body', (stream, info) => {
              simpleParser(stream, (err, parsed) => {
                if (err) {
                  console.error('Błąd parsowania emaila:', err);
                  imap.end();
                  if (!responseSent) {
                    responseSent = true;
                    return res.status(500).json({ error: 'Błąd parsowania wiadomości' });
                  }
                  return;
                }

                const email = {
                  uid: emailUid || emailId,
                  from: parsed.from?.text || '',
                  to: parsed.to?.text || '',
                  subject: parsed.subject || '(bez tematu)',
                  date: parsed.date || '',
                  text: parsed.text || '',
                  html: parsed.html || '',
                  attachments: parsed.attachments?.map(att => ({
                    filename: att.filename,
                    contentType: att.contentType,
                    size: att.size
                  })) || []
                };

                imap.end();
                if (!responseSent) {
                  responseSent = true;
                  res.json({ email });
                }
              });
            });
          });

          fetch.once('error', (err) => {
            console.error('Błąd pobierania wiadomości:', err);
            imap.end();
            if (!responseSent) {
              responseSent = true;
              return res.status(500).json({ error: 'Błąd pobierania wiadomości' });
            }
          });
        });
      });

      imap.once('error', (err) => {
        console.error('Błąd IMAP:', err);
        if (!responseSent) {
          responseSent = true;
          return res.status(500).json({ error: 'Błąd połączenia z serwerem pocztowym' });
        }
      });

      imap.once('timeout', () => {
        console.error('Timeout IMAP podczas pobierania emaila');
        if (!responseSent) {
          responseSent = true;
          imap.end();
          return res.status(408).json({ error: 'Przekroczono czas oczekiwania na odpowiedź serwera pocztowego' });
        }
      });

      imap.connect();
    } catch (error) {
      console.error('Błąd pobierania emaila:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Błąd serwera' });
      }
    }
  },

  async sendEmail(req, res) {
    try {
      const { accountId, to, subject, text, html } = req.body;
      const attachments = req.files || [];

      if (!accountId || !to || !subject || (!text && !html)) {
        return res.status(400).json({ error: 'Wymagane pola: accountId, to, subject, text lub html' });
      }

      const account = await EmailAccount.findById(accountId, req.userId);

      if (!account) {
        return res.status(404).json({ error: 'Konto nie znalezione' });
      }

      if (account.provider === 'DEMO') {
        return demoEmailController.sendEmail(req, res);
      }

      if (account.provider === 'wp') {
        return res.status(403).json({
          error: 'Aktualna polityka serwisu WP.pl nie pozwala na wysyłanie wiadomości z zewnętrznych aplikacji. Spróbuj z innego adresu e-mail (np. Onet, Interia, Gmail).'
        });
      }

      const transportConfig = {
        host: account.smtp_host,
        port: account.smtp_port,
        secure: account.smtp_port === 465,
        auth: {
          user: account.username,
          pass: account.password
        },
        tls: {
          rejectUnauthorized: false
        },
        debug: false,
        logger: false
      };

      const transporter = nodemailer.createTransport(transportConfig);

      const mailOptions = {
        from: account.email,
        to,
        subject,
        text,
        html,
        attachments: attachments.map(file => ({
          filename: file.originalname,
          content: file.buffer
        }))
      };

      const info = await transporter.sendMail(mailOptions);

      try {
        const sentFolder = getSentFolderName(account.provider, 'Sent');

        const imap = new Imap({
          user: account.username,
          password: account.password,
          host: account.imap_host,
          port: account.imap_port,
          tls: account.use_tls === 1,
          tlsOptions: { rejectUnauthorized: false }
        });

        imap.once('ready', () => {
          imap.openBox(sentFolder, false, (err, box) => {
            if (err) {
              imap.end();
              return;
            }

            // Stwórz surową wiadomość email w formacie RFC822
            const emailMessage = [
              `From: ${account.email}`,
              `To: ${to}`,
              `Subject: ${subject}`,
              `Date: ${new Date().toUTCString()}`,
              `Message-ID: ${info.messageId}`,
              'MIME-Version: 1.0',
              'Content-Type: text/plain; charset=utf-8',
              '',
              text || html || ''
            ].join('\r\n');

            imap.append(emailMessage, { mailbox: sentFolder, flags: ['\\Seen'] }, (err) => {
              imap.end();
            });
          });
        });

        imap.once('error', (err) => {});

        imap.connect();
      } catch (imapError) {
      }

      res.json({
        message: 'Wiadomość została wysłana',
        messageId: info.messageId
      });
    } catch (error) {
      let errorMessage = 'Błąd wysyłania wiadomości';

      if (error.code === 'EAUTH') {
        errorMessage = 'Błąd autoryzacji. Sprawdź dane logowania i upewnij się, że SMTP jest aktywny na koncie.';
        if (error.response && error.response.includes('wp.pl')) {
          errorMessage += ' Dla WP.pl musisz aktywować dostęp SMTP w ustawieniach konta na https://poczta.wp.pl';
        }
      } else if (error.code === 'ECONNECTION') {
        errorMessage = 'Nie można połączyć się z serwerem SMTP. Sprawdź ustawienia serwera.';
      } else if (error.code === 'ETIMEDOUT') {
        errorMessage = 'Przekroczono limit czasu połączenia z serwerem SMTP.';
      }

      res.status(500).json({
        error: errorMessage,
        details: error.message
      });
    }
  },

  async listFolders(req, res) {
    const { accountId } = req.params;

    try {
      const account = await EmailAccount.findById(accountId, req.userId);

      if (!account) {
        return res.status(404).json({ error: 'Konto nie znalezione' });
      }

      const imap = new Imap({
        user: account.username,
        password: account.password,
        host: account.imap_host,
        port: account.imap_port,
        tls: true,
        tlsOptions: { rejectUnauthorized: false }
      });

      imap.once('ready', () => {
        imap.getBoxes((err, boxes) => {
          if (err) {
            imap.end();
            return res.status(500).json({ error: 'Błąd pobierania folderów' });
          }

          // Rekurencyjna funkcja do spłaszczenia drzewa folderów
          const flattenBoxes = (boxes, prefix = '') => {
            let result = [];
            for (const [name, box] of Object.entries(boxes)) {
              const fullName = prefix ? `${prefix}${box.delimiter}${name}` : name;
              result.push({
                name: fullName,
                delimiter: box.delimiter,
                attribs: box.attribs,
                children: box.children ? Object.keys(box.children).length : 0
              });
              if (box.children) {
                result = result.concat(flattenBoxes(box.children, fullName));
              }
            }
            return result;
          };

          const folderList = flattenBoxes(boxes);

          imap.end();

          res.json({
            folders: folderList,
            provider: account.provider
          });
        });
      });

      imap.once('error', (err) => {
        res.status(500).json({ error: 'Błąd połączenia IMAP' });
      });

      imap.connect();
    } catch (error) {
      res.status(500).json({ error: 'Błąd serwera' });
    }
  },

  async getAllEmailsFromAllAccounts(req, res) {
    try {
      const { limit = 50, folder = 'INBOX' } = req.query;

      // Pobierz wszystkie konta użytkownika
      const accounts = await EmailAccount.findByUserId(req.userId);

      if (!accounts || accounts.length === 0) {
        return res.json({ emails: [], total: 0 });
      }

      // Funkcja do pobierania emaili z pojedynczego konta
      const fetchEmailsFromAccount = (account) => {
        return new Promise((resolve) => {
          // Jeśli to konto DEMO, użyj danych demo
          if (account.provider === 'DEMO') {
            const demoEmails = [
              {
                uid: 1,
                from: 'jan.kowalski@example.com',
                to: 'patrykaplikacja@onet.pl',
                subject: 'Witaj w PatLook!',
                date: new Date('2025-12-15T10:00:00').toISOString(),
                flags: [],
                accountName: account.email,
                accountId: account.id
              },
              {
                uid: 2,
                from: 'newsletter@firma.pl',
                to: 'patrykaplikacja@onet.pl',
                subject: 'Newsletter - Nowości w technologii',
                date: new Date('2025-12-14T15:30:00').toISOString(),
                flags: ['\\Seen'],
                accountName: account.email,
                accountId: account.id
              },
              {
                uid: 3,
                from: 'support@github.com',
                to: 'patrykaplikacja@onet.pl',
                subject: '[GitHub] Nowe powiadomienie',
                date: new Date('2025-12-14T09:15:00').toISOString(),
                flags: ['\\Seen'],
                accountName: account.email,
                accountId: account.id
              },
              {
                uid: 4,
                from: 'anna.nowak@firma.com',
                to: 'patrykaplikacja@onet.pl',
                subject: 'RE: Spotkanie projektowe',
                date: new Date('2025-12-13T14:20:00').toISOString(),
                flags: ['\\Seen'],
                accountName: account.email,
                accountId: account.id
              },
              {
                uid: 5,
                from: 'noreply@bank.pl',
                to: 'patrykaplikacja@onet.pl',
                subject: 'Potwierdzenie transakcji',
                date: new Date('2025-12-13T11:45:00').toISOString(),
                flags: ['\\Seen'],
                accountName: account.email,
                accountId: account.id
              },
              {
                uid: 6,
                from: 'info@uczelnia.edu.pl',
                to: 'patrykaplikacja@onet.pl',
                subject: 'Informacja o terminie obrony pracy inżynierskiej',
                date: new Date('2025-12-12T08:00:00').toISOString(),
                flags: [],
                accountName: account.email,
                accountId: account.id
              }
            ];
            setTimeout(() => resolve(demoEmails), 500);
            return;
          }

          // Dla rzeczywistych kont - pobierz przez IMAP
          EmailAccount.findById(account.id, req.userId)
            .then(fullAccount => {
              const imap = new Imap({
                user: fullAccount.username,
                password: fullAccount.password,
                host: fullAccount.imap_host,
                port: fullAccount.imap_port,
                tls: fullAccount.use_tls === 1,
                tlsOptions: { rejectUnauthorized: false },
                connTimeout: 10000,
                authTimeout: 10000
              });

              const emails = [];
              let resolved = false;

              const cleanup = () => {
                if (!resolved) {
                  resolved = true;
                  try {
                    imap.end();
                  } catch (e) {}
                }
              };

              imap.once('ready', () => {
                const targetFolder = getSentFolderName(fullAccount.provider, folder);
                imap.openBox(targetFolder, true, (err, box) => {
                  if (err) {
                    console.error(`Błąd otwierania skrzynki dla ${account.email}:`, err);
                    cleanup();
                    resolve([]);
                    return;
                  }

                  const totalMessages = box.messages.total;
                  if (totalMessages === 0) {
                    cleanup();
                    resolve([]);
                    return;
                  }

                  const fetchLimit = Math.min(20, totalMessages);
                  const start = Math.max(1, totalMessages - fetchLimit + 1);

                  const fetch = imap.seq.fetch(`${start}:${totalMessages}`, {
                    bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'],
                    struct: true
                  });

                  fetch.on('message', (msg, seqno) => {
                    const email = { uid: seqno, flags: [], accountName: account.email, accountId: account.id };

                    msg.on('body', (stream, info) => {
                      let buffer = '';
                      stream.on('data', (chunk) => {
                        buffer += chunk.toString('utf8');
                      });
                      stream.once('end', () => {
                        const parsed = Imap.parseHeader(buffer);
                        email.from = parsed.from ? parsed.from[0] : '';
                        email.to = parsed.to ? parsed.to[0] : '';
                        email.subject = parsed.subject ? parsed.subject[0] : '(bez tematu)';
                        email.date = parsed.date ? parsed.date[0] : '';
                      });
                    });

                    msg.once('attributes', (attrs) => {
                      email.flags = attrs.flags;
                      email.uid = attrs.uid;
                    });

                    msg.once('end', () => {
                      emails.push(email);
                    });
                  });

                  fetch.once('error', (err) => {
                    console.error(`Błąd pobierania dla ${account.email}:`, err);
                    cleanup();
                    resolve([]);
                  });

                  fetch.once('end', () => {
                    cleanup();
                    resolve(emails);
                  });
                });
              });

              imap.once('error', (err) => {
                console.error(`Błąd IMAP dla ${account.email}:`, err);
                cleanup();
                resolve([]);
              });

              // Timeout po 15 sekundach
              setTimeout(() => {
                if (!resolved) {
                  console.error(`Timeout dla ${account.email}`);
                  cleanup();
                  resolve([]);
                }
              }, 15000);

              imap.connect();
            })
            .catch(err => {
              console.error(`Błąd pobierania konta ${account.email}:`, err);
              resolve([]);
            });
        });
      };

      // Pobierz emaile ze wszystkich kont równolegle
      const emailPromises = accounts.map(account => fetchEmailsFromAccount(account));
      const emailArrays = await Promise.all(emailPromises);

      // Połącz wszystkie emaile w jedną tablicę
      const allEmails = emailArrays.flat();

      // Sortuj po dacie (najnowsze na górze)
      allEmails.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });

      // Ogranicz do limitu
      const limitedEmails = allEmails.slice(0, limit);

      res.json({ emails: limitedEmails, total: limitedEmails.length });
    } catch (error) {
      console.error('Błąd pobierania wszystkich emaili:', error);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  },

  async deleteEmail(req, res) {
    try {
      const { accountId, emailId } = req.params;
      let { folder = 'INBOX' } = req.query;

      const account = await EmailAccount.findById(accountId, req.userId);

      if (account && account.provider) {
        folder = getSentFolderName(account.provider, folder);
      }

      if (!account) {
        return res.status(404).json({ error: 'Konto nie znalezione' });
      }

      if (account.provider === 'DEMO') {
        return demoEmailController.deleteEmail(req, res);
      }

      const imap = new Imap({
        user: account.username,
        password: account.password,
        host: account.imap_host,
        port: account.imap_port,
        tls: account.use_tls === 1,
        tlsOptions: { rejectUnauthorized: false },
        connTimeout: 10000,
        authTimeout: 10000
      });

      let responseSent = false;
      let timeoutId = setTimeout(() => {
        if (!responseSent) {
          responseSent = true;
          imap.end();
          res.status(500).json({ error: 'Timeout połączenia z serwerem pocztowym' });
        }
      }, 30000);

      imap.once('ready', () => {
        imap.openBox(folder, false, (err, box) => {
          if (err) {
            clearTimeout(timeoutId);
            imap.end();
            if (!responseSent) {
              responseSent = true;
              return res.status(500).json({ error: 'Błąd otwierania skrzynki pocztowej' });
            }
            return;
          }

          imap.setFlags([emailId], ['\\Deleted'], (err) => {
            if (err) {
              clearTimeout(timeoutId);
              imap.end();
              if (!responseSent) {
                responseSent = true;
                return res.status(500).json({ error: 'Błąd usuwania wiadomości' });
              }
              return;
            }

            imap.expunge((err) => {
              clearTimeout(timeoutId);
              imap.end();
              if (!responseSent) {
                responseSent = true;
                res.json({ message: 'Wiadomość została usunięta' });
              }
            });
          });
        });
      });

      imap.once('error', (err) => {
        clearTimeout(timeoutId);
        if (!responseSent) {
          responseSent = true;
          return res.status(500).json({ error: 'Błąd połączenia z serwerem pocztowym: ' + err.message });
        }
      });

      imap.once('end', () => {
        clearTimeout(timeoutId);
      });

      imap.connect();
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ error: 'Błąd serwera: ' + error.message });
      }
    }
  },

  async moveToTrash(req, res) {
    try {
      const { accountId, emailId } = req.params;
      const { folder } = req.body;
      const sourceFolder = folder || 'INBOX';

      const account = await EmailAccount.findById(accountId, req.userId);

      if (!account) {
        return res.status(404).json({ error: 'Konto nie znalezione' });
      }

      const mappedSourceFolder = getSentFolderName(account.provider, sourceFolder);
      const trashFolder = getSentFolderName(account.provider, 'Trash');

      const imap = new Imap({
        user: account.username,
        password: account.password,
        host: account.imap_host,
        port: account.imap_port,
        tls: account.use_tls === 1,
        tlsOptions: { rejectUnauthorized: false },
        connTimeout: 15000,
        authTimeout: 15000
      });

      let responseSent = false;

      imap.once('ready', () => {
        imap.openBox(mappedSourceFolder, false, (err, box) => {
          if (err) {
            if (!responseSent) {
              responseSent = true;
              return res.status(500).json({ error: 'Błąd otwierania skrzynki pocztowej' });
            }
            return;
          }

          imap.move(emailId, trashFolder, (err) => {
            if (err) {
              imap.end();
              if (!responseSent) {
                responseSent = true;
                return res.status(500).json({ error: 'Błąd przenoszenia wiadomości do kosza' });
              }
              return;
            }

            imap.end();
          });
        });
      });

      imap.once('error', (err) => {
        if (!responseSent) {
          responseSent = true;
          return res.status(500).json({ error: 'Błąd połączenia z serwerem pocztowym' });
        }
      });

      imap.once('end', () => {
        if (!responseSent) {
          responseSent = true;
          res.json({ message: 'Wiadomość przeniesiona do kosza' });
        }
      });

      imap.connect();
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ error: 'Błąd serwera: ' + error.message });
      }
    }
  },

  async emptyTrash(req, res) {
    try {
      const { accountId } = req.params;

      const account = await EmailAccount.findById(accountId, req.userId);

      if (!account) {
        return res.status(404).json({ error: 'Konto nie znalezione' });
      }

      const trashFolder = getSentFolderName(account.provider, 'Trash');

      const imap = new Imap({
        user: account.username,
        password: account.password,
        host: account.imap_host,
        port: account.imap_port,
        tls: account.use_tls === 1,
        tlsOptions: { rejectUnauthorized: false },
        connTimeout: 15000,
        authTimeout: 15000
      });

      let responseSent = false;

      imap.once('ready', () => {
        imap.openBox(trashFolder, false, (err, box) => {
          if (err) {
            if (!responseSent) {
              responseSent = true;
              return res.status(500).json({ error: 'Błąd otwierania kosza' });
            }
            return;
          }

          const totalMessages = box.messages.total;

          if (totalMessages === 0) {
            imap.end();
            if (!responseSent) {
              responseSent = true;
              return res.json({ message: 'Kosz jest pusty' });
            }
            return;
          }

          imap.addFlags('1:*', ['\\Deleted'], (err) => {
            if (err) {
              imap.end();
              if (!responseSent) {
                responseSent = true;
                return res.status(500).json({ error: 'Błąd oznaczania wiadomości do usunięcia' });
              }
              return;
            }

            imap.expunge((err) => {
              if (err) {
                imap.end();
                if (!responseSent) {
                  responseSent = true;
                  return res.status(500).json({ error: 'Błąd usuwania wiadomości' });
                }
                return;
              }

              imap.end();
            });
          });
        });
      });

      imap.once('error', (err) => {
        if (!responseSent) {
          responseSent = true;
          return res.status(500).json({ error: 'Błąd połączenia z serwerem pocztowym' });
        }
      });

      imap.once('end', () => {
        if (!responseSent) {
          responseSent = true;
          res.json({ message: 'Kosz został opróżniony' });
        }
      });

      imap.connect();
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ error: 'Błąd serwera: ' + error.message });
      }
    }
  },

  async toggleImportant(req, res) {
    try {
      const { accountId, emailId } = req.params;
      const { folder = 'INBOX', flagged = true } = req.body;

      const account = await EmailAccount.findById(accountId, req.userId);

      if (!account) {
        return res.status(404).json({ error: 'Konto nie znalezione' });
      }

      const mappedFolder = getSentFolderName(account.provider, folder);

      const imap = new Imap({
        user: account.username,
        password: account.password,
        host: account.imap_host,
        port: account.imap_port,
        tls: account.use_tls,
        tlsOptions: { rejectUnauthorized: false }
      });

      let responseSent = false;

      imap.once('ready', () => {
        imap.openBox(mappedFolder, false, (err, box) => {
          if (err) {
            imap.end();
            if (!responseSent) {
              responseSent = true;
              return res.status(500).json({ error: 'Błąd otwierania folderu' });
            }
            return;
          }

          const action = flagged ? 'addFlags' : 'delFlags';

          imap[action](emailId, '\\Flagged', (err) => {
            imap.end();

            if (err) {
              if (!responseSent) {
                responseSent = true;
                return res.status(500).json({ error: 'Błąd zmiany flagi wiadomości' });
              }
              return;
            }

            if (!responseSent) {
              responseSent = true;
              res.json({
                message: flagged ? 'Wiadomość oznaczona jako ważna' : 'Wiadomość odznaczona jako ważna',
                flagged
              });
            }
          });
        });
      });

      imap.once('error', (err) => {
        if (!responseSent) {
          responseSent = true;
          res.status(500).json({ error: 'Błąd połączenia IMAP: ' + err.message });
        }
      });

      imap.once('end', () => {});

      imap.connect();
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ error: 'Błąd serwera: ' + error.message });
      }
    }
  },

  async markAsRead(req, res) {
    try {
      const { accountId, emailId } = req.params;
      const { folder = 'INBOX' } = req.body;

      const account = await EmailAccount.findById(accountId, req.userId);

      if (!account) {
        return res.status(404).json({ error: 'Konto nie znalezione' });
      }

      const mappedFolder = getSentFolderName(account.provider, folder);

      const imap = new Imap({
        user: account.username,
        password: account.password,
        host: account.imap_host,
        port: account.imap_port,
        tls: account.use_tls,
        tlsOptions: { rejectUnauthorized: false }
      });

      let responseSent = false;

      imap.once('ready', () => {
        imap.openBox(mappedFolder, false, (err, box) => {
          if (err) {
            imap.end();
            if (!responseSent) {
              responseSent = true;
              return res.status(500).json({ error: 'Błąd otwierania folderu' });
            }
            return;
          }

          imap.addFlags(emailId, '\\Seen', (err) => {
            imap.end();

            if (err) {
              if (!responseSent) {
                responseSent = true;
                return res.status(500).json({ error: 'Błąd oznaczania wiadomości jako przeczytanej' });
              }
              return;
            }

            if (!responseSent) {
              responseSent = true;
              res.json({ message: 'Wiadomość oznaczona jako przeczytana' });
            }
          });
        });
      });

      imap.once('error', (err) => {
        if (!responseSent) {
          responseSent = true;
          res.status(500).json({ error: 'Błąd połączenia IMAP: ' + err.message });
        }
      });

      imap.once('end', () => {});

      imap.connect();
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ error: 'Błąd serwera: ' + error.message });
      }
    }
  }
};

module.exports = emailController;
