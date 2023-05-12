import { TextInput, Button, Group, Box, PasswordInput } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { Trans, useTranslation } from 'react-i18next';

type FormProps = {
  title: string;
  handler: string;
};

export const Form = ({ title, handler }: FormProps) => {
  const passwordError = <Trans i18nKey={'formError.password'} />;
  const { i18n } = useTranslation();
  const lang = i18n.language;
  console.log(lang);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate:
      title === 'Login'
        ? {}
        : {
            // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            email: isEmail(<Trans i18nKey={'formError.email'} />),

            password: function (value) {
              const passwordRegex =
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
              if (!passwordRegex.test(value)) {
                // return 'Password must be at least 8 characters long and contain at least one letter, one digit, and one special character';
                return passwordError;
                // return '123';
              }
            },
          },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = form.onSubmit(async (form) => {
    const handler = title === 'Login' ? signInWithEmailAndPassword : createUserWithEmailAndPassword;
    try {
      const userCredential = await handler(auth, form.email, form.password);
      const accessToken = await userCredential.user.getIdToken();
      const newUser = {
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
      }
    }
  });

  const btn = handler === 'Login' ? 'form.login' : 'form.signup';
  const h3Title = title === 'Login' ? 'form.login' : 'form.registration';

  return (
    <Box maw={300} mx="auto">
      {form.getInputProps('email').error}
      <h3>
        <Trans i18nKey={h3Title} />
      </h3>
      <form onSubmit={onFormSubmit}>
        <TextInput
          withAsterisk
          label={<Trans i18nKey="form.email" />}
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          withAsterisk
          label={<Trans i18nKey="form.password" />}
          placeholder="Password"
          {...form.getInputProps('password')}
        />

        <Group position="right" mt="md">
          <Button type="submit">
            {' '}
            <Trans i18nKey={btn} />
          </Button>
        </Group>
      </form>
    </Box>
  );
};
