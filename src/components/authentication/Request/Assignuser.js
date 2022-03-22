import { LoadingButton } from '@mui/lab';
// material
import { Stack } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { API_URL } from '../../../pages/Constant1';
// ----------------------------------------------------------------------

export default function Assignuser() {
  const requestid = JSON.parse(JSON.stringify(useParams()));
  const users = JSON.parse(localStorage.getItem('userinfo'));
  const [userlist, setuserList] = useState([]);
  const RegisterSchema = Yup.object().shape({
    workerusername: Yup.string().required('required')
  });
  useEffect(() => {
    axios.get(`${API_URL}/user/GetuserIT`).then((Response) => {
      setuserList(Response.data);
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      workerusername: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .put(
          `${API_URL}/Request/AssignUser/${requestid.requestid}/${
            users ? users.user[0].username : null
          }`,
          {
            workerusername: data.workerusername
          }
        )
        .then((Response) => {
          if (Response.data.Message === 'Success') {
            alert('Task Assigned Successful');
            window.location.reload();
          }
          if (Response.data.Message === 'Error') {
            alert('Server error');
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
          <InputLabel id="demo-simple-select-label">የሰራተኛዉ ስም</InputLabel>
          <br />
          <Select
            labelId="demo-simple-select-label"
            fullWidth
            autoComplete="workerusername"
            type="text"
            label="workerusername "
            placeholder="workerusername"
            value={values.workerusername}
            {...getFieldProps('workerusername')}
            error={Boolean(touched.workerusername && errors.workerusername)}
            helperText={touched.workerusername && errors.workerusername}
          >
            {userlist.map((value) => (
              <MenuItem value={value.username} key={value.username}>
                {value.user_fullname}
              </MenuItem>
            ))}
          </Select>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Assign
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
