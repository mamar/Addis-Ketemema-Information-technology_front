import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { API_URL } from '../../../pages/Constant1';

// ----------------------------------------------------------------------

export default function Editprofileform() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const RegisterSchema = Yup.object().shape({
    user_fullname: Yup.string()
      .min(8, 'Too Short!')
      .max(50, 'Too Long!')
      .required('user_fullname required'),
    Position: Yup.string().required('Position is required'),
    Phone: Yup.string().required('Phone Number'),
    office_id: Yup.string().required('Office name is Required')
  });
  const [messagelist, setMessageList] = useState([]);
  const users = JSON.parse(localStorage.getItem('userinfo'));
  const formik = useFormik({
    initialValues: {
      office_id: users.user[0].office_id,
      user_fullname: users.user[0].user_fullname,
      Position: users.user[0].Position,
      Phone: users.user[0].Phone
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .patch(`${API_URL}/Updateusers/${users.user[0].username}`, {
          office_id: data.office_id,
          user_fullname: data.user_fullname,
          Position: data.Position,
          Phone: data.Phone
        })
        .then((Response) => {
          if (Response.data.Message === 'Error') {
            alert('Server error');
            console.log(Response.data);
            window.location.reload();
          }
          if (Response.data.Message === 'Success') {
            alert('Updated Successfully');
            console.log(Response.data);
            window.location.reload();
          }
        });
    }
  });
  const [officelist, setofficelist] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/GetOffice`).then((Response) => {
      setofficelist(Response.data);
    });
  });
  const { errors, values, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <InputLabel id="demo-simple-select-label">Select Office</InputLabel>
          <br />
          <Select
            labelId="demo-simple-select-label"
            fullWidth
            autoComplete="office_id"
            type="text"
            label="office_id "
            placeholder="office_id"
            value={values.office_id}
            {...getFieldProps('office_id')}
            error={Boolean(touched.office_id && errors.office_id)}
            helperText={touched.office_id && errors.office_id}
          >
            {officelist.map((value) => (
              <MenuItem value={value.office_id}> {value.office_name}</MenuItem>
            ))}
          </Select>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              autoComplete="user_fullname"
              label="Full Name"
              placeholder="Full Name"
              value={values.user_fullname}
              {...getFieldProps('user_fullname')}
              error={Boolean(touched.user_fullname && errors.user_fullname)}
              helperText={touched.user_fullname && errors.user_fullname}
            />
          </Stack>
          <TextField
            fullWidth
            autoComplete="Phone"
            type="number"
            label="Phone Number "
            placeholder="Phone Number"
            value={values.Phone}
            {...getFieldProps('Phone')}
            error={Boolean(touched.Phone && errors.Phone)}
            helperText={touched.Phone && errors.Phone}
          />
          <TextField
            fullWidth
            autoComplete="Position"
            type="text"
            label="Position "
            placeholder="Position"
            value={values.Position}
            {...getFieldProps('Position')}
            error={Boolean(touched.Position && errors.Position)}
            helperText={touched.Position && errors.Position}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Update
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
