import { LoadingButton } from '@mui/lab';
// material
import { Box, Stack, TextareaAutosize } from '@mui/material';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
import { API_URL } from '../../../pages/Constant1';
// layouts
// components
// ----------------------------------------------------------------------

export default function AnnounceForm() {
  const RegisterSchema = Yup.object().shape({
    anounceName: Yup.string().min(8, 'Too Short!').max(50, 'Too Long!').required('required')
  });
  const formik = useFormik({
    initialValues: {
      anounceName: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .post(`${API_URL}/Announce/AddAnnounce`, {
          anounceName: data.anounceName
        })
        .then((Response) => {
          if (Response.data.Message === 'success') {
            alert(' Added Successfully');
            window.location.reload();
          }
          if (Response.data.Message === 'error') {
            alert('server error');
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

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextareaAutosize
            style={{ height: 200, maxWidth: 480 }}
            label="ማሳሰቢያ *"
            placeholder="ማሳሰቢያ *"
            required
            value={values.anounceName}
            {...getFieldProps('anounceName')}
            error={Boolean(touched.anounceName && errors.anounceName)}
            helpertex={touched.anounceName && errors.anounceName}
          />
          <LoadingButton
            size="medium"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            style={{ backgroundColor: '#75077E' }}
          >
            Add
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
