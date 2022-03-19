import { LoadingButton } from '@mui/lab';
// material
import { Stack, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { API_URL } from '../../../pages/Constant1';
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  const RegisterSchema = Yup.object().shape({
    request_type: Yup.string().required(' required'),
    problem_desc: Yup.string().required('required')
  });
  const formik = useFormik({
    initialValues: {
      request_type: '',
      problem_desc: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .post(`${API_URL}/Request/AddRequest/${users ? users.user[0].username : null}`, {
          request_type: data.request_type,
          problem_desc: data.problem_desc
        })
        .then((Response) => {
          if (Response.data.Message === 'Success') {
            alert('Request Successfully Send');
            window.location.reload();
          }
          if (Response.data.Message === 'Error') {
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
      <Form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        style={{ backgroundColor: '#f2f2f2' }}
      >
        <Stack spacing={3}>
          <InputLabel id="demo-simple-select-label">የአገልግሎት አይነት</InputLabel>
          <br />
          <Select
            labelId="demo-simple-select-label"
            fullWidth
            autoComplete="request_type"
            type="text"
            label="የተጠየቀዉ የአገልግሎት አይነት *"
            placeholder="የተጠየቀዉ የአገልግሎት አይነት *"
            value={values.request_type}
            {...getFieldProps('request_type')}
            error={Boolean(touched.request_type && errors.request_type)}
            helperText={touched.request_type && errors.request_type}
          >
            <MenuItem value="Computer">ኮምፒዩተር</MenuItem>
            <MenuItem value="Printer">ፕሪንተር</MenuItem>
            <MenuItem value="Photocopy">ፎቶኮፒ</MenuItem>
            <MenuItem value="Network">ኔትወርክ</MenuItem>
            <MenuItem value="Software">ሶፍትዌር</MenuItem>
            <MenuItem value="Others">ሌላ</MenuItem>
          </Select>

          <TextField
            fullWidth
            autoComplete="problem_desc"
            type="text"
            label="ስላጋጠመዉ ችግር አጭር መግለጫ *"
            placeholder="ስላጋጠመዉ ችግር አጭር መግለጫ  *"
            value={values.problem_desc}
            {...getFieldProps('problem_desc')}
            error={Boolean(touched.problem_desc && errors.problem_desc)}
            helperText={touched.problem_desc && errors.problem_desc}
          />
          <LoadingButton
            fullWidth
            size="large"
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
