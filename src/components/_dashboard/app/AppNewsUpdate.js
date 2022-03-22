import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
// material
import { Box, Button, Card, CardHeader, Divider, Link, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { API_URL } from '../../../pages/Constant1';
//
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------

export default function AppNewsUpdate() {
  const [requestnotification, setNewRequest] = useState([]);
  const users = JSON.parse(localStorage.getItem('userinfo'));
  const AssignTask = (taskid, username) => {
    axios.put(`${API_URL}/Request/AssignTask/${taskid}/${username}`).then((response) => {
      if (response.data.Message === 'Error') {
        alert('Server Error');
      }
      if (response.data.Message === 'Success') {
        console.log(response);
        alert('You take the task Successfully');
      }
    });
  };
  useEffect(() => {
    axios.get(`${API_URL}/Request/GetNewRequest`).then((Response) => {
      setNewRequest(Response.data);
    });
  });
  // ----------------------------------------------------------------------

  return (
    <Card>
      <CardHeader title="አዲስ የተጠየቁ አገልግሎቶች" style={{ backgroundColor: '#DAF7A6 ' }} />

      <Scrollbar style={{ backgroundColor: '#DEF5F7 ' }}>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {requestnotification.map((row) => (
            <Stack direction="row" alignItems="center" spacing={2} key={row.request_id}>
              <Box sx={{ minWidth: 240 }}>
                <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                  <Typography variant="subtitle2" noWrap>
                    {row.request_type}
                  </Typography>
                </Link>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  {row.problem_desc}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  {row.office_name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  {row.user_fullname}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  {row.phone}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  {row.division}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  {row.floor_no}
                </Typography>
                <Divider style={{ backgroundColor: 'red' }} />
              </Box>
              <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                {row.Date}
              </Typography>

              <LoadingButton
                fullWidth
                size="small"
                type="submit"
                variant="contained"
                onClick={() => AssignTask(row.request_id, users.user[0].username)}
                style={{ backgroundColor: '#75077E' }}
              >
                Assign
              </LoadingButton>
              {users.user[0].ROLES === 'Admin' ? (
                <LoadingButton
                  fullWidth
                  size="small"
                  type="submit"
                  variant="contained"
                  component={RouterLink}
                  to={`/dashboard/AssignTask/${row.request_id}`}
                  style={{ backgroundColor: '#75077E' }}
                >
                  Assign user
                </LoadingButton>
              ) : null}
            </Stack>
          ))}
        </Stack>
      </Scrollbar>
      <Divider />
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="/dashboard/NewRequest"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}
