import React from 'react';

const EmailList = ({ emails, onSelectEmail, selectedEmail, onToggleImportant, isDarkMode = false, emailLabels = {}, labels = [], onAddLabel, onRemoveLabel }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    } else if (days < 7) {
      return date.toLocaleDateString('pl-PL', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' });
    }
  };

  const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const parseEmailAddress = (emailStr) => {
    if (!emailStr) return '';
    const match = emailStr.match(/<(.+?)>/) || emailStr.match(/(\S+@\S+)/);
    if (match) return match[1];
    return emailStr;
  };

  if (emails.length === 0) {
    return (
      <div className={`p-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        Brak wiadomości w tej skrzynce
      </div>
    );
  }

  return (
    <div className="divide-y">
      {emails.map((email) => {
        const isUnread = !email.flags?.includes('\\Seen');
        const isImportant = email.flags?.includes('\\Flagged');

        return (
          <div
            key={email.uid}
            className={`p-4 transition-colors relative ${
              isDarkMode
                ? `hover:bg-gray-700 ${selectedEmail?.uid === email.uid ? 'bg-blue-900/50 border-l-4 border-blue-500' : ''} ${isUnread ? 'bg-gray-800/80' : ''}`
                : `hover:bg-gray-50 ${selectedEmail?.uid === email.uid ? 'bg-blue-100 border-l-4 border-blue-500' : ''} ${isUnread ? 'bg-blue-50/50' : ''}`
            }`}
          >
            <div
              onClick={() => onSelectEmail(email)}
              className="cursor-pointer"
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-sm flex items-center gap-1 ${
                  isUnread
                    ? isDarkMode ? 'font-bold text-gray-100' : 'font-bold text-gray-900'
                    : isDarkMode ? 'font-medium text-gray-300' : 'font-medium text-gray-700'
                }`}>
                  {isUnread && '🔵 '}
                  {truncateText(parseEmailAddress(email.from), 30)}
                </span>
                <div className="flex items-center gap-2 ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleImportant(email);
                    }}
                    className="text-lg hover:scale-125 transition-transform"
                    title={isImportant ? 'Usuń z ważnych' : 'Oznacz jako ważne'}
                  >
                    {isImportant ? '⭐' : '☆'}
                  </button>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{formatDate(email.date)}</span>
                </div>
              </div>
              <div className={`text-sm mb-1 ${
                isUnread
                  ? isDarkMode ? 'font-semibold text-gray-100' : 'font-semibold text-gray-900'
                  : isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {truncateText(email.subject, 40)}
              </div>
              {email.accountName && (
                <div className={`text-xs ${isDarkMode ? 'text-gray-400 bg-gray-700' : 'text-gray-500 bg-gray-100'} mt-2 flex items-center gap-1 inline-block px-2 py-1 rounded`}>
                  📧 {email.accountName}
                </div>
              )}
              {email.attachments && email.attachments.length > 0 && (
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                  📎 {email.attachments.length} załącznik{email.attachments.length > 1 ? 'i' : ''}
                </div>
              )}
              {/* Etykiety */}
              {(() => {
                const accountId = email.accountId || 'unknown';
                const key = `${accountId}_${email.uid}`;
                const emailLabelsData = emailLabels[key] || [];

                if (emailLabelsData.length > 0) {
                  return (
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {emailLabelsData.map((label) => (
                        <span
                          key={label.id}
                          className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
                          style={{ backgroundColor: label.color }}
                        >
                          {label.name}
                        </span>
                      ))}
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmailList;
