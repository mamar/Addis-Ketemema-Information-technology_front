import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import { Icon } from '@iconify/react';
// material
import { Box, Button, Card, CardHeader, Divider, Link, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';
// utils
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { API_URL } from '../../../pages/Constant1';
//
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

function NewsItem({ news }) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {formatDistance(postedAt, new Date())}
      </Typography>
    </Stack>
  );
}

export default function NewsUpdate() {
  const [newupdate, setnewupdate] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/Request/GetNewRequest`).then((Response) => {
      setnewupdate(Response.data);
    });
  });
  return (
    <Card>
      <CardHeader title="News Update" />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {newupdate.map((news) => (
            <NewsItem key={news.title} news={news} />
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
