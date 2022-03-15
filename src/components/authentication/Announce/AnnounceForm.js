import * as Yup from 'yup';
import { useState, forwardRef } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
// material
import {
  Box,
  Card,
  Link,
  Container,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  TextareaAutosize
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { width } from '@mui/system';
// material
import { styled } from '@mui/material/styles';
import { API_URL } from '../../../pages/Constant1';
// layouts
// components
// ----------------------------------------------------------------------

export default function AnnounceForm() {
  const navigate = useNavigate();
  const RegisterSchema = Yup.object().shape({
    anounceName: Yup.string().min(8, 'Too Short!').max(50, 'Too Long!').required('required')
  });
  const formik = useFormik({
    initialValues: {
      anounceName: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .post(`${API_URL}/AddAnnounce`, {
          anounceName: data.anounceName
        })
        .then((Response) => {
          if (Response.data.Message === 'success') {
            alert(' Added Successfully');
            window.location.reload();
          }
          if (Response.data.Message === 'error') {
            alert('server error');
            window.location.reload();
          }
        });
    }
  });

  const Page = forwardRef(({ children, title = '', ...other }, ref) => (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  ));

  Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string
  };

  const { errors, values, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }));
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextareaAutosize
            label="ማሳሰቢያ *"
            placeholder="ማሳሰቢያ *"
            value={values.anounceName}
            {...getFieldProps('anounceName')}
            error={Boolean(touched.anounceName && errors.anounceName)}
            helpertex={touched.anounceName && errors.anounceName}
          />
          <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
            Add
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
