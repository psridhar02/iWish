export const setToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');

// ADDED FUNCTIONS
export const setUsername = (username) => localStorage.setItem('username', username);
export const getUsername = () => localStorage.getItem('username'); 

export const authHeaders = () => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};
