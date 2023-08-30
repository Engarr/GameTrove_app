import { redirect } from 'react-router-dom';

export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem('expiration');
  if (!storedExpirationDate) {
    localStorage.removeItem('token');
    return null;
  }
  const expirationDate = new Date(storedExpirationDate as string);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
};

const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    localStorage.removeItem('token');
    return null;
  }
  const tokenDuration = getTokenDuration();
  if (!tokenDuration) {
    return null;
  }
  if (tokenDuration < 0) {
    localStorage.removeItem('token');
    return null;
  }
  return token;
};
export function checkLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect('/account?mode=login');
  }
  return null;
}
export const tokenLoader = () => {
  return getAuthToken();
};
