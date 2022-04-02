import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography
} from '@mui/material';
// material
import { alpha } from '@mui/material/styles';
import axios from 'axios';
import { noCase } from 'change-case';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ComputerIcon from '@mui/icons-material/Computer';
import MenuPopover from '../../components/MenuPopover';
// components
import Scrollbar from '../../components/Scrollbar';
import { API_URL } from '../../pages/Constant1';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  const AssignTask = (taskid, username) => {
    axios.put(`${API_URL}/Request/AssignTask/${taskid}/${username}`).then((response) => {
      if (response.data.Message === 'Error') {
        alert('Server Error');
      }
      if (response.data.Message === 'Success') {
        alert('You take the task Successfully');
        window.location.reload();
      }
    });
  };
  function renderContent(notification) {
    const title = (
      <Typography variant="subtitle2">
        {notification.title}
        <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
          &nbsp; {noCase(notification.request_type)}
        </Typography>
      </Typography>
    );

    if (notification.type === 'Computer') {
      return {
        avatar: <img alt={notification.title} src="/static/icons/ic_notification_package.svg" />,
        title
      };
    }
    if (notification.type === 'Printer') {
      return {
        avatar: <img alt={notification.title} src="/static/icons/ic_notification_shipping.svg" />,
        title
      };
    }
    if (notification.type === 'Network') {
      return {
        avatar: <img alt={notification.title} src="/static/icons/ic_notification_mail.svg" />,
        title
      };
    }
    if (notification.type === 'Photocopy') {
      return {
        avatar: <img alt={notification.title} src="/static/icons/ic_notification_chat.svg" />,
        title
      };
    }
    if (notification.type === 'Software') {
      return {
        avatar: <img alt={notification.title} src="/static/icons/ic_notification_chat.svg" />,
        title
      };
    }
    if (notification.type === 'Others') {
      return {
        avatar: <img alt={notification.title} src="/static/icons/ic_notification_chat.svg" />,
        title
      };
    }
    return {
      avatar: <img alt={notification.title} src={notification.avatar} />,
      title
    };
  }

  NotificationItem.propTypes = {
    notification: PropTypes.object.isRequired
  };

  function NotificationItem({ notification }) {
    const { avatar, title } = renderContent(notification);

    return (
      <ListItemButton
        to="#"
        disableGutters
        component={RouterLink}
        sx={{
          py: 1.5,
          px: 2.5,
          mt: '1px',
          ...(notification.isUnRead && {
            bgcolor: 'action.selected'
          })
        }}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'text.disabled'
              }}
            >
              <Box component={Icon} icon={clockFill} sx={{ mr: 0.5, width: 16, height: 16 }} />
              {notification.problem_desc}
              {notification.Date}
            </Typography>
          }
        />

        <LoadingButton
          size="small"
          type="submit"
          variant="contained"
          onClick={() => AssignTask(notification.request_id, users.user[0].username)}
          style={{ backgroundColor: '#75077E' }}
        >
          Assign
        </LoadingButton>
        {users.user[0].ROLES === 'Admin' ? (
          <LoadingButton
            size="small"
            type="submit"
            variant="contained"
            component={RouterLink}
            to={`/dashboard/AssignTask/${notification.request_id}`}
            style={{ backgroundColor: 'red' }}
          >
            Assign user
          </LoadingButton>
        ) : null}
      </ListItemButton>
    );
  }
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [requestnotification, setNewRequest] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/Request/GetNewRequest`).then((Response) => {
      if (Response.data === 'error') {
        alert('Server Error');
      } else {
        setNewRequest(Response.data);
      }
    });
  }, []);
  const totalUnRead = requestnotification.length;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = () => {
    setNewRequest(
      requestnotification.map((notification) => ({
        ...notification,
        isUnRead: false
      }))
    );
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Icon icon={bellFill} width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {totalUnRead} New Requests
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {requestnotification.slice(0, 2).map((notification) => (
              <>
                <NotificationItem key={notification.request_id} notification={notification} />
                <Divider style={{ backgroundColor: 'red' }} />
              </>
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: 'overline' }}
                style={{ backgroundColor: '#890839' }}
              >
                Before that
              </ListSubheader>
            }
          >
            {requestnotification.slice(2, 5).map((notification) => (
              <>
                <NotificationItem key={notification.request_id} notification={notification} />
                <Divider style={{ backgroundColor: 'red' }} />
              </>
            ))}
          </List>
        </Scrollbar>
        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            disableRipple
            component={RouterLink}
            to="/dashboard/NewRequest"
            style={{ backgroundColor: '#890839' }}
          >
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
