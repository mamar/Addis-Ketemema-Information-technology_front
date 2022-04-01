import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
// material
import { Stack, TextField, TextareaAutosize } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import stripJsonTrailingCommas from 'strip-json-trailing-commas';

import Select from '@mui/material/Select';
import MultiSelect from 'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { API_URL } from '../../../pages/Constant1';
// ----------------------------------------------------------------------
const options = [
  { label: 'ኮምፒዩተር', value: 'Computer' },
  { label: 'ፕሪንተር', value: 'Printer' },
  { label: 'ኔትወርክ', value: 'Network' },
  { label: 'ሶፍትዌር', value: 'Software' },
  { label: 'ፎቶኮፒ', value: 'Photocpy' },
  { label: 'ሌላ', value: 'Others' }
];
export default function RegisterForm() {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  const [request, setrequest] = useState('');
  const isDisabled = true;
  const enableRequired = !isDisabled;
  const handleOnchange = (val) => {
    setrequest(val);
  };
  const RegisterSchema = Yup.object().shape({
    request_type: Yup.array().required('required'),
    problem_desc: Yup.string().required('required')
  });
  const formik = useFormik({
    initialValues: {
      request_type: [],
      problem_desc: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (data) => {
      axios
        .post(`${API_URL}/Request/AddRequest/${users ? users.user[0].username : null}`, {
          request_type: request,
          problem_desc: data.problem_desc
        })
        .then((Response) => {
          if (Response.data.Message === 'Success') {
            alert('Request Successfully Send');
            console.log(request);
            window.location.reload();
          }
          if (Response.data.Message === 'Error') {
            alert('Server error');
            console.log(request);
            window.location.reload();
          }
        });
      // navigate('/dashboard', { replace: true });
      // navigate('/dashboard', { replace: true });
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        style={{ backgroundColor: '#f2f2f2' }}
      >
        <Stack spacing={3}>
          <MultiSelect
            onChange={handleOnchange}
            type="checkbox"
            options={options}
            required={enableRequired}
            placeholder="የአገልግሎቱ አይነት*"
            style={{ backgroundColor: '#CBCBF1' }}
          />
          <p style={{ backgroundColor: 'red' }}>
            {Boolean(touched.request_type && errors.request_type)}
            {touched.request_type && errors.request_type}
          </p>

          <TextareaAutosize
            style={{ height: 200, maxWidth: 480 }}
            autoComplete="problem_desc"
            type="text"
            label="ስላጋጠመዉ ችግር አጭር መግለጫ *"
            placeholder="ስላጋጠመዉ ችግር አጭር መግለጫ  *"
            value={values.problem_desc}
            {...getFieldProps('problem_desc')}
          />
          <div tyle={{ backgroundColor: 'red' }}>
            {Boolean(touched.problem_desc && errors.problem_desc)}
            {touched.problem_desc && errors.problem_desc}
          </div>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            style={{ backgroundColor: '#75077E' }}
          >
            ይላኩ
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
