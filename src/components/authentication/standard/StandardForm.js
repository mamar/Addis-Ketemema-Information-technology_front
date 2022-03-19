import { LoadingButton } from '@mui/lab';
// material
import { Box, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
import { API_URL } from '../../../pages/Constant1';
// layouts
// components
// ----------------------------------------------------------------------

export default function StandardForm() {
  const RegisterSchema = Yup.object().shape({
    service: Yup.string().required('required'),
    measurement: Yup.string().required(' required'),
    time: Yup.string().required('required'),
    price: Yup.number().integer().required('required').typeError('must be a valid number')
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
        .post(`${API_URL}/Standard/AddStandard`, {
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

          <LoadingButton
            size="medium"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            style={{ backgroundColor: '#75077E' }}
          >
            Add
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
