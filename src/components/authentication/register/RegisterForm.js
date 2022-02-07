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

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const RegisterSchema = Yup.object().shape({
    user_fullname: Yup.string()
      .min(8, 'Too Short!')
      .max(50, 'Too Long!')
      .required('user_fullname required'),
    username: Yup.string().required('username is required'),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string()
      .required('please Confirm Passord')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    age: Yup.string().required('age is required'),
    Gender: Yup.string().required('Gender is required'),
    Position: Yup.string().required('Position is required'),
    ROLES: Yup.string().required('Roles is required'),
    Phone: Yup.string().required('Phone Number'),
    office_id: Yup.string().required('Office name is Required')
  });
  const [messagelist, setMessageList] = useState([]);
  const formik = useFormik({
    initialValues: {
      passwordConfirmation: '',
      office_id: '',
      username: '',
      ROLES: '',
      password: '',
      user_fullname: '',
      age: '',
      Gender: '',
      Position: '',
      Phone: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .post(`${API_URL}/Register`, {
          office_id: data.office_id,
          username: data.username,
          ROLES: data.ROLES,
          password: data.password,
          user_fullname: data.user_fullname,
          age: data.age,
          Gender: data.Gender,
          Position: data.Position,
          Phone: data.Phone
        })
        .then((Response) => {
          if (Response.data.Message === 'Username allready exist') {
            alert('UserName allready exist');
            window.location.reload();
          }
          if (Response.data.error === 'Server Error') {
            alert('Server Error');
            window.location.reload();
          } else {
            setMessageList(Response.data);
            alert('user Added Successfully');
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
              label="Full Name"
              placeholder="Full Name"
              value={values.user_fullname}
              {...getFieldProps('user_fullname')}
              error={Boolean(touched.user_fullname && errors.user_fullname)}
              helperText={touched.user_fullname && errors.user_fullname}
            />
          </Stack>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <br />
          <Select
            labelId="demo-simple-select-label"
            fullWidth
            autoComplete="Gender"
            type="text"
            label="Gender "
            placeholder="Gender"
            value={values.Gender}
            {...getFieldProps('Gender')}
            error={Boolean(touched.Gender && errors.Gender)}
            helperText={touched.Gender && errors.Gender}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
          <TextField
            fullWidth
            autoComplete="age"
            type="text"
            label="age "
            placeholder="age"
            value={values.age}
            {...getFieldProps('age')}
            error={Boolean(touched.age && errors.age)}
            helperText={touched.age && errors.age}
          />
          <TextField
            fullWidth
            autoComplete="Phone Number"
            type="text"
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
          <InputLabel id="demo-simple-select-label">Roles</InputLabel>
          <br />
          <Select
            labelId="demo-simple-select-label"
            fullWidth
            autoComplete="ROLES"
            type="text"
            label="ROLES "
            placeholder="Roles"
            value={values.ROLES}
            {...getFieldProps('ROLES')}
            error={Boolean(touched.ROLES && errors.ROLES)}
            helperText={touched.ROLES && errors.ROLES}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
          </Select>

          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="Username "
            placeholder="username"
            value={values.username}
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="Password"
            value={values.password}
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            autoComplete="passwordConfirmation"
            type={showPassword ? 'text' : 'passwordConfirmation'}
            label="passwordConfirmation"
            placeholder="passwordConfirmation"
            value={values.passwordConfirmation}
            {...getFieldProps('passwordConfirmation')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
            helperText={touched.passwordConfirmation && errors.passwordConfirmation}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
