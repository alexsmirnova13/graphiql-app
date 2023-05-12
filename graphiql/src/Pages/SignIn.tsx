import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/userSlice';
import { FormLogin } from '../helpers/types';
import StyledForm from '../components/style/StyledForm';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const SignIn = () => {
  const { register, handleSubmit, reset } = useForm<FormLogin>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  const onFormSubmit = async (form: FormLogin) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const accessToken = await userCredential.user.getIdToken();
      const userName = localStorage.getItem('user');
      const newUser = {
        name: userName!,
        email: form.email,
        id: userCredential.user.uid,
      };
      console.log(newUser);
      localStorage.setItem('refreshToken', userCredential.user.refreshToken);
      sessionStorage.setItem('accessToken', accessToken);
      dispatch(setUser(newUser));
      navigate('/graphi');
    } catch (error) {
      if (error instanceof Error) {
        alert('User not found! Check login or password!');
        navigate('/signup');
      }
    }

    setIsValid(true);
    setTimeout(() => {
      reset();
      setIsValid(false);
    }, 1000);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onFormSubmit)} formHeigth="300px">
      <h3>Login</h3>
      <div className="input-field">
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" {...register('email')} />
      </div>
      <div className="input-field">
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" {...register('password')} />
      </div>
      <button className="button" type="submit">
        LOGIN
      </button>
      {isValid && <div style={{ color: '#deb887' }}>Logined!</div>}
      {error && <div className="error">{error.message}</div>}
      <div>
        <Link to="/reset">Forgot Password</Link>
      </div>
      <div>
        Do not have an account? <Link to="/signup">Registeration</Link> now.
      </div>
    </StyledForm>
  );
};

export default SignIn;
