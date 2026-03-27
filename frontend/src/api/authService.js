import api from '../services/api';

const AUTH_API = '/auth';

const AuthService = {
  login: async (username, password) => {
    try {
      const response = await api.post(`${AUTH_API}/login`, { username, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        const user = {
          username: response.data.username,
          email: response.data.email,
          role: response.data.role
        };
        localStorage.setItem('user', JSON.stringify(user));
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (username, email, password) => {
    try {
      const response = await api.post(`${AUTH_API}/register`, {
        username,
        email,
        password,
        role: 'ROLE_USER' // Send as String, not Array
      });
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (!userStr || userStr === 'undefined') return null;
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  },
};

export default AuthService;
