import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 sekund timeout
});

// Interceptor do dodawania tokenu do każdego zapytania
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor do obsługi błędów
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

export const accountsAPI = {
  getAll: () => api.get('/accounts'),
  create: (data) => api.post('/accounts', data),
  update: (id, data) => api.put(`/accounts/${id}`, data),
  delete: (id) => api.delete(`/accounts/${id}`),
};

export const emailsAPI = {
  getEmails: (accountId, folder = 'INBOX', limit = 50) =>
    api.get(`/emails/${accountId}?folder=${folder}&limit=${limit}`),
  getAllEmailsFromAllAccounts: (limit = 50, folder = 'INBOX') =>
    api.get(`/emails/all/combined?limit=${limit}&folder=${folder}`),
  getEmailById: (accountId, emailId, folder = 'INBOX') =>
    api.get(`/emails/${accountId}/${emailId}?folder=${folder}`),
  sendEmail: (data) => {
    // Jeśli data jest FormData, ustaw odpowiedni Content-Type
    if (data instanceof FormData) {
      return api.post('/emails/send', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
    return api.post('/emails/send', data);
  },
  deleteEmail: (accountId, emailId, folder = 'INBOX') =>
    api.delete(`/emails/${accountId}/${emailId}?folder=${folder}`),
  moveToTrash: (accountId, emailId, folder = 'INBOX') =>
    api.post(`/emails/${accountId}/${emailId}/trash`, { folder }),
  emptyTrash: (accountId) => api.delete(`/emails/${accountId}/trash/empty`),
  getFolders: (accountId) => api.get(`/emails/${accountId}/folders`),
  toggleImportant: (accountId, emailId, folder = 'INBOX', flagged = true) =>
    api.post(`/emails/${accountId}/${emailId}/flag`, { folder, flagged }),
  markAsRead: (accountId, emailId, folder = 'INBOX') =>
    api.post(`/emails/${accountId}/${emailId}/read`, { folder }),
};

export const labelsAPI = {
  getAll: () => api.get('/labels'),
  create: (data) => api.post('/labels', data),
  delete: (labelId) => api.delete(`/labels/${labelId}`),
  addToEmail: (data) => api.post('/labels/email', data),
  removeFromEmail: (accountId, emailUid, labelId) =>
    api.delete(`/labels/email/${accountId}/${emailUid}/${labelId}`),
  getEmailLabels: (accountId, emailUid) =>
    api.get(`/labels/email/${accountId}/${emailUid}`),
  getEmailsByLabel: (labelId) => api.get(`/labels/${labelId}/emails`),
};

export default api;
