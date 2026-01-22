import React, { useState } from 'react';

const ComposeEmail = ({ onClose, onSend, accounts, currentAccountId, replyData, isDarkMode = false }) => {
  const [to, setTo] = useState(replyData?.to || '');
  const [subject, setSubject] = useState(replyData?.subject || '');
  const [text, setText] = useState(replyData?.text || '');
  const [selectedAccountId, setSelectedAccountId] = useState(
    currentAccountId && currentAccountId !== 'all' ? currentAccountId : (accounts && accounts.length > 0 ? accounts[0].id : '')
  );
  const [sending, setSending] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const formData = new FormData();
      formData.append('to', to);
      formData.append('subject', subject);
      formData.append('text', text);
      formData.append('accountId', selectedAccountId);

      // Dodaj załączniki
      attachments.forEach((file) => {
        formData.append('attachments', file);
      });

      await onSend(formData);
      onClose();
    } catch (error) {
      console.error('Błąd wysyłania:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Nieznany błąd podczas wysyłania wiadomości';
      alert(errorMessage);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl w-full max-w-2xl mx-4`}>
        <div className={`flex justify-between items-center p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{replyData ? 'Odpowiedź' : 'Nowa wiadomość'}</h2>
          <button
            onClick={onClose}
            className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} text-2xl`}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Wyślij z konta:</label>
            <select
              value={selectedAccountId}
              onChange={(e) => setSelectedAccountId(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
            >
              {accounts && accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.email} ({account.provider})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Do:</label>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
              placeholder="adres@example.com"
            />
          </div>

          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Temat:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
              placeholder="Temat wiadomości"
            />
          </div>

          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Treść:</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
              }`}
              rows="10"
              required
              placeholder="Treść wiadomości..."
            />
          </div>

          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Załączniki:</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
              }`}
              accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.txt"
            />
            {attachments.length > 0 && (
              <div className="mt-2 space-y-1">
                {attachments.map((file, index) => (
                  <div key={index} className={`flex items-center justify-between px-3 py-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      📎 {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Usuń
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 border rounded-lg ${
                isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              Anuluj
            </button>
            <button
              type="submit"
              disabled={sending}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:bg-blue-300"
            >
              {sending ? 'Wysyłanie...' : 'Wyślij'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComposeEmail;
