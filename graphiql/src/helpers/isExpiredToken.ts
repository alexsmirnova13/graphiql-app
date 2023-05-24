import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export const isExpiredToken = () => {
  const time = localStorage.getItem('expirationTime')!;
  const expirationTime = Date.parse(time);
  const currentTimestamp = new Date().getTime();
  const difference = expirationTime - currentTimestamp;
  setTimeout(() => {
    signOut(auth);
    localStorage.removeItem('accessToken');
    window.location.href = '/';
  }, difference);
};
