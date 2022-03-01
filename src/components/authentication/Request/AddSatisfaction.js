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
    satisfaction: Yup.string().required('satisfaction is required'),
    comment: Yup.string().required('Comment is required')
  });
  const formik = useFormik({
    initialValues: {
      satisfaction: '',
      comment: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .put(`${API_URL}/SendSatsfaction/${requestid.request_id}`, {
          satisfaction: data.satisfaction,
          comment: data.comment
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
            label="እርካታ * "
            placeholder="እርካታ *"
            value={values.satisfaction}
            {...getFieldProps('satisfaction')}
            error={Boolean(touched.satisfaction && errors.satisfaction)}
            helperText={touched.satisfaction && errors.satisfaction}
          >
            <MenuItem value="95">95%</MenuItem>
            <MenuItem value="76">75%-95%</MenuItem>
            <MenuItem value="55">50%-75%</MenuItem>
            <MenuItem value="45"> less than 50%</MenuItem>
          </Select>
          <TextField
            fullWidth
            autoComplete="comment"
            type="text"
            label="አስተያየት * "
            placeholder="አስተያየት *"
            value={values.comment}
            {...getFieldProps('comment')}
            error={Boolean(touched.comment && errors.comment)}
            helperText={touched.comment && errors.comment}
          />
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
