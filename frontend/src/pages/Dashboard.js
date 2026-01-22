import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { accountsAPI, emailsAPI, labelsAPI } from '../services/api';
import AccountList from '../components/AccountList';
import EmailList from '../components/EmailList';
import EmailView from '../components/EmailView';
import ComposeEmail from '../components/ComposeEmail';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState('INBOX');
  const [emailFilter, setEmailFilter] = useState('all'); // all, unread, read, important
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [showAccountsList, setShowAccountsList] = useState(false);
  const [error, setError] = useState('');
  const [replyData, setReplyData] = useState(null);
  const [labels, setLabels] = useState([]);
  const [showLabelsManager, setShowLabelsManager] = useState(false);
  const [emailLabels, setEmailLabels] = useState({});
  const [selectedLabelFilter, setSelectedLabelFilter] = useState(null);

  useEffect(() => {
    loadAccounts();
    loadLabels();
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      loadEmails(selectedAccount.id, selectedFolder);
    }
  }, [selectedAccount, selectedFolder]);

  const loadAccounts = async () => {
    try {
      const response = await accountsAPI.getAll();
      setAccounts(response.data.accounts);
    } catch (error) {
      setError('Błąd pobierania kont');
      console.error(error);
    }
  };

  const loadLabels = async () => {
    try {
      const response = await labelsAPI.getAll();
      setLabels(response.data.labels || []);
    } catch (error) {
      console.error('Błąd pobierania etykiet:', error);
    }
  };

  const loadEmails = async (accountId, folder = 'INBOX') => {
    setLoading(true);
    setError('');
    try {
      let response;
      // Jeśli wybrano "Wszystkie wiadomości", użyj specjalnego endpointu
      if (accountId === 'all') {
        response = await emailsAPI.getAllEmailsFromAllAccounts(50, folder);
      } else {
        response = await emailsAPI.getEmails(accountId, folder);
      }

      // Sortowanie: nieprzeczytane na górze, potem po dacie (od najnowszych)
      const sortedEmails = (response.data.emails || []).sort((a, b) => {
        // Najpierw nieprzeczytane
        const aUnread = !a.flags || !a.flags.includes('\\Seen');
        const bUnread = !b.flags || !b.flags.includes('\\Seen');

        if (aUnread && !bUnread) return -1;
        if (!aUnread && bUnread) return 1;

        // Potem po dacie (najnowsze pierwsze)
        const dateA = new Date(a.date || 0);
        const dateB = new Date(b.date || 0);
        return dateB - dateA;
      });

      setEmails(sortedEmails);

      // Załaduj etykiety dla każdego emaila
      sortedEmails.forEach(email => {
        const emailAccountId = accountId === 'all' ? email.accountId : accountId;
        if (emailAccountId && email.uid) {
          loadEmailLabels(emailAccountId, email.uid);
        }
      });
    } catch (error) {
      setError('Błąd pobierania wiadomości');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
    setSelectedEmail(null);
    setSelectedFolder('INBOX'); // Reset do INBOX przy zmianie konta
  };

  const handleFolderChange = (folder) => {
    setSelectedFolder(folder);
    setSelectedEmail(null);
  };

  const handleEmailSelect = async (email) => {
    if (selectedAccount) {
      try {
        // Dla trybu "Wszystkie wiadomości", użyj accountId z emaila
        const accountId = selectedAccount.id === 'all' ? email.accountId : selectedAccount.id;

        const response = await emailsAPI.getEmailById(
          accountId,
          email.uid,
          selectedFolder
        );

        // Dodaj accountId i accountName do emaila, aby były dostępne przy usuwaniu
        const emailWithAccount = {
          ...response.data.email,
          accountId: accountId,
          accountName: email.accountName
        };

        setSelectedEmail(emailWithAccount);

        // Oznacz wiadomość jako przeczytaną, jeśli jest nieodczytana
        const isUnread = !email.flags || !email.flags.includes('\\Seen');
        if (isUnread) {
          try {
            await emailsAPI.markAsRead(accountId, email.uid, selectedFolder);
            // Odśwież listę emaili po oznaczeniu jako przeczytane
            handleRefresh();
          } catch (error) {
            console.error('Błąd oznaczania jako przeczytane:', error);
          }
        }
      } catch (error) {
        setError('Błąd pobierania wiadomości');
        console.error(error);
      }
    }
  };

  const handleRefresh = () => {
    if (selectedAccount) {
      loadEmails(selectedAccount.id, selectedFolder);
    }
  };

  const handleSendEmail = async (emailData) => {
    try {
      // Jeśli emailData jest FormData (z załącznikami), wyślij bezpośrednio
      if (emailData instanceof FormData) {
        await emailsAPI.sendEmail(emailData);
      } else {
        // Jeśli to zwykły obiekt, wyślij jak wcześniej
        await emailsAPI.sendEmail({
          ...emailData,
          accountId: emailData.accountId || selectedAccount.id,
        });
      }
      setShowCompose(false);
      alert('Wiadomość została wysłana!');
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Błąd wysyłania wiadomości';
      alert(errorMessage);
      console.error(error);
      throw error; // Przepuść błąd dalej do ComposeEmail
    }
  };

  const handleDeleteEmail = async (accountId, emailId) => {
    try {
      if (selectedFolder === 'Trash') {
        // Jeśli jesteśmy w koszu, usuń na stałe
        if (window.confirm('Czy na pewno chcesz trwale usunąć tę wiadomość?')) {
          await emailsAPI.deleteEmail(accountId, emailId, selectedFolder);
          alert('Wiadomość została trwale usunięta!');
          setSelectedEmail(null);
          if (selectedAccount) {
            loadEmails(selectedAccount.id, selectedFolder);
          }
        }
      } else {
        // W przeciwnym razie przenieś do kosza
        await emailsAPI.moveToTrash(accountId, emailId, selectedFolder);
        alert('Wiadomość przeniesiona do kosza!');
        setSelectedEmail(null);
        if (selectedAccount) {
          loadEmails(selectedAccount.id, selectedFolder);
        }
      }
    } catch (error) {
      alert('Błąd usuwania wiadomości');
      console.error(error);
    }
  };

  const handleEmptyTrash = async () => {
    if (window.confirm('Czy na pewno chcesz opróżnić kosz? Wszystkie wiadomości zostaną trwale usunięte.')) {
      try {
        await emailsAPI.emptyTrash(selectedAccount.id);
        alert('Kosz został opróżniony!');
        setSelectedEmail(null);
        loadEmails(selectedAccount.id, selectedFolder);
      } catch (error) {
        alert('Błąd opróżniania kosza');
        console.error(error);
      }
    }
  };

  const handleReply = (email) => {
    // Wyciągnij adres email z pola "from" (może być w formacie "Name <email@example.com>")
    const fromEmail = email.from.match(/<(.+?)>/) ? email.from.match(/<(.+?)>/)[1] : email.from;

    // Przygotuj cytowaną treść oryginalnej wiadomości
    const quotedText = email.text ? email.text.split('\n').map(line => `> ${line}`).join('\n') : '';
    const replyText = `\n\n\nW dniu ${email.date}, ${email.from} napisał(a):\n${quotedText}`;

    // Przygotuj dane do odpowiedzi
    const reply = {
      to: fromEmail,
      subject: email.subject.startsWith('RE: ') ? email.subject : `RE: ${email.subject}`,
      text: replyText
    };

    setReplyData(reply);
    setShowCompose(true);
  };

  const handleForward = (email) => {
    // Przygotuj cytowaną treść do przekazania
    const forwardText = `\n\n---------- Forwarded message ---------\nOd: ${email.from}\nData: ${email.date}\nTemat: ${email.subject}\nDo: ${email.to}\n\n${email.text || ''}`;

    // Przygotuj dane do przekazania
    const forward = {
      to: '',
      subject: email.subject.startsWith('FW: ') ? email.subject : `FW: ${email.subject}`,
      text: forwardText
    };

    setReplyData(forward);
    setShowCompose(true);
  };

  const handleToggleImportant = async (email) => {
    try {
      const accountId = selectedAccount.id === 'all' ? email.accountId : selectedAccount.id;
      const isImportant = email.flags && email.flags.includes('\\Flagged');

      await emailsAPI.toggleImportant(accountId, email.uid, selectedFolder, !isImportant);

      // Odśwież listę emaili
      handleRefresh();

      // Jeśli email jest otwarty, odśwież go
      if (selectedEmail && selectedEmail.uid === email.uid) {
        handleEmailSelect(email);
      }
    } catch (error) {
      alert('Błąd oznaczania wiadomości jako ważne');
      console.error(error);
    }
  };

  const handleCreateLabel = async (name, color) => {
    try {
      await labelsAPI.create({ name, color });
      loadLabels();
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Błąd tworzenia etykiety';
      alert(errorMsg);
      console.error(error);
    }
  };

  const handleDeleteLabel = async (labelId) => {
    if (window.confirm('Czy na pewno chcesz usunąć tę etykietę?')) {
      try {
        await labelsAPI.delete(labelId);
        loadLabels();
      } catch (error) {
        alert('Błąd usuwania etykiety');
        console.error(error);
      }
    }
  };

  const handleAddLabelToEmail = async (email, labelId) => {
    try {
      const accountId = selectedAccount.id === 'all' ? email.accountId : selectedAccount.id;
      await labelsAPI.addToEmail({
        accountId,
        emailUid: email.uid,
        labelId
      });
      // Załaduj etykiety dla tego emaila
      loadEmailLabels(accountId, email.uid);
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Błąd dodawania etykiety';
      alert(errorMsg);
      console.error(error);
    }
  };

  const handleRemoveLabelFromEmail = async (email, labelId) => {
    try {
      const accountId = selectedAccount.id === 'all' ? email.accountId : selectedAccount.id;
      await labelsAPI.removeFromEmail(accountId, email.uid, labelId);
      // Załaduj etykiety dla tego emaila
      loadEmailLabels(accountId, email.uid);
    } catch (error) {
      alert('Błąd usuwania etykiety');
      console.error(error);
    }
  };

  const loadEmailLabels = async (accountId, emailUid) => {
    try {
      const response = await labelsAPI.getEmailLabels(accountId, emailUid);
      const key = `${accountId}_${emailUid}`;
      setEmailLabels(prev => ({
        ...prev,
        [key]: response.data.labels || []
      }));
    } catch (error) {
      console.error('Błąd pobierania etykiet emaila:', error);
    }
  };

  // Filtruj emaile na podstawie wybranego filtra i wyszukiwania
  const filteredEmails = emails.filter(email => {
    const isUnread = !email.flags || !email.flags.includes('\\Seen');
    const isImportant = email.flags && email.flags.includes('\\Flagged');

    // Filtr statusu (wszystkie, nieodczytane, odczytane, ważne)
    let statusMatch = true;
    switch (emailFilter) {
      case 'unread':
        statusMatch = isUnread;
        break;
      case 'read':
        statusMatch = !isUnread;
        break;
      case 'important':
        statusMatch = isImportant;
        break;
      default:
        statusMatch = true;
    }

    // Filtr wyszukiwania
    let searchMatch = true;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const subject = (email.subject || '').toLowerCase();
      const from = (email.from || '').toLowerCase();
      const text = (email.text || '').toLowerCase();

      searchMatch = subject.includes(query) || from.includes(query) || text.includes(query);
    }

    // Filtr etykiet
    let labelMatch = true;
    if (selectedLabelFilter) {
      const accountId = selectedAccount?.id === 'all' ? email.accountId : selectedAccount?.id;
      const key = `${accountId}_${email.uid}`;
      const emailLabelsData = emailLabels[key] || [];
      labelMatch = emailLabelsData.some(label => label.id === selectedLabelFilter);
    }

    return statusMatch && searchMatch && labelMatch;
  });

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white' : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'} p-4 flex justify-between items-center shadow-md`}>
        <h1
          className="text-2xl font-bold flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => window.location.reload()}
          title="Kliknij, aby odświeżyć stronę"
        >
          PatLook
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">Witaj, <strong>{user?.name || user?.email}</strong></span>
          <button
            onClick={toggleTheme}
            className={`${isDarkMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-700 hover:bg-gray-800'} px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm hover:shadow-md transition-all`}
            title={isDarkMode ? 'Tryb jasny' : 'Tryb ciemny'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setShowLabelsManager(true)}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
          >
            🏷️ Etykiety ({labels.length})
          </button>
          <button
            onClick={() => setShowAccountsList(true)}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
          >
            📧 Moje konta ({accounts.length})
          </button>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            Wyloguj
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Accounts */}
        <div className={`w-64 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100'} border-r overflow-y-auto`}>
          <div className="p-4">
            <AccountList
              accounts={accounts}
              selectedAccount={selectedAccount}
              onSelectAccount={handleAccountSelect}
              onReload={loadAccounts}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>

        {/* Email List */}
        <div className={`w-96 ${isDarkMode ? 'bg-gray-850 border-gray-700' : 'bg-white'} border-r overflow-y-auto`}>
          {selectedAccount ? (
            <div>
              <div className={`p-4 border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center mb-3">
                  <h2 className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{selectedAccount.email}</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowCompose(true)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1"
                    >
                      ✉️ Wyślij
                    </button>
                    <button
                      onClick={handleRefresh}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1"
                    >
                      🔄 Odśwież
                    </button>
                    {selectedFolder === 'Trash' && selectedAccount.id !== 'all' && (
                      <button
                        onClick={handleEmptyTrash}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1"
                      >
                        🗑️ Opróżnij kosz
                      </button>
                    )}
                  </div>
                </div>

                {/* Pasek wyszukiwania */}
                <div className="mb-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="🔍 Szukaj w wiadomościach (temat, nadawca, treść)..."
                      className={`w-full px-4 py-2 pr-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } border`}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                          isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                        }`}
                        title="Wyczyść wyszukiwanie"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  {searchQuery && (
                    <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Znaleziono: {filteredEmails.length} wiadomości
                    </div>
                  )}
                </div>

                {/* Folder Tabs */}
                {selectedAccount.id === 'all' ? (
                  <div className="flex gap-2 flex-wrap mb-3">
                    <button
                      onClick={() => handleFolderChange('INBOX')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedFolder === 'INBOX'
                          ? 'bg-blue-500 text-white shadow-md'
                          : isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      📥 Odebrane
                    </button>
                    <button
                      onClick={() => handleFolderChange('Sent')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedFolder === 'Sent'
                          ? 'bg-blue-500 text-white shadow-md'
                          : isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      📤 Wysłane
                    </button>
                    <button
                      onClick={() => handleFolderChange('Trash')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedFolder === 'Trash'
                          ? 'bg-blue-500 text-white shadow-md'
                          : isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      🗑️ Kosz
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 flex-wrap mb-3">
                    <button
                      onClick={() => handleFolderChange('INBOX')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedFolder === 'INBOX'
                          ? 'bg-blue-500 text-white shadow-md'
                          : isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      📥 Odebrane
                    </button>
                    <button
                      onClick={() => handleFolderChange('Sent')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedFolder === 'Sent'
                          ? 'bg-blue-500 text-white shadow-md'
                          : isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      📤 Wysłane
                    </button>
                    <button
                      onClick={() => handleFolderChange('Trash')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedFolder === 'Trash'
                          ? 'bg-blue-500 text-white shadow-md'
                          : isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      🗑️ Kosz
                    </button>
                  </div>
                )}

                {/* Filter Tabs */}
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setEmailFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      emailFilter === 'all'
                        ? 'bg-purple-500 text-white shadow-md'
                        : isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    📬 Wszystkie ({emails.length})
                  </button>
                  <button
                    onClick={() => setEmailFilter('unread')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      emailFilter === 'unread'
                        ? 'bg-purple-500 text-white shadow-md'
                        : isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    ⚫ Nieodczytane ({emails.filter(e => !e.flags || !e.flags.includes('\\Seen')).length})
                  </button>
                  <button
                    onClick={() => setEmailFilter('read')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      emailFilter === 'read'
                        ? 'bg-purple-500 text-white shadow-md'
                        : isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    ⚪ Odczytane ({emails.filter(e => e.flags && e.flags.includes('\\Seen')).length})
                  </button>
                  <button
                    onClick={() => setEmailFilter('important')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      emailFilter === 'important'
                        ? 'bg-purple-500 text-white shadow-md'
                        : isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    ⭐ Ważne ({emails.filter(e => e.flags && e.flags.includes('\\Flagged')).length})
                  </button>
                </div>

                {/* Label Filter */}
                {labels.length > 0 && (
                  <div className="mt-3">
                    <div className={`text-xs font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Filtruj według etykiety:
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => setSelectedLabelFilter(null)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedLabelFilter === null
                            ? 'bg-purple-500 text-white shadow-md'
                            : isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        🏷️ Wszystkie
                      </button>
                      {labels.map((label) => (
                        <button
                          key={label.id}
                          onClick={() => setSelectedLabelFilter(label.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                            selectedLabelFilter === label.id
                              ? 'shadow-md ring-2 ring-offset-2'
                              : isDarkMode ? 'hover:opacity-80' : 'hover:opacity-80'
                          }`}
                          style={{
                            backgroundColor: selectedLabelFilter === label.id ? label.color : `${label.color}80`,
                            color: 'white',
                            ringColor: label.color
                          }}
                        >
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: 'white' }}
                          ></div>
                          {label.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded">
                  {error}
                </div>
              )}

              {loading ? (
                <div className={`p-4 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Ładowanie...</div>
              ) : (
                <EmailList
                  emails={filteredEmails}
                  onSelectEmail={handleEmailSelect}
                  selectedEmail={selectedEmail}
                  onToggleImportant={handleToggleImportant}
                  isDarkMode={isDarkMode}
                  emailLabels={emailLabels}
                  labels={labels}
                  onAddLabel={handleAddLabelToEmail}
                  onRemoveLabel={handleRemoveLabelFromEmail}
                />
              )}
            </div>
          ) : (
            <div className={`p-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Wybierz konto pocztowe
            </div>
          )}
        </div>

        {/* Email View */}
        <div className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} overflow-y-auto`}>
          {selectedEmail ? (
            <EmailView
              email={selectedEmail}
              onDelete={handleDeleteEmail}
              onReply={handleReply}
              onForward={handleForward}
              accountId={selectedEmail.accountId || selectedAccount?.id}
              isDarkMode={isDarkMode}
              labels={labels}
              emailLabels={(() => {
                const accountId = selectedEmail.accountId || selectedAccount?.id;
                const key = `${accountId}_${selectedEmail.uid}`;
                return emailLabels[key] || [];
              })()}
              onAddLabel={handleAddLabelToEmail}
              onRemoveLabel={handleRemoveLabelFromEmail}
            />
          ) : (
            <div className={`p-8 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {selectedAccount
                ? 'Wybierz wiadomość aby ją wyświetlić'
                : 'Wybierz konto pocztowe aby rozpocząć'}
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <ComposeEmail
          onClose={() => {
            setShowCompose(false);
            setReplyData(null);
          }}
          onSend={handleSendEmail}
          accounts={accounts}
          currentAccountId={selectedAccount?.id}
          replyData={replyData}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Labels Manager Modal */}
      {showLabelsManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden flex flex-col`}>
            <div className={`flex justify-between items-center p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>🏷️ Zarządzanie etykietami</h2>
              <button
                onClick={() => setShowLabelsManager(false)}
                className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} text-2xl`}
              >
                &times;
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              {/* Formularz dodawania nowej etykiety */}
              <div className={`p-4 mb-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Dodaj nową etykietę</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const name = formData.get('name');
                  const color = formData.get('color');
                  if (name && color) {
                    handleCreateLabel(name, color);
                    e.target.reset();
                  }
                }}>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="name"
                      placeholder="Nazwa etykiety"
                      required
                      className={`flex-1 px-3 py-2 rounded border ${
                        isDarkMode
                          ? 'bg-gray-600 border-gray-500 text-gray-100'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                    <input
                      type="color"
                      name="color"
                      defaultValue="#3B82F6"
                      className="w-16 h-10 rounded cursor-pointer"
                    />
                    <button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-medium"
                    >
                      Dodaj
                    </button>
                  </div>
                </form>
              </div>

              {/* Lista etykiet */}
              {labels.length === 0 ? (
                <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} py-8`}>Brak etykiet. Dodaj pierwszą etykietę powyżej.</p>
              ) : (
                <div className="space-y-2">
                  <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Twoje etykiety:</h3>
                  {labels.map((label) => (
                    <div
                      key={label.id}
                      className={`p-3 border rounded-lg flex justify-between items-center ${
                        isDarkMode ? 'border-gray-700' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: label.color }}
                        ></div>
                        <span className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                          {label.name}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteLabel(label.id)}
                        className="text-red-500 hover:text-red-700 px-3 py-1 rounded text-sm font-medium"
                      >
                        Usuń
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={() => setShowLabelsManager(false)}
                className={`w-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'} px-4 py-2 rounded`}
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Accounts List Modal */}
      {showAccountsList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden flex flex-col`}>
            <div className={`flex justify-between items-center p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Dodane konta pocztowe</h2>
              <button
                onClick={() => setShowAccountsList(false)}
                className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} text-2xl`}
              >
                &times;
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              {accounts.length === 0 ? (
                <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} py-8`}>Brak dodanych kont pocztowych</p>
              ) : (
                <div className="space-y-3">
                  {accounts.map((account) => (
                    <div
                      key={account.id}
                      className={`p-4 border rounded-lg ${isDarkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'} flex justify-between items-center`}
                    >
                      <div>
                        <div className={`font-semibold text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{account.email}</div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Provider: {account.provider}
                        </div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                          IMAP: {account.imap_host}:{account.imap_port} |
                          SMTP: {account.smtp_host}:{account.smtp_port}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setShowAccountsList(false);
                          handleAccountSelect(account);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
                      >
                        Otwórz
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={() => setShowAccountsList(false)}
                className={`w-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-4 py-2 rounded`}
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
