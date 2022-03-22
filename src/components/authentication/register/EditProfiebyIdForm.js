import { LoadingButton } from '@mui/lab';
import { InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
// material
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { API_URL } from '../../../pages/Constant1';

// ----------------------------------------------------------------------

export default function EditProfiebyIdForm() {
  const [userList, SetuserList] = useState([]);
  const userid = JSON.parse(JSON.stringify(useParams()));
  const [officelist, setofficelist] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/Office/GetOffice`).then((Response) => {
      setofficelist(Response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${API_URL}/user/Getuserbyid/${userid.userid}`).then((Response) => {
      if (Response.data === 'error') {
        alert('Server Error');
      } else {
        SetuserList(Response.data);
      }
    });
  }, []);
  const RegisterSchema = Yup.object().shape({
    user_fullname: Yup.string()
      .min(8, 'Too Short!')
      .max(50, 'Too Long!')
      .required('user_fullname required'),
    Gender: Yup.string().required('Gender is required'),
    Position: Yup.string().nullable().notRequired(),
    ROLES: Yup.string().required('Roles is required'),
    Phone: Yup.number().integer().required('required').typeError('must be a valid number'),
    office_id: Yup.string().required('Office name is Required'),
    floor_no: Yup.string().required(' required'),
    division: Yup.string().required(' required'),
    office_no: Yup.string().nullable().notRequired().typeError('must be a valid number')
  });
  const formik = useFormik({
    initialValues: {
      user_fullname: userList.user_fullname,
      Position: userList.Position,
      Phone: userList.Phone,
      Gender: userList.Gender,
      office_id: '',
      ROLES: userList.ROLES,
      division: userList.division,
      office_no: userList.office_no,
      floor_no: userList.floor_no
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .patch(`${API_URL}/user/Updateusersbyid/${userid.userid}`, {
          user_fullname: data.user_fullname,
          Position: data.Position,
          Phone: data.Phone,
          Gender: data.Gender,
          ROLES: data.ROLES,
          office_id: data.office_id,
          office_no: data.office_no,
          floor_no: data.floor_no
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
            label="ፅ/ቤት * "
            placeholder="ፅ/ቤት *"
            value={values.office_id}
            {...getFieldProps('office_id')}
            error={Boolean(touched.office_id && errors.office_id)}
            helpertext={touched.office_id && errors.office_id}
          >
            {officelist.map((value) => (
              <MenuItem value={value.office_id} key={value.office_id}>
                {value.office_name}
              </MenuItem>
            ))}
          </Select>
          {userList.map((row) => (
            <Stack spacing={3} key={row.userid}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="ሙሉ ስም *"
                  placeholder="ሙሉ ስም *"
                  defaultValue={row.user_fullname}
                  value={values.user_fullname}
                  {...getFieldProps('user_fullname')}
                  error={Boolean(touched.user_fullname && errors.user_fullname)}
                  helpertext={touched.user_fullname && errors.user_fullname}
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
                defaultValue={row.Gender}
                value={values.Gender}
                {...getFieldProps('Gender')}
                error={Boolean(touched.Gender && errors.Gender)}
                helpertext={touched.Gender && errors.Gender}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
              <TextField
                fullWidth
                autoComplete="Phone Number"
                type="text"
                label="Phone Number "
                placeholder="Phone Number"
                defaultValue={row.Phone}
                value={values.Phone}
                {...getFieldProps('Phone')}
                error={Boolean(touched.Phone && errors.Phone)}
                helpertext={touched.Phone && errors.Phone}
              />
              <TextField
                fullWidth
                autoComplete="division"
                type="text"
                label="የስራ ሂደት "
                placeholder="ስልክ ቁጥር"
                defaultValue={row.division}
                value={values.division}
                {...getFieldProps('division')}
                error={Boolean(touched.division && errors.division)}
                helperText={touched.division && errors.division}
              />
              <TextField
                fullWidth
                autoComplete="floor_no"
                type="number"
                label="አድራሻ "
                placeholder="አድራሻ"
                defaultValue={row.floor_no}
                value={values.floor_no}
                {...getFieldProps('floor_no')}
                error={Boolean(touched.floor_no && errors.floor_no)}
                helperText={touched.floor_no && errors.floor_no}
              />
              <TextField
                fullWidth
                autoComplete="office_no"
                type="number"
                label="ቢሮ ቁጥር "
                placeholder="ቢሮ ቁጥር"
                defaultValue={row.office_no}
                value={values.office_no}
                {...getFieldProps('office_no')}
                error={Boolean(touched.office_no && errors.office_no)}
                helperText={touched.office_no && errors.office_no}
              />
              <TextField
                fullWidth
                autoComplete="Position"
                type="text"
                label="Position "
                placeholder="Position"
                defaultValue={row.Position}
                value={values.Position}
                {...getFieldProps('Position')}
                error={Boolean(touched.Position && errors.Position)}
                helpertext={touched.Position && errors.Position}
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
                defaultValue={row.ROLES}
                value={values.ROLES}
                {...getFieldProps('ROLES')}
                error={Boolean(touched.ROLES && errors.ROLES)}
                helpertext={touched.ROLES && errors.ROLES}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="Employee">Employee</MenuItem>
              </Select>
            </Stack>
          ))}

          <LoadingButton
            fullWidth
            size="medium"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            style={{ backgroundColor: '#75077E' }}
          >
            Update
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
