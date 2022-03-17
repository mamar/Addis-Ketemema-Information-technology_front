import * as Yup from 'yup';
import { useState, forwardRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate, Link as RouterLink, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
// material
import {
  Box,
  Card,
  Link,
  Container,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  TextareaAutosize
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { width } from '@mui/system';
// material
import { styled } from '@mui/material/styles';
import { API_URL } from '../../../pages/Constant1';
// layouts
// components
// ----------------------------------------------------------------------

export default function EditStandardForm() {
  const navigate = useNavigate();
  const [standard, setStandard] = useState([]);
  const standardid = JSON.parse(JSON.stringify(useParams()));
  useEffect(() => {
    axios
      .get(`${API_URL}/Standard/GetStandardForUpdate/${standardid.Standardid}`)
      .then((Response) => {
        setStandard(Response.data);
      });
  }, []);
  const RegisterSchema = Yup.object().shape({
    service: Yup.string().required('required'),
    measurement: Yup.string().required(' required'),
    time: Yup.string().required('required'),
    price: Yup.string().required('required')
  });
  const formik = useFormik({
    initialValues: {
      service: standard.service,
      measurement: standard.measurement,
      time: standard.time,
      price: standard.price
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .put(`${API_URL}/Standard/UpdateStandard/${standardid.Standardid}`, {
          service: data.service,
          measurement: data.measurement,
          time: data.time,
          price: data.price
        })
        .then((Response) => {
          if (Response.data.Message === 'Error') {
            alert('server error');
            window.location.reload();
          }
          if (Response.data.Message === 'Success') {
            alert('Standard Add Successfully');
            window.location.reload();
          }
        });
    }
  });

  const Page = forwardRef(({ children, title = '', ...other }, ref) => (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  ));

  Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string
  };

  const { errors, values, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }));
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        {standard.map((row) => (
          <Stack spacing={3} key={row.standardid}>
            <TextField
              label="የአገልግሎቱ አይነት *"
              placeholder="የአገልግሎቱ አይነት *"
              defaultValue={row.service}
              value={values.service || row.service}
              {...getFieldProps('service')}
              error={Boolean(touched.service && errors.service)}
              helperText={touched.service && errors.service}
            />
            <TextField
              autoComplete="measurement"
              type="text"
              label="መለኪያ *"
              placeholder="መለኪያ *"
              defaultValue={row.measurement}
              value={values.measurement}
              {...getFieldProps('measurement')}
              error={Boolean(touched.measurement && errors.measurement)}
              helperText={touched.measurement && errors.measurement}
            />
            <TextField
              autoComplete="time"
              type="text"
              label="ጊዜ* "
              placeholder="ጊዜ*"
              defaultValue={row.time}
              value={values.time}
              {...getFieldProps('time')}
              error={Boolean(touched.time && errors.time)}
              helperText={touched.time && errors.time}
            />
            <TextField
              autoComplete="price"
              type="text"
              label="ዋጋ* "
              placeholder="ዋጋ*"
              defaultValue={row.price}
              value={values.price}
              {...getFieldProps('price')}
              error={Boolean(touched.price && errors.price)}
              helperText={touched.price && errors.price}
            />
            <LoadingButton
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
