import { TextInput, Button, Group, Box, PasswordInput } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { Trans } from 'react-i18next';

type FormProps = {
  title: string;
  handler: string;
};

export const Form = ({ title, handler }: FormProps) => {
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
            email: isEmail('Invalid email'),
            password: (value) => {
              const passwordRegex =
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
              if (!passwordRegex.test(value)) {
                return 'Password must be at least 8 characters long and contain at least one letter, one digit, and one special character';
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
      <h3>
        <Trans i18nKey={h3Title} />
      </h3>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await onFormSubmit();
          form.reset();
        }}
      >
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        >
          {/* <Trans i18nKey="form.email" /> */}
        </TextInput>

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="Password"
          {...form.getInputProps('password')}
        >
          {/* <Trans i18nKey="form.password" /> */}
        </PasswordInput>

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
