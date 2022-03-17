import faker from 'faker';
import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useRef, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { set, sub, formatDistanceToNow } from 'date-fns';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
import { LoadingButton } from '@mui/lab';
// material
import { alpha } from '@mui/material/styles';
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  Menu,
  Link,
  MenuItem,
  ListItemIcon
} from '@mui/material';
import axios from 'axios';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// utils
import { mockImgAvatar } from '../../utils/mockImages';
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import { API_URL } from '../../pages/Constant1';

// ----------------------------------------------------------------------

export default function NotificationsPopoverEmployee() {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  const [requestList, SetRequestList] = useState([]);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    axios.get(`${API_URL}/Request/GetRequestedTasks/${users.user[0].username}`).then((Response) => {
      SetRequestList(Response.data);
    });
  }, []);
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
        disableGutters
        component={RouterLink}
        to={`AddSatisfaction/${notification.request_id}`}
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
              የአገልግሎቱ አይነት፡ {notification.request_type} <br />
              የተጠየቀበት ቀን፡ {notification.Date} <br />
              የተጀመረበት ቀን፡ {notification.assignedDate} <br />
              ያለቀበት ከቀነ፡ {notification.finishedDate} <br />
              የባለሙያዉ ስም፡ {notification.user_fullname} <br />
            </Typography>
          }
        />
        <Divider style={{ backgroundColor: 'red' }} />
      </ListItemButton>
    );
  }
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const totalUnRead = requestList.length;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = () => {
    SetRequestList(
      requestList.map((notification) => ({
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
              {totalUnRead} እባክዎን እርካታ ይሙሉ
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
                ያለቁ ስራዎች
              </ListSubheader>
            }
          >
            {requestList.slice(0, 2).map((notification) => (
              <NotificationItem key={notification.request_id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                ማሳሰቢያዎች
              </ListSubheader>
            }
          >
            {requestList.slice(2, 5).map((notification) => (
              <NotificationItem key={notification.request_id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            disableRipple
            component={RouterLink}
            to="/Satisfaction"
            style={{ backgroundColor: '#75077E' }}
          >
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
