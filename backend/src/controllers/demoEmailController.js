// Kontroler z przykładowymi danymi do demonstracji

const demoEmails = [
  {
    uid: 1,
    from: 'jan.kowalski@example.com',
    to: 'patrykaplikacja@onet.pl',
    subject: 'Witaj w PatLook!',
    date: new Date('2025-12-15T10:00:00').toISOString(),
    flags: [],
    text: 'To jest przykładowa wiadomość demonstracyjna. PatLook pozwala zarządzać wieloma kontami pocztowymi z jednego miejsca.',
    html: '<p>To jest <strong>przykładowa wiadomość</strong> demonstracyjna.</p><p>PatLook pozwala zarządzać wieloma kontami pocztowymi z jednego miejsca.</p>',
    attachments: []
  },
  {
    uid: 2,
    from: 'newsletter@firma.pl',
    to: 'patrykaplikacja@onet.pl',
    subject: 'Newsletter - Nowości w technologii',
    date: new Date('2025-12-14T15:30:00').toISOString(),
    flags: ['\\Seen'],
    text: 'Witamy w naszym newsletterze! Dziś prezentujemy najnowsze trendy w technologii...',
    html: '<h1>Newsletter</h1><p>Witamy w naszym newsletterze!</p>',
    attachments: []
  },
  {
    uid: 3,
    from: 'support@github.com',
    to: 'patrykaplikacja@onet.pl',
    subject: '[GitHub] Nowe powiadomienie',
    date: new Date('2025-12-14T09:15:00').toISOString(),
    flags: ['\\Seen'],
    text: 'Otrzymałeś nowe powiadomienie z GitHub. Ktoś skomentował Twój issue #123.',
    html: '<p>Otrzymałeś nowe powiadomienie z <strong>GitHub</strong>.</p>',
    attachments: []
  },
  {
    uid: 4,
    from: 'anna.nowak@firma.com',
    to: 'patrykaplikacja@onet.pl',
    subject: 'RE: Spotkanie projektowe',
    date: new Date('2025-12-13T14:20:00').toISOString(),
    flags: ['\\Seen'],
    text: 'Dziękuję za wczorajsze spotkanie. Przesyłam notatki z dyskusji...',
    html: '<p>Dziękuję za wczorajsze spotkanie.</p><p>Przesyłam notatki z dyskusji...</p>',
    attachments: [
      { filename: 'notatki.pdf', contentType: 'application/pdf', size: 245000 }
    ]
  },
  {
    uid: 5,
    from: 'noreply@bank.pl',
    to: 'patrykaplikacja@onet.pl',
    subject: 'Potwierdzenie transakcji',
    date: new Date('2025-12-13T11:45:00').toISOString(),
    flags: ['\\Seen'],
    text: 'Transakcja na kwotę 150.00 PLN została zrealizowana.',
    html: '<p>Transakcja na kwotę <strong>150.00 PLN</strong> została zrealizowana.</p>',
    attachments: []
  },
  {
    uid: 6,
    from: 'info@uczelnia.edu.pl',
    to: 'patrykaplikacja@onet.pl',
    subject: 'Informacja o terminie obrony pracy inżynierskiej',
    date: new Date('2025-12-12T08:00:00').toISOString(),
    flags: [],
    text: 'Szanowny Studencie, informujemy że termin obrony pracy inżynierskiej został ustalony na 15 stycznia 2026.',
    html: '<p>Szanowny Studencie,</p><p>Informujemy że termin obrony pracy inżynierskiej został ustalony na <strong>15 stycznia 2026</strong>.</p>',
    attachments: []
  }
];

const demoEmailController = {
  async getEmails(req, res) {
    try {
      // Symuluj małe opóźnienie jak prawdziwe połączenie
      await new Promise(resolve => setTimeout(resolve, 500));

      res.json({
        emails: demoEmails.map(email => ({
          uid: email.uid,
          from: email.from,
          to: email.to,
          subject: email.subject,
          date: email.date,
          flags: email.flags
        })),
        total: demoEmails.length
      });
    } catch (error) {
      console.error('Błąd pobierania demo emaili:', error);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  },

  async getEmailById(req, res) {
    try {
      const { emailId } = req.params;

      await new Promise(resolve => setTimeout(resolve, 300));

      const email = demoEmails.find(e => e.uid === parseInt(emailId));

      if (!email) {
        return res.status(404).json({ error: 'Wiadomość nie znaleziona' });
      }

      res.json({ email });
    } catch (error) {
      console.error('Błąd pobierania demo emaila:', error);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  },

  async sendEmail(req, res) {
    try {
      const { to, subject, text } = req.body;

      await new Promise(resolve => setTimeout(resolve, 800));

      // W trybie demo tylko symulujemy wysłanie
      res.json({
        message: 'Wiadomość została wysłana (tryb demo)',
        messageId: 'demo-' + Date.now()
      });
    } catch (error) {
      console.error('Błąd wysyłania demo emaila:', error);
      res.status(500).json({ error: 'Błąd wysyłania wiadomości' });
    }
  },

  async deleteEmail(req, res) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      res.json({ message: 'Wiadomość została usunięta (tryb demo)' });
    } catch (error) {
      console.error('Błąd usuwania demo emaila:', error);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  }
};

module.exports = demoEmailController;
