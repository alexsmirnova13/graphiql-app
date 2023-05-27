import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { FirebaseError, initializeApp } from 'firebase/app';
import { FormType, UserState } from 'helpers/types';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUSKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async ({
  email,
  password,
}: FormType): Promise<UserState | undefined> => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const { expirationTime, token } = await user.getIdTokenResult();
    localStorage.setItem('refreshToken', user.refreshToken);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('expirationTime', expirationTime);
    const newUser = {
      email: email,
      id: user.uid,
    };
    return newUser;
  } catch (err) {
    if (err instanceof FirebaseError) {
      if (err.code == 'auth/invalid-email') {
        throw Error('Invalid email address');
      } else if (err.code == 'auth/wrong-password') {
        throw Error('Wrong password');
      } else {
        throw Error('User not found! Check login or password!');
      }
    }
  }
};
const registerWithEmailAndPassword = async ({
  email,
  password,
}: FormType): Promise<UserState | undefined> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      authProvider: 'local',
      email,
    });
    const { expirationTime, token } = await user.getIdTokenResult();
    localStorage.setItem('refreshToken', user.refreshToken);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('expirationTime', expirationTime);
    const newUser = {
      email: email,
      id: user.uid,
    };
    return newUser;
  } catch (err) {
    if (err instanceof FirebaseError) {
      if (err.code == 'auth/email-already-in-use') {
        throw Error('User with this email exists!');
      } else {
        throw Error('Something went wrong!');
      }
    }
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    if (err instanceof FirebaseError) {
      alert(err.message);
    }
  }
};

const logout = () => {
  signOut(auth);
  localStorage.removeItem('accessToken');
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
