import { logout } from '../firebase';

export const isExpiredToken = () => {
  const time = localStorage.getItem('expirationTime')!;
  const expirationTime = Date.parse(time);
  const currentTimestamp = new Date().getTime();
  const difference = expirationTime - currentTimestamp;
  setTimeout(() => {
    logout();
    window.location.href = '/';
  }, difference);
};
