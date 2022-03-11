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

export default function ItStandardForm() {
  const navigate = useNavigate();
  const requestid = JSON.parse(JSON.stringify(useParams()));
  const [standardlist, setStandardlist] = useState([]);
  const RegisterSchema = Yup.object().shape({
    standardid: Yup.string().required('required')
  });
  useEffect(() => {
    axios.get(`${API_URL}/GetAllStandard`).then((Response) => {
      setStandardlist(Response.data);
    });
  });
  const formik = useFormik({
    initialValues: {
      standardid: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .post(`${API_URL}/ItStandardForm/${requestid.requestid}`, {
          standardid: data.standardid
        })
        .then((Response) => {
          if (Response.data.Message === 'success') {
            alert('Standard Sumbited Successfully');
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
          <InputLabel id="demo-simple-select-label">የአግልግሎቱን አይነት ይምረጡ</InputLabel>
          <br />
          <Select
            labelId="demo-simple-select-label"
            fullWidth
            autoComplete="standradid"
            type="text"
            label="standardid "
            placeholder="standardid"
            value={values.standardid}
            {...getFieldProps('standardid')}
            error={Boolean(touched.standardid && errors.standardid)}
            helperText={touched.standardid && errors.standardid}
          >
            {standardlist.map((value) => (
              <MenuItem value={value.standardid}> {value.service}</MenuItem>
            ))}
          </Select>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            ስታንዳርዱን ይላኩ
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
