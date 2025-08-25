const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://pbphotobooth-backend-2-a50dde720de0.herokuapp.com';

export const authService = {
  async login(username, password) {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Login failed');
    }
    const data = await res.json();
    localStorage.setItem('pb_admin_token', data.token);
    localStorage.setItem('pb_admin_user', JSON.stringify(data.user));
    return data;
  },
  logout() {
    localStorage.removeItem('pb_admin_token');
    localStorage.removeItem('pb_admin_user');
  },
  getToken() {
    return localStorage.getItem('pb_admin_token');
  },
  getUser() {
    const raw = localStorage.getItem('pb_admin_user');
    return raw ? JSON.parse(raw) : null;
  }
};

export default authService;


