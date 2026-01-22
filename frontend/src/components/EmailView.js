import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const EmailView = ({ email, onDelete, onReply, onForward, accountId, isDarkMode = false, labels = [], emailLabels = [], onAddLabel, onRemoveLabel }) => {
  const [showLabelMenu, setShowLabelMenu] = useState(false);

  if (!email) return null;

  const handleDelete = () => {
    if (window.confirm('Czy na pewno chcesz usunąć tę wiadomość?')) {
      onDelete(accountId, email.uid);
    }
  };

  const handleReply = () => {
    if (onReply) {
      onReply(email);
    }
  };

  const handleForward = () => {
    if (onForward) {
      onForward(email);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleExportToPDF = () => {
    try {
      const doc = new jsPDF();
      let yPosition = 20;
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;

      // Tytuł
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text('Email Export', margin, yPosition);
      yPosition += 15;

      // Separator
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;

      // Metadata
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Subject:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      const subjectLines = doc.splitTextToSize(email.subject || 'No subject', maxWidth - 30);
      doc.text(subjectLines, margin + 30, yPosition);
      yPosition += subjectLines.length * 5 + 5;

      doc.setFont(undefined, 'bold');
      doc.text('From:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      const fromLines = doc.splitTextToSize(email.from || '', maxWidth - 30);
      doc.text(fromLines, margin + 30, yPosition);
      yPosition += fromLines.length * 5 + 5;

      doc.setFont(undefined, 'bold');
      doc.text('To:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      const toLines = doc.splitTextToSize(email.to || '', maxWidth - 30);
      doc.text(toLines, margin + 30, yPosition);
      yPosition += toLines.length * 5 + 5;

      doc.setFont(undefined, 'bold');
      doc.text('Date:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      doc.text(formatDate(email.date), margin + 30, yPosition);
      yPosition += 10;

      // Etykiety
      if (emailLabels && emailLabels.length > 0) {
        doc.setFont(undefined, 'bold');
        doc.text('Labels:', margin, yPosition);
        doc.setFont(undefined, 'normal');
        const labelsText = emailLabels.map(l => l.name).join(', ');
        const labelLines = doc.splitTextToSize(labelsText, maxWidth - 30);
        doc.text(labelLines, margin + 30, yPosition);
        yPosition += labelLines.length * 5 + 5;
      }

      // Załączniki
      if (email.attachments && email.attachments.length > 0) {
        doc.setFont(undefined, 'bold');
        doc.text('Attachments:', margin, yPosition);
        doc.setFont(undefined, 'normal');
        const attachText = email.attachments.map(a => `${a.filename} (${Math.round(a.size / 1024)} KB)`).join(', ');
        const attachLines = doc.splitTextToSize(attachText, maxWidth - 30);
        doc.text(attachLines, margin + 30, yPosition);
        yPosition += attachLines.length * 5 + 10;
      }

      // Separator przed treścią
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;

      // Treść emaila
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');

      // Usuń tagi HTML jeśli istnieją
      let emailContent = email.text || '';
      if (email.html && !email.text) {
        emailContent = email.html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
      }

      const contentLines = doc.splitTextToSize(emailContent, maxWidth);

      // Dodaj treść z obsługą nowych stron
      contentLines.forEach((line) => {
        if (yPosition > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, margin, yPosition);
        yPosition += 5;
      });

      // Zapisz PDF
      const fileName = `email_${email.subject?.substring(0, 30).replace(/[^a-z0-9]/gi, '_')}_${new Date().getTime()}.pdf`;
      doc.save(fileName);

      alert('Email został wyeksportowany do PDF!');
    } catch (error) {
      console.error('Błąd eksportu do PDF:', error);
      alert('Błąd podczas eksportowania do PDF');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border p-6 mb-4`}>
        <div className="flex justify-between items-start mb-4">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} flex-1`}>{email.subject}</h2>
          <div className="flex gap-2">
            <button
              onClick={handleReply}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-sm hover:shadow-md"
            >
              ↩️ Odpowiedz
            </button>
            <button
              onClick={handleForward}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-sm hover:shadow-md"
            >
              ➡️ Prześlij dalej
            </button>
            <button
              onClick={handleExportToPDF}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-sm hover:shadow-md"
              title="Eksportuj do PDF"
            >
              📄 PDF
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-sm hover:shadow-md"
            >
              🗑️ Usuń
            </button>
          </div>
        </div>

        <div className={`space-y-3 text-sm ${isDarkMode ? 'bg-gray-750' : 'bg-gray-50'} p-4 rounded-lg`}>
          <div className="flex">
            <span className={`font-semibold w-20 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Od:</span>
            <span className={isDarkMode ? 'text-gray-200' : 'text-gray-900'}>{email.from}</span>
          </div>
          <div className="flex">
            <span className={`font-semibold w-20 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Do:</span>
            <span className={isDarkMode ? 'text-gray-200' : 'text-gray-900'}>{email.to}</span>
          </div>
          <div className="flex">
            <span className={`font-semibold w-20 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Data:</span>
            <span className={isDarkMode ? 'text-gray-200' : 'text-gray-900'}>{formatDate(email.date)}</span>
          </div>
          {email.accountName && (
            <div className="flex">
              <span className={`font-semibold w-20 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Konto:</span>
              <span className={isDarkMode ? 'text-gray-200' : 'text-gray-900'}>📧 {email.accountName}</span>
            </div>
          )}
          {/* Etykiety */}
          <div className="flex">
            <span className={`font-semibold w-20 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Etykiety:</span>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 items-center">
                {emailLabels.map((label) => (
                  <span
                    key={label.id}
                    className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full text-white font-medium"
                    style={{ backgroundColor: label.color }}
                  >
                    {label.name}
                    {onRemoveLabel && (
                      <button
                        onClick={() => onRemoveLabel(email, label.id)}
                        className="ml-1 hover:bg-black/20 rounded-full w-4 h-4 flex items-center justify-center"
                        title="Usuń etykietę"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
                {onAddLabel && labels.length > 0 && (
                  <div className="relative">
                    <button
                      onClick={() => setShowLabelMenu(!showLabelMenu)}
                      className={`text-xs px-3 py-1 rounded-full border-2 border-dashed font-medium ${
                        isDarkMode
                          ? 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300'
                          : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700'
                      }`}
                    >
                      + Dodaj etykietę
                    </button>
                    {showLabelMenu && (
                      <div className={`absolute top-full left-0 mt-1 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg shadow-lg z-10 min-w-[200px]`}>
                        {labels
                          .filter(label => !emailLabels.find(el => el.id === label.id))
                          .map((label) => (
                            <button
                              key={label.id}
                              onClick={() => {
                                onAddLabel(email, label.id);
                                setShowLabelMenu(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 ${
                                isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                              }`}
                            >
                              <div
                                className="w-4 h-4 rounded"
                                style={{ backgroundColor: label.color }}
                              ></div>
                              <span className={isDarkMode ? 'text-gray-200' : 'text-gray-900'}>
                                {label.name}
                              </span>
                            </button>
                          ))}
                        {labels.filter(label => !emailLabels.find(el => el.id === label.id)).length === 0 && (
                          <div className={`px-3 py-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Wszystkie etykiety dodane
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {email.attachments && email.attachments.length > 0 && (
        <div className={`mb-4 p-4 rounded-lg border ${isDarkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
          <h3 className={`font-semibold mb-3 text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-900'} flex items-center gap-2`}>
            📎 Załączniki ({email.attachments.length})
          </h3>
          <div className="space-y-2">
            {email.attachments.map((attachment, index) => (
              <div key={index} className={`text-sm flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-2 rounded shadow-sm`}>
                <span className="mr-2 text-xl">📄</span>
                <span className={`flex-1 font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{attachment.filename}</span>
                <span className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'text-gray-400 bg-gray-700' : 'text-gray-500 bg-gray-100'}`}>
                  {Math.round(attachment.size / 1024)} KB
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`email-content rounded-lg shadow-sm border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6`}>
        {email.html ? (
          <div
            className={`prose max-w-none ${isDarkMode ? 'prose-invert' : ''}`}
            dangerouslySetInnerHTML={{ __html: email.html }}
          />
        ) : (
          <div className={`whitespace-pre-wrap leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{email.text}</div>
        )}
      </div>
    </div>
  );
};

export default EmailView;
