import { LoadingButton } from '@mui/lab';
// material
import { Stack, TextareaAutosize, FormControl } from '@mui/material';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import MultiSelect from 'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css';
import * as Yup from 'yup';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { API_URL } from '../../../pages/Constant1';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
/* const options = [
  {
    label: 'ኮምፒዩተር',
    value: 'Computer',
    style: { backgroundColor: '#8AEAF7 ' }
  },
  { label: 'ፕሪንተር', value: 'Printer', style: { backgroundColor: '#8AEAF7 ' } },
  { label: 'ኔትወርክ', value: 'Network', style: { backgroundColor: '#8AEAF7 ' } },
  { label: 'ሶፍትዌር', value: 'Software', style: { backgroundColor: '#8AEAF7 ' } },
  { label: 'ፎቶኮፒ', value: 'Photocpy', style: { backgroundColor: '#8AEAF7 ' } },
  { label: 'ሌላ', value: 'Others', style: { backgroundColor: '#8AEAF7 ' } }
]; */
const options = ['Printer', 'Computer', 'Network', 'Software', 'Photocpy', 'Others'];

export default function RegisterForm() {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  const [request, setrequest] = useState('');
  const [personName, setPersonName] = useState([]);
  const m = [];

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      value
    );
  };
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
          request_type: personName.toString(),
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
      <Form autoComplete="off" onSubmit={handleSubmit} style={{ backgroundColor: '#f2f2f2' }}>
        <Stack spacing={3}>
          <InputLabel id="demo-multiple-checkbox-label">የአገልግለቱ አይነት *</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            required
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="የአገልግለቱ አይነት *" />}
            renderValue={(selected) => selected.join(',')}
            MenuProps={MenuProps}
          >
            {options.map((name) => (
              <MenuItem key={name} value={name} style={{ backgroundColor: '#8AEAF7' }}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} style={{ backgroundColor: '#C8D5F4 ' }} />
              </MenuItem>
            ))}
          </Select>
          <TextareaAutosize
            style={{ height: 200, maxWidth: 480 }}
            autoComplete="problem_desc"
            type="text"
            required
            label="ስላጋጠመዉ ችግር አጭር መግለጫ *"
            placeholder="ስላጋጠመዉ ችግር አጭር መግለጫ  *"
            value={values.problem_desc}
            {...getFieldProps('problem_desc')}
          />
          <div tyle={{ backgroundColor: 'red' }} fullWidth>
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
