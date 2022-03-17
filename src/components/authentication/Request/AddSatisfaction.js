import { LoadingButton } from '@mui/lab';
// material
import { Stack, TextField } from '@mui/material';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { API_URL } from '../../../pages/Constant1';
// ----------------------------------------------------------------------

export default function AddSatisfaction() {
  const navigate = useNavigate();
  const requestid = JSON.parse(JSON.stringify(useParams()));
  const RegisterSchema = Yup.object().shape({
    satisfaction: Yup.string().required('required'),
    comment: Yup.string().required('required')
  });
  const formik = useFormik({
    initialValues: {
      satisfaction: '',
      comment: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .put(`${API_URL}/Request/SendSatsfaction/${requestid.request_id}`, {
          satisfaction: data.satisfaction,
          comment: data.comment
        })
        .then((Response) => {
          if (Response.data.Message === 'success') {
            alert('Satisfaction Sumbited Successfully');
            navigate('/Satisfaction', { replace: true });
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
          <TextField
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
          />
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
            size="medium"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            style={{ backgroundColor: '#75077E' }}
          >
            ይላኩ
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
