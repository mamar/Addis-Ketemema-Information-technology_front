import { LoadingButton } from '@mui/lab';
// material
import { Box, Stack, TextField } from '@mui/material';
// material
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { API_URL } from '../../../pages/Constant1';
// layouts
// components
// ----------------------------------------------------------------------

export default function EditOffice() {
  const officeid = JSON.parse(JSON.stringify(useParams()));
  const [officeList, setofficelist] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/Office/GetOffice`).then((Response) => {
      setofficelist(Response.data);
    });
  }, []);

  const RegisterSchema = Yup.object().shape({
    office_name: Yup.string()
      .min(8, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Office Name required'),
    floor_no: Yup.string().required('Floor_no is required'),
    phone: Yup.string().required('Phone is required')
  });
  const formik = useFormik({
    initialValues: {
      office_name: officeList.office_name,
      floor_no: officeList.floor_no,
      phone: officeList.phone
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .put(`${API_URL}/Office/updateOffice/${officeid.office_id}`, {
          office_name: data.office_name,
          floor_no: data.floor_no,
          phone: data.phone
        })
        .then((Response) => {
          if (Response.data.Message === 'success') {
            alert('office Updated Successfully');
            window.location.reload();
          }
          if (Response.data.Message === 'error') {
            alert('Server Error');
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
        {officeList.map((row) => (
          <Stack spacing={3} key={row.office_id}>
            <TextField
              label="office_name"
              placeholder="office_name "
              defaultValue={row.office_name}
              value={values.office_name}
              {...getFieldProps('office_name')}
              error={Boolean(touched.office_name && errors.office_name)}
              helperText={touched.office_name && errors.office_name}
            />
            <TextField
              autoComplete="floor_no"
              type="text"
              label="floor_no "
              placeholder="floor_no"
              defaultValue={row.floor_no}
              value={values.floor_no}
              {...getFieldProps('floor_no')}
              error={Boolean(touched.floor_no && errors.floor_no)}
              helperText={touched.floor_no && errors.floor_no}
            />
            <TextField
              autoComplete="phone"
              type="text"
              label="phone "
              placeholder="phone"
              defaultValue={row.phone}
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
        ))}
      </Form>
    </FormikProvider>
  );
}
