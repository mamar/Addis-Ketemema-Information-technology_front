import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import { API_URL } from '../../../pages/Constant1';

// ----------------------------------------------------------------------

export default function AddSatisfaction() {
  const navigate = useNavigate();
  const requestid = JSON.parse(JSON.stringify(useParams()));
  const RegisterSchema = Yup.object().shape({
    satisfaction: Yup.string().required('satisfaction is required')
  });
  const formik = useFormik({
    initialValues: {
      satisfaction: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .put(`${API_URL}/SendSatsfaction/${requestid.request_id}`, {
          satisfaction: data.satisfaction
        })
        .then((Response) => {
          if (Response.data.Message === 'success') {
            alert('Satisfaction Sumbited Successfully');
            window.location.reload();
          }
          if (Response.data.Message === 'error') {
            alert('Server error');
            window.location.reload();
          }
        });
      // navigate('/dashboard', { replace: true });
      // navigate('/dashboard', { replace: true });
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <InputLabel id="demo-simple-select-label">Problem Type</InputLabel>
          <br />
          <Select
            labelId="demo-simple-select-label"
            fullWidth
            autoComplete="satisfaction"
            type="text"
            label="satisfaction "
            placeholder="satisfaction"
            value={values.satisfaction}
            {...getFieldProps('satisfaction')}
            error={Boolean(touched.satisfaction && errors.satisfaction)}
            helperText={touched.satisfaction && errors.satisfaction}
          >
            <MenuItem value="95%">95%</MenuItem>
            <MenuItem value="75%-95%">75%-95%</MenuItem>
            <MenuItem value="50%-75%">50%-75%</MenuItem>
            <MenuItem value="less than 50%"> less than 50%</MenuItem>
          </Select>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Submit
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
