import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
// material
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { API_URL } from '../../../pages/Constant1';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const users = JSON.parse(localStorage.getItem('userinfo'));
  const RegisterSchema = Yup.object().shape({
    user_fullname: Yup.string().min(8, 'Too Short!').max(20, 'Too Long!').required(' required'),
    username: Yup.string().required(' required'),
    password: Yup.string().required('required'),
    passwordConfirmation: Yup.string()
      .required('please Confirm Passord')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    age: Yup.number().integer().nullable().notRequired().typeError('must be a valid number'),
    Gender: Yup.string().required(' required'),
    division: Yup.string().required(' required'),
    floor_no: Yup.number().integer().required('required').typeError('must be a valid number'),
    office_no: Yup.number().integer().nullable().notRequired().typeError('must be a valid number'),
    Position: Yup.string().nullable().notRequired(),
    ROLES: Yup.string().required('required'),
    Phone: Yup.number().integer().required('required').typeError('must be a valid number'),
    office_id: Yup.string().required('Required')
  });
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
      division: '',
      floor_no: '',
      office_no: '',
      Position: '',
      Phone: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .post(`${API_URL}/user/Register`, {
          office_id: data.office_id,
          username: data.username,
          ROLES: data.ROLES,
          password: data.password,
          user_fullname: data.user_fullname,
          age: data.age,
          Gender: data.Gender,
          division: data.division,
          floor_no: data.floor_no,
          office_no: data.office_no,
          Position: data.Position,
          Phone: data.Phone
        })
        .then((Response) => {
          if (Response.data.Message === 'Username allready exist') {
            alert('UserName allready exist');
            window.location.reload();
          }
          if (Response.data.Message === 'error') {
            alert('Server Error');
            window.location.reload();
          }
          if (Response.data.Message === 'sucess') {
            alert('user Added Successfully');
            window.location.reload();
          }
        });
    }
  });
  const [officelist, setofficelist] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/Office/GetOffice`).then((Response) => {
      setofficelist(Response.data);
    });
  }, []);
  const { errors, values, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <InputLabel id="demo-simple-select-label">ፅ/ቤት *</InputLabel>
          <br />
          <Select
            labelId="demo-simple-select-label"
            fullWidth
            autoComplete="office_id"
            type="text"
            label="ፅ/ቤት *"
            placeholder="ፅ/ቤት *"
            value={values.office_id}
            {...getFieldProps('office_id')}
            error={Boolean(touched.office_id && errors.office_id)}
            helperText={touched.office_id && errors.office_id}
          >
            {officelist.map((value) => (
              <MenuItem value={value.office_id} key={value.office_id}>
                {value.office_name}
              </MenuItem>
            ))}
          </Select>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="ሙሉ ስም *"
              placeholder="ሙሉ ስም *"
              value={values.user_fullname}
              {...getFieldProps('user_fullname')}
              error={Boolean(touched.user_fullname && errors.user_fullname)}
              helperText={touched.user_fullname && errors.user_fullname}
            />
          </Stack>
          <InputLabel id="demo-simple-select-label">ፆታ *</InputLabel>
          <br />
          <Select
            labelId="demo-simple-select-label"
            fullWidth
            autoComplete="Gender "
            type="text"
            label="ፆታ *"
            placeholder="ፆታ *"
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
            autoComplete="division "
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
            placeholder="ቢሮ ቁጥር "
            value={values.office_no}
            {...getFieldProps('office_no')}
            error={Boolean(touched.office_no && errors.office_no)}
            helperText={touched.office_no && errors.office_no}
          />

          <TextField
            fullWidth
            autoComplete="age"
            type="text"
            label="እድሜ "
            placeholder="እድሜ "
            value={values.age}
            {...getFieldProps('age')}
            error={Boolean(touched.age && errors.age)}
            helperText={touched.age && errors.age}
          />
          <TextField
            fullWidth
            autoComplete="Phone Number"
            type="text"
            label="ስልክ ቁጥር *"
            placeholder="ስልክ ቁጥር *"
            value={values.Phone}
            {...getFieldProps('Phone')}
            error={Boolean(touched.Phone && errors.Phone)}
            helperText={touched.Phone && errors.Phone}
          />
          <TextField
            fullWidth
            autoComplete="Position"
            type="text"
            label="የስራ መደብ "
            placeholder="የስራ መደብ "
            value={values.Position}
            {...getFieldProps('Position')}
            error={Boolean(touched.Position && errors.Position)}
            helperText={touched.Position && errors.Position}
          />
          <InputLabel id="demo-simple-select-label">Roles *</InputLabel>
          <br />
          <Select
            labelId="demo-simple-select-label"
            fullWidth
            autoComplete="ROLES"
            type="text"
            label="ROLES *"
            placeholder="Roles *"
            value={values.ROLES}
            {...getFieldProps('ROLES')}
            error={Boolean(touched.ROLES && errors.ROLES)}
            helperText={touched.ROLES && errors.ROLES}
          >
            {users.user[0].ROLES === 'Admin' ? <MenuItem value="Admin">Admin</MenuItem> : null}
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
          </Select>

          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="Username * "
            placeholder="username *"
            value={values.username}
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password *"
            placeholder="Password *"
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
            label="password Confirmation *"
            placeholder="password Confirmation *"
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
            size="medium"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            style={{ backgroundColor: '#75077E' }}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
