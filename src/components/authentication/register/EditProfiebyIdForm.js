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
    Position: Yup.string().required('Position is required'),
    ROLES: Yup.string().required('Roles is required'),
    Phone: Yup.string().required('Phone Number'),
    office_id: Yup.string().required('Office name is Required')
  });
  const formik = useFormik({
    initialValues: {
      user_fullname: userList.user_fullname,
      Position: userList.Position,
      Phone: userList.Phone,
      Gender: userList.Gender,
      office_id: '',
      ROLES: userList.ROLES
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
          office_id: data.office_id
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
                  label="Full Name"
                  placeholder="Full Name"
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
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
