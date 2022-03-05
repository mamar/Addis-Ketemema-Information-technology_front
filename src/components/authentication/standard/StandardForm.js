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
    service: Yup.string().required('required'),
    measurement: Yup.string().required(' required'),
    time: Yup.string().required('required'),
    price: Yup.string().required('required')
  });
  const formik = useFormik({
    initialValues: {
      service: '',
      measurement: '',
      time: '',
      price: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .post(`${API_URL}/AddStandard`, {
          service: data.service,
          measurement: data.measurement,
          time: data.time,
          price: data.price
        })
        .then((Response) => {
          if (Response.data.Message === 'error') {
            alert('server error');
            window.location.reload();
          }
          if (Response.data.Message === 'success') {
            alert('Standard Add Successfully');
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
          <TextField
            label="የአገልግሎቱ አይነት *"
            placeholder="የአገልግሎቱ አይነት *"
            value={values.service}
            {...getFieldProps('service')}
            error={Boolean(touched.service && errors.service)}
            helperText={touched.service && errors.service}
          />
          <TextField
            autoComplete="measurement"
            type="text"
            label="መለኪያ *"
            placeholder="መለኪያ *"
            value={values.measurement}
            {...getFieldProps('measurement')}
            error={Boolean(touched.measurement && errors.measurement)}
            helperText={touched.measurement && errors.measurement}
          />
          <TextField
            autoComplete="time"
            type="text"
            label="ጊዜ* "
            placeholder="ጊዜ*"
            value={values.time}
            {...getFieldProps('time')}
            error={Boolean(touched.time && errors.time)}
            helperText={touched.time && errors.time}
          />
          <TextField
            autoComplete="price"
            type="text"
            label="ዋጋ* "
            placeholder="ዋጋ*"
            value={values.price}
            {...getFieldProps('price')}
            error={Boolean(touched.price && errors.price)}
            helperText={touched.price && errors.price}
          />

          <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
            Add
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
