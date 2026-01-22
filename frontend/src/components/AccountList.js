import React, { useState } from 'react';
import { accountsAPI } from '../services/api';

const AccountList = ({ accounts, selectedAccount, onSelectAccount, onReload, isDarkMode = false }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    provider: 'onet',
    imapHost: 'imap.poczta.onet.pl',
    imapPort: 993,
    smtpHost: 'smtp.poczta.onet.pl',
    smtpPort: 465,
    password: '',
    useTls: true,
  });

  const providers = {
    gmail: {
      imapHost: 'imap.gmail.com',
      imapPort: 993,
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
    },
    onet: {
      imapHost: 'imap.poczta.onet.pl',
      imapPort: 993,
      smtpHost: 'smtp.poczta.onet.pl',
      smtpPort: 465,
    },
    wp: {
      imapHost: 'imap.wp.pl',
      imapPort: 993,
      smtpHost: 'smtp.wp.pl',
      smtpPort: 465,
    },
    interia: {
      imapHost: 'poczta.interia.pl',
      imapPort: 993,
      smtpHost: 'poczta.interia.pl',
      smtpPort: 465,
    },
  };

  const handleProviderChange = (provider) => {
    if (provider !== 'custom' && providers[provider]) {
      setFormData({
        ...formData,
        provider,
        ...providers[provider],
      });
    } else {
      setFormData({ ...formData, provider });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await accountsAPI.create(formData);
      setShowAddForm(false);
      setFormData({
        email: '',
        provider: 'onet',
        imapHost: 'imap.poczta.onet.pl',
        imapPort: 993,
        smtpHost: 'smtp.poczta.onet.pl',
        smtpPort: 465,
        password: '',
        useTls: true,
      });
      onReload();
    } catch (error) {
      alert('Błąd dodawania konta: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Czy na pewno chcesz usunąć to konto?')) {
      try {
        await accountsAPI.delete(id);
        onReload();
      } catch (error) {
        alert('Błąd usuwania konta');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Konta pocztowe</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          {showAddForm ? 'Anuluj' : 'Dodaj'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className={`mb-4 p-3 rounded shadow ${isDarkMode ? 'bg-gray-750' : 'bg-white'}`}>
          <div className="mb-2">
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Dostawca</label>
            <select
              value={formData.provider}
              onChange={(e) => handleProviderChange(e.target.value)}
              className={`w-full px-2 py-1 border rounded text-sm ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="onet">Onet</option>
              <option value="wp">WP</option>
              <option value="interia">Interia</option>
              <option value="gmail">Gmail</option>
              <option value="custom">Dodaj ręcznie</option>
            </select>
          </div>

          <div className="mb-2">
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-2 py-1 border rounded text-sm ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
            />
          </div>

          <div className="mb-2">
            <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Hasło</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full px-2 py-1 border rounded text-sm ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
            />
          </div>

          {formData.provider === 'custom' && (
            <>
              <div className={`mb-3 p-2 border rounded ${isDarkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                  <strong>Wskazówka:</strong> Podaj parametry IMAP i SMTP z ustawień Twojej poczty.
                </p>
              </div>

              <div className="mb-2">
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nazwa dostawcy (np. "custom")</label>
                <input
                  type="text"
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  className={`w-full px-2 py-1 border rounded text-sm ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="np. custom, moja-poczta"
                  required
                />
              </div>

              <div className="mb-2 grid grid-cols-2 gap-2">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>IMAP Host</label>
                  <input
                    type="text"
                    value={formData.imapHost}
                    onChange={(e) => setFormData({ ...formData, imapHost: e.target.value })}
                    className={`w-full px-2 py-1 border rounded text-sm ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="np. imap.example.com"
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>IMAP Port</label>
                  <input
                    type="number"
                    value={formData.imapPort}
                    onChange={(e) => setFormData({ ...formData, imapPort: parseInt(e.target.value) })}
                    className={`w-full px-2 py-1 border rounded text-sm ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="993"
                    required
                  />
                </div>
              </div>

              <div className="mb-2 grid grid-cols-2 gap-2">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>SMTP Host</label>
                  <input
                    type="text"
                    value={formData.smtpHost}
                    onChange={(e) => setFormData({ ...formData, smtpHost: e.target.value })}
                    className={`w-full px-2 py-1 border rounded text-sm ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="np. smtp.example.com"
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>SMTP Port</label>
                  <input
                    type="number"
                    value={formData.smtpPort}
                    onChange={(e) => setFormData({ ...formData, smtpPort: parseInt(e.target.value) })}
                    className={`w-full px-2 py-1 border rounded text-sm ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="465 lub 587"
                    required
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className={`flex items-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <input
                    type="checkbox"
                    checked={formData.useTls}
                    onChange={(e) => setFormData({ ...formData, useTls: e.target.checked })}
                    className="mr-2"
                  />
                  Użyj TLS/SSL (zazwyczaj zaznaczone)
                </label>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-1 rounded text-sm"
          >
            Dodaj konto
          </button>
        </form>
      )}

      <div className="space-y-2">
        {/* Przycisk "Wszystkie wiadomości" */}
        <div
          onClick={() => onSelectAccount({ id: 'all', email: 'Wszystkie wiadomości', provider: 'ALL' })}
          className={`p-3 rounded-lg cursor-pointer shadow-md transition-all ${
            selectedAccount?.id === 'all'
              ? isDarkMode ? 'bg-purple-900/50 border-2 border-purple-500' : 'bg-purple-100 border-2 border-purple-500'
              : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 hover:shadow-lg'
          }`}
        >
          <div className="font-medium text-sm">📬 Wszystkie wiadomości</div>
          <div className="text-xs opacity-80">Ze wszystkich kont</div>
        </div>

        {accounts.map((account) => (
          <div
            key={account.id}
            className={`p-3 rounded-lg cursor-pointer flex justify-between items-center shadow-sm transition-all ${
              selectedAccount?.id === account.id
                ? isDarkMode ? 'bg-blue-900/50 border-2 border-blue-500 shadow-md' : 'bg-blue-100 border-2 border-blue-500 shadow-md'
                : isDarkMode ? 'bg-gray-750 hover:bg-gray-700 hover:shadow-md' : 'bg-white hover:bg-gray-50 hover:shadow-md'
            }`}
          >
            <div onClick={() => onSelectAccount(account)} className="flex-1">
              <div className={`font-medium text-sm flex items-center gap-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                {account.provider === 'DEMO' && '🎭'}
                {account.provider === 'gmail' && '📧'}
                {account.provider === 'onet' && '🇵🇱'}
                {account.provider === 'wp' && '🇵🇱'}
                {account.provider === 'interia' && '🇵🇱'}
                {account.email}
              </div>
              <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {account.provider.toUpperCase()}
                {account.provider === 'DEMO' && ' - Konto demonstracyjne'}
              </div>
            </div>
            {account.provider !== 'DEMO' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(account.id);
                }}
                className={`text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded ${isDarkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-50'}`}
              >
                🗑️
              </button>
            )}
          </div>
        ))}
      </div>

      {accounts.length === 0 && !showAddForm && (
        <p className={`text-center text-sm mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Brak kont pocztowych. Dodaj nowe konto.
        </p>
      )}
    </div>
  );
};

export default AccountList;
