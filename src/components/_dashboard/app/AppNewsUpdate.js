import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { mockImgCover } from '../../../utils/mockImages';
//
import Scrollbar from '../../Scrollbar';
import { API_URL } from '../../../pages/Constant1';

// ----------------------------------------------------------------------

export default function AppNewsUpdate() {
  const [requestnotification, setNewRequest] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/GetNewRequest`).then((Response) => {
      setNewRequest(Response.data);
    });
  });
  // ----------------------------------------------------------------------

  return (
    <Card>
      <CardHeader title="News Requests" />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {requestnotification.map((row) => (
            <Stack direction="row" alignItems="center" spacing={2}>
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
              </Box>
              <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                {row.Date}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Scrollbar>
      <Divider />
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="#"
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
