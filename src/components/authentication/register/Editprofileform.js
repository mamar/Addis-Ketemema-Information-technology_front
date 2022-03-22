import { LoadingButton } from '@mui/lab';
// material
import { Stack, TextField, Card, Link, Container, Typography } from '@mui/material';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Page from '../../Page';
import { API_URL } from '../../../pages/Constant1';
import { MHidden } from '../../@material-extend';
import AuthLayout from '../../../layouts/AuthLayout';

// ----------------------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));
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
    Position: Yup.string().nullable().notRequired(),
    division: Yup.string().required(' required'),
    floor_no: Yup.number().integer().required('required').typeError('must be a valid number'),
    office_no: Yup.number().integer().nullable().notRequired().typeError('must be a valid number'),
    Phone: Yup.number().integer().required('required').typeError('must be a valid number')
  });
  const formik = useFormik({
    initialValues: {
      user_fullname: userList.user_fullname,
      Position: userList.Position,
      Phone: userList.Phone,
      division: userList.division,
      office_no: userList.office_no,
      floor_no: userList.floor_no
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .patch(`${API_URL}/user/Updateusers/${users ? users.user[0].username : null}`, {
          user_fullname: data.user_fullname,
          Position: data.Position,
          division: data.division,
          office_no: data.office_no,
          floor_no: data.floor_no,
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
    <RootStyle title="Register">
      <AuthLayout>.</AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Welcome to information Cummunication Technology .Please Fill All the Mandatory Fields
          </Typography>
          <img alt="register" src="/static/illustrations/illustration_register.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              {userList.map((row) => (
                <Stack spacing={3} key={row.userid}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      autoComplete="user_fullname"
                      label="ሙሉ ስም *"
                      placeholder="ሙሉ ስም *"
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
                    label="ስልክ ቁጥር *"
                    placeholder="ስልክ ቁጥር *"
                    defaultValue={row.Phone}
                    value={values.Phone}
                    {...getFieldProps('Phone')}
                    error={Boolean(touched.Phone && errors.Phone)}
                    helperText={touched.Phone && errors.Phone}
                  />
                  <TextField
                    fullWidth
                    autoComplete="division"
                    type="text"
                    label="የስራ ሂደት *"
                    placeholder="የስራ ሂደት *"
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
                    label="አድራሻ * "
                    placeholder="አድራሻ *"
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
                    label="የስራ መደብ * "
                    placeholder="የስራ መደብ *"
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
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
