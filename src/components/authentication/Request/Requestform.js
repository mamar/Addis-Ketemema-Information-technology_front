import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { API_URL } from '../../../pages/Constant1';
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const [officelist, setofficelist] = useState([]);
  const users = JSON.parse(localStorage.getItem('userinfo'));
  useEffect(() => {
    axios.get(`${API_URL}/Office/GetOffice`).then((Response) => {
      setofficelist(Response.data);
    });
  }, []);
  const navigate = useNavigate();
  const RegisterSchema = Yup.object().shape({
    division: Yup.string().required('required'),
    floor_no: Yup.string().required(' required'),
    office_no: Yup.string().required('required'),
    phone: Yup.string().required(' required'),
    request_type: Yup.string().required(' required'),
    problem_desc: Yup.string().required('required')
  });
  const formik = useFormik({
    initialValues: {
      division: '',
      floor_no: '',
      office_no: '',
      phone: '',
      request_type: '',
      problem_desc: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .post(`${API_URL}/Request/AddRequest/${users.user[0].username}`, {
          division: data.division,
          floor_no: data.floor_no,
          office_no: data.office_no,
          phone: data.phone,
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
          <TextField
            fullWidth
            autoComplete="division"
            type="text"
            label="የስራ ሂደት * "
            placeholder="የስራ ሂደት *"
            value={values.division}
            {...getFieldProps('division')}
            error={Boolean(touched.division && errors.division)}
            helperText={touched.division && errors.division}
          />
          <TextField
            fullWidth
            autoComplete="floor_no"
            type="text"
            label="አድራሻ * "
            placeholder="አድራሻ *"
            value={values.floor_no}
            {...getFieldProps('floor_no')}
            error={Boolean(touched.floor_no && errors.floor_no)}
            helperText={touched.floor_no && errors.floor_no}
          />

          <TextField
            fullWidth
            autoComplete="office_no"
            type="text"
            label="ቢሮ ቁጥር "
            placeholder="ቢሮ ቁጥር"
            value={values.office_no}
            {...getFieldProps('office_no')}
            error={Boolean(touched.office_no && errors.office_no)}
            helperText={touched.office_no && errors.office_no}
          />
          <TextField
            fullWidth
            autoComplete="phone"
            type="text"
            label="ስልክ ቁጥር *"
            placeholder="ስልክ ቁጥር *"
            value={values.phone}
            {...getFieldProps('phone')}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />
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
