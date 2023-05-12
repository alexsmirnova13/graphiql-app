import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from './../components/Form';

const SignUp = () => {
  return <Form title="Create account" handler="Registration"></Form>;
};

export default SignUp;
