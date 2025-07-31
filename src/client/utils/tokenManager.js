export const saveLocationToken = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocationToken = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const removeLocationToken = (key) => {
  localStorage.removeItem(key);
};

export const isLoggedIn = () => {
  const token = getLocationToken("CURRENT_USER");
  return token && token.access_token;
};

export const getUserInfo = () => {
  const token = getLocationToken("CURRENT_USER");
  return token?.name || null;
};