import { TextInput, Button, Group, Box, PasswordInput, Loader, Alert } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword, registerWithEmailAndPassword } from '../firebase';
import { Trans } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { IconAlertCircle } from '@tabler/icons-react';
import { isExpiredToken } from '../helpers/isExpiredToken';

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
            email: isEmail(<Trans i18nKey={'formError.email'} />),

            password: function (value) {
              const passwordRegex =
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
              if (!passwordRegex.test(value)) {
                return <Trans i18nKey={'formError.password'} />;
              }
            },
          },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading] = useAuthState(auth);
  const [formError, setFormError] = useState<JSX.Element | null>(null);

  const onFormSubmit = form.onSubmit(async (form) => {
    const handler = title === 'Login' ? logInWithEmailAndPassword : registerWithEmailAndPassword;
    try {
      const user = await handler(form);
      if (user) {
        dispatch(setUser(user));
        isExpiredToken();
        navigate('/');
      }
    } catch (err) {
      if (err instanceof Error) {
        const error =
          err.message === 'Invalid email address' ? (
            <Trans i18nKey={'formError.wrEmail'} />
          ) : err.message === 'Wrong password' ? (
            <Trans i18nKey={'formError.wrPassword'} />
          ) : err.message === 'User not found! Check login or password!' ? (
            <Trans i18nKey={'formError.noUser'} />
          ) : err.message === 'User with this email exists!' ? (
            <Trans i18nKey={'formError.exitsUser'} />
          ) : (
            <Trans i18nKey={'formError.generelError'} />
          );
        setFormError(error);
      }
      setTimeout(() => {
        setFormError(null);
      }, 3000);
    }
  });

  const btn = handler === 'Login' ? 'form.login' : 'form.signup';
  const h3Title = title === 'Login' ? 'form.login' : 'form.registration';

  return (
    <>
      <Box maw={300} mx="auto">
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
            placeholder="********"
            {...form.getInputProps('password')}
          />

          <Group position="right" mt="md">
            <Button type="submit">
              <Trans i18nKey={btn} />
            </Button>
          </Group>
        </form>
      </Box>
      {loading && <Loader />}
      {formError && (
        <Alert
          w={300}
          mx="auto"
          mt={15}
          icon={<IconAlertCircle size="1rem" />}
          title={<Trans i18nKey="formError.alert" />}
          color="red"
        >
          {formError}
        </Alert>
      )}
    </>
  );
};
