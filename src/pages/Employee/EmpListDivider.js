import WorkIcon from '@mui/icons-material/Work';
import Avatar from '@mui/material/Avatar';
import { pink } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const style = {
  width: '100%',
  bgcolor: 'background.paper'
};

export default function EmpListDivider() {
  return (
    <List
      sx={style}
      component="nav"
      aria-label="mailbox folders"
      style={{ backgroundColor: '#4DBFDE' }}
    >
      <ListItem button component={RouterLink} to="/satisfaction">
        <ListItemAvatar>
          <Avatar>
            <WorkIcon color="primary" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary=" ያለቁና እርካታ ያልተሞላላቸዉ" />
      </ListItem>
      <Divider style={{ backgroundColor: 'red' }} />
      <ListItem button divider component={RouterLink} to="/finishshedTasksSatisfaction">
        <ListItemAvatar>
          <Avatar>
            <WorkIcon color="success" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary=" ያለቁና እርካታ የተሞላላቸዉ" />
      </ListItem>
      <Divider style={{ backgroundColor: 'red' }} />
      <ListItem button component={RouterLink} to="/ProgressTasksFor">
        <ListItemAvatar>
          <Avatar>
            <WorkIcon color="secondary" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="የተጀመሩ አገልግሎቶች  " />
      </ListItem>
      <Divider style={{ backgroundColor: 'red' }} />
      <ListItem button component={RouterLink} to="/NewRequestsFor">
        <ListItemAvatar>
          <Avatar>
            <WorkIcon color="action" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary=" አዲስ የተጠየቁ አገልግሎቶች " />
      </ListItem>
      <Divider style={{ backgroundColor: 'red' }} />
      <ListItem button component={RouterLink} to="/SendRequest">
        <ListItemAvatar>
          <Avatar>
            <WorkIcon sx={{ color: pink[500] }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="  የአገልግሉት መጠየቂያ ቅፅ " />
      </ListItem>
    </List>
  );
}
