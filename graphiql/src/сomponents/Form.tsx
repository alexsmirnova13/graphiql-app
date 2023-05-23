import { TextInput, Button, Group, Box, PasswordInput, Loader, Alert } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword, registerWithEmailAndPassword } from '../firebase';
import { Trans } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { IconAlertCircle } from '@tabler/icons-react';

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
  const [user, loading, error] = useAuthState(auth);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (error) return;
    if (user) navigate('/graphi');
  }, [user, loading, error, navigate]);

  const onFormSubmit = form.onSubmit(async (form) => {
    const handler = title === 'Login' ? logInWithEmailAndPassword : registerWithEmailAndPassword;
    try {
      const user = await handler(form);
      if (user) {
        dispatch(setUser(user));
      }
    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message);
      }
      setTimeout(() => {
        setFormError('');
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
          title="Attention!"
          color="red"
        >
          {formError}
        </Alert>
      )}
    </>
  );
};
