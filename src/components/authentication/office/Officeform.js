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

export default function Officeform() {
  const navigate = useNavigate();
  const RegisterSchema = Yup.object().shape({
    office_name: Yup.string().min(8, 'Too Short!').max(50, 'Too Long!').required('required'),
    floor_no: Yup.string().required(' required'),
    phone: Yup.string().required('required')
  });
  const formik = useFormik({
    initialValues: {
      office_name: '',
      floor_no: '',
      phone: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .post(`${API_URL}/AddOffice`, {
          office_name: data.office_name,
          floor_no: data.floor_no,
          phone: data.phone
        })
        .then((Response) => {
          console.log(Response);
        });
      alert('office Added Successfully');
      navigate('/dashboard', { replace: true });
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
          <TextField
            label="የፅ/ቤቱ ስም *"
            placeholder="የፅ/ቤቱ ስም *"
            value={values.office_name}
            {...getFieldProps('office_name')}
            error={Boolean(touched.office_name && errors.office_name)}
            helperText={touched.office_name && errors.office_name}
          />
          <TextField
            autoComplete="floor_no"
            type="text"
            label="አድራሻ *"
            placeholder="ድራሻ *"
            value={values.Gender}
            {...getFieldProps('floor_no')}
            error={Boolean(touched.floor_no && errors.floor_no)}
            helperText={touched.floor_no && errors.floor_no}
          />
          <TextField
            autoComplete="phone"
            type="text"
            label="ስልክ ቁጥር * "
            placeholder="ስልክ ቁጥር *"
            value={values.age}
            {...getFieldProps('phone')}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />

          <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
            Add
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
