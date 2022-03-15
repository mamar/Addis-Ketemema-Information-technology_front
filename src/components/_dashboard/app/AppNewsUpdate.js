import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import {
  Box,
  Stack,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
// utils
import { mockImgCover } from '../../../utils/mockImages';
//
import Scrollbar from '../../Scrollbar';
import { API_URL } from '../../../pages/Constant1';

// ----------------------------------------------------------------------

export default function AppNewsUpdate() {
  const [requestnotification, setNewRequest] = useState([]);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const users = JSON.parse(localStorage.getItem('userinfo'));
  const AssignTask = (taskid, username) => {
    axios.put(`${API_URL}/AssignTask/${taskid}/${username}`).then((response) => {
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
    axios.get(`${API_URL}/GetNewRequest`).then((Response) => {
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
              <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                <IconButton ref={ref} onClick={() => setIsOpen(true)}>
                  <Icon icon={moreVerticalFill} width={20} height={20} />
                </IconButton>
                <Menu
                  open={isOpen}
                  anchorEl={ref.current}
                  onClose={() => setIsOpen(false)}
                  PaperProps={{
                    sx: { width: 200, maxWidth: '100%' }
                  }}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem
                    sx={{ color: 'text.secondary' }}
                    onClick={() => AssignTask(row.request_id, users.user[0].username)}
                  >
                    <ListItemIcon>
                      <Icon icon={trash2Outline} width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Assign Task"
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </MenuItem>
                </Menu>
              </Typography>
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
