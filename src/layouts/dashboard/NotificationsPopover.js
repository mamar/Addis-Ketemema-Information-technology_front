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
  ListItemButton
} from '@mui/material';
import axios from 'axios';
// utils
import { mockImgAvatar } from '../../utils/mockImages';
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import { API_URL } from '../../pages/Constant1';

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: faker.datatype.uuid(),
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatar: null,
    type: 'order_placed',
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true
  },
  {
    id: faker.datatype.uuid(),
    title: faker.name.findName(),
    description: 'answered to your comment on the Minimal',
    avatar: mockImgAvatar(2),
    type: 'friend_interactive',
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new message',
    description: '5 unread messages',
    avatar: null,
    type: 'chat_message',
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatar: null,
    type: 'mail',
    createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    isUnRead: false
  },
  {
    id: faker.datatype.uuid(),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatar: null,
    type: 'order_shipped',
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false
  }
];
export default function NotificationsPopover() {
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
      </ListItemButton>
    );
  }
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [requestnotification, setNewRequest] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/GetNewRequest`).then((Response) => {
      if (Response.data === 'error') {
        alert('Server Error');
      } else {
        setNewRequest(Response.data);
      }
    });
  });
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
              <NotificationItem key={notification.request_id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {requestnotification.slice(2, 5).map((notification) => (
              <NotificationItem key={notification.request_id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple component={RouterLink} to="#">
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
