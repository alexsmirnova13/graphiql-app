import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/userSlice';
import { FormRegistration } from '../helpers/types';
import StyledForm from '../components/style/StyledForm';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormRegistration>();

  // const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isDisabled, setDisabled] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setDisabled(!(isDirty && Object.keys(errors).length === 0));
  }, [errors, isDirty]);

  const onFormSubmit = async (form: FormRegistration) => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const accessToken = await userCredential.user.getIdToken();
      const newUser = {
        name: form.name,
        email: form.email,
        id: userCredential.user.uid,
        token: accessToken,
        refreshToken: userCredential.user.refreshToken,
      };
      console.log(newUser);
      dispatch(setUser(newUser));
      navigate('/graphi');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        alert(error.message);
      }
    }

    setIsValid(true);
    setTimeout(() => {
      reset();
      setIsValid(false);
    }, 1000);
  };

  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/;
  const namePattern = /^[A-Z][a-z]/;

  return (
    <StyledForm onSubmit={handleSubmit(onFormSubmit)} formHeigth="350px">
      <h3>Registration</h3>
      <div className="input-field">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          {...register('name', {
            required: 'Please enter your name',
            minLength: 3,
            maxLength: 30,
            pattern: namePattern,
          })}
        />
      </div>
      {errors.name && errors.name.type === 'required' && (
        <div className="error">{errors.name?.message}</div>
      )}
      {errors.name && errors.name.type === 'pattern' && (
        <div className="error">First letter must be uppercase!</div>
      )}
      {errors.name && errors.name.type === 'minLength' && (
        <div className="error">Name must be at least 3 characters long</div>
      )}
      {errors.name && errors.name.type === 'maxLength' && (
        <div className="error">Name must be no more than 30 characters long</div>
      )}
      <div className="input-field">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          {...register('email', {
            required: 'Please enter email',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format',
            },
          })}
        />
      </div>
      {errors.email && (
        <div className="error" role="alert">
          {errors.email.message}
        </div>
      )}
      <div className="input-field">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: 'Please enter password',
            maxLength: 19,
            minLength: 8,
            pattern: passwordPattern,
          })}
        />
      </div>
      {errors.password && errors.password.type === 'required' && (
        <div className="error">This field is required</div>
      )}
      {errors.password && errors.password.type === 'pattern' && (
        <div className="error">
          Password must contain at least one letter, one digit, and one special character
        </div>
      )}
      {errors.password && errors.password.type === 'minLength' && (
        <div className="error">Password must be at least 8 characters long</div>
      )}
      {errors.password && errors.password.type === 'maxLength' && (
        <div className="error">Password must be no more than 19 characters long</div>
      )}
      {isValid && <div style={{ color: '#deb887' }}>Registration completed successfully!</div>}
      <button className="button" type="submit" disabled={isDisabled}>
        CREATE ACCOUNT
      </button>
    </StyledForm>
  );
};

export default SignUp;
