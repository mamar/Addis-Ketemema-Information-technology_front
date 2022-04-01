import { LoadingButton } from '@mui/lab';
// material
import { Box, Stack, TextField, TextareaAutosize } from '@mui/material';
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

export default function Officeform() {
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
        .post(`${API_URL}/Office/AddOffice`, {
          office_name: data.office_name,
          floor_no: data.floor_no,
          phone: data.phone
        })
        .then((Response) => {
          console.log(Response);
        });
      alert('office Added Successfully');
      window.location.reload();
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
          <TextareaAutosize
            style={{ height: 200, maxWidth: 480 }}
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
            value={values.floor_no}
            {...getFieldProps('floor_no')}
            error={Boolean(touched.floor_no && errors.floor_no)}
            helperText={touched.floor_no && errors.floor_no}
          />
          <TextField
            autoComplete="phone"
            type="text"
            label="ስልክ ቁጥር * "
            placeholder="ስልክ ቁጥር *"
            value={values.phone}
            {...getFieldProps('phone')}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
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
