import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUser } from '../store/userSlice';
import { FormLogin, UserState } from '../helpers/types';
import StyledForm from '../components/style/StyledForm';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormLogin>();

  // const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const onSubmit = (user: UserState) => dispatch(setUser(user));

  const [isDisabled, setDisabled] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setDisabled(!(isDirty && Object.keys(errors).length === 0));
  }, [errors, isDirty]);

  const onFormSubmit = (form: FormLogin) => {
    const user = {
      email: form.email,
      password: form.password,
    };
    onSubmit(user);
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
      <button className="button" type="submit" disabled={isDisabled}>
        LOGIN
      </button>
      {isValid && <div style={{ color: '#deb887' }}>Logined!</div>}
    </StyledForm>
  );
};

export default SignIn;
