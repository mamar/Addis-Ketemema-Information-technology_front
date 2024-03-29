import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { Icon } from '@iconify/react';
import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from '@mui/material';
// material
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// components
import { MHidden } from '../../components/@material-extend';
import { API_URL } from '../../pages/Constant1';
import AccountPopoverEmployee from './AccountPopoverEmployee';
import NotificationsPopoverEmployee from './NotificationsPopoverEmployee';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

DashboardNavbarForEmployee.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default function DashboardNavbarForEmployee({ onOpenSidebar }) {
  const [AnnounceList, setAnnounceList] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/Announce/DisplayAnnounceForEmployee`).then((Response) => {
      setAnnounceList(Response.data);
    });
  }, []);
  return (
    <RootStyle style={{ backgroundColor: '#C7E4F9' }}>
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {AnnounceList.map((row) => (
            <Typography
              variant="h4"
              gutterBottom
              key={row.anouncid}
              style={{ backgroundColor: 'red' }}
            >
              ማሳሰቢያ:{row.anounceName}
            </Typography>
          ))}
          <NotificationsPopoverEmployee />
          <AccountPopoverEmployee />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
