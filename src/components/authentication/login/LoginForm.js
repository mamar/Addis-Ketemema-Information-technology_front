import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
// material
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { API_URL } from '../../../pages/Constant1';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  axios.defaults.withCredentials = true;

  const LoginSchema = Yup.object().shape({
    username: Yup.string().min(3).required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (data) => {
      axios
        .post(`${API_URL}/user/Login`, {
          username: data.username,
          password: data.password
        })
        .then((response) => {
          if (response.data.auth === true) {
            if (response.data.user[0].ROLES === 'Employee') {
              console.log(response.data);
              localStorage.setItem('userinfo', JSON.stringify(response.data));
              console.log(response.data.user[0].ROLES);
              navigate('/Satisfaction', { replace: true });
              // setloginstatus(response.data.user[0].username);
            }
            if (response.data.user[0].ROLES === 'Admin' || response.data.user[0].ROLES === 'IT') {
              localStorage.setItem('userinfo', JSON.stringify(response.data));
              navigate('/dashboard/app', { replace: true });
              // setloginstatus(response.data.user[0].username);
            }
          }
          if (response.data.auth === false) {
            alert('Wrong username or password');
            window.location.reload();
            // setloginerrors(response.data.Message);
          }
        });
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="username"
            label="Username "
            value={values.username}
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            value={values.password}
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>
        <br />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          style={{ backgroundColor: '#75077E' }}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
