import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/userSlice';
import { FormLogin } from '../helpers/types';
import StyledForm from '../components/style/StyledForm';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

const SignIn = () => {
  const { register, handleSubmit, reset } = useForm<FormLogin>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(false);
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/graphi');
  }, [user, loading]);

  const onFormSubmit = async (form: FormLogin) => {
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        alert(error.message);
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
