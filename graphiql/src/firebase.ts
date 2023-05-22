import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
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
    const accessToken = await user.getIdToken();
    localStorage.setItem('refreshToken', user.refreshToken);
    localStorage.setItem('accessToken', accessToken);
    const newUser = {
      email: email,
      id: user.uid,
    };
    return newUser;
  } catch (err) {
    if (err instanceof Error) {
      alert('User not found! Check login or password!');
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
    const accessToken = await user.getIdToken();
    localStorage.setItem('refreshToken', user.refreshToken);
    localStorage.setItem('accessToken', accessToken);
    const newUser = {
      email: email,
      id: user.uid,
    };
    return newUser;
  } catch (err) {
    if (err instanceof FirebaseError) {
      alert('Something went wrong! Maybe user with this email exists! Please try Login!');
    }
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.error(err);
      alert(err.message);
    }
  }
};

export { auth, db, logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset };
