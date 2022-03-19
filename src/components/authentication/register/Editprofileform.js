import { LoadingButton } from '@mui/lab';
// material
import { Stack, TextField } from '@mui/material';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { API_URL } from '../../../pages/Constant1';

// ----------------------------------------------------------------------

export default function Editprofileform() {
  const [userList, SetuserList] = useState([]);
  const users = JSON.parse(localStorage.getItem('userinfo'));
  useEffect(() => {
    axios
      .get(`${API_URL}/user/Getuserbyusername/${users ? users.user[0].username : null}`)
      .then((Response) => {
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
    Position: Yup.string().required(' required'),
    Phone: Yup.string().required('required')
  });
  const formik = useFormik({
    initialValues: {
      user_fullname: userList.user_fullname,
      Position: userList.Position,
      Phone: userList.Phone
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .patch(`${API_URL}/user/Updateusers/${users ? users.user[0].username : null}`, {
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
  const { errors, values, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        {userList.map((row) => (
          <Stack spacing={3} key={row.userid}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                autoComplete="user_fullname"
                label="ሙሉ ስም"
                placeholder="ሙሉ ስም"
                defaultValue={row.user_fullname}
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
              label="ስልክ ቁጥር "
              placeholder="ስልክ ቁጥር"
              defaultValue={row.Phone}
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
              placeholder="የስራ መደብ"
              defaultValue={row.Position}
              value={values.Position}
              {...getFieldProps('Position')}
              error={Boolean(touched.Position && errors.Position)}
              helperText={touched.Position && errors.Position}
            />
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
        ))}
      </Form>
    </FormikProvider>
  );
}
