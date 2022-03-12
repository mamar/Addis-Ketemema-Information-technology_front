// material
import { styled } from '@mui/material/styles';
import { Box, Card, Container, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// layouts
import DashboardNavbarForEmployee from '../../layouts/dashboard/DashboardNavbarForEmployee';
import DashboardSidebarEmployee from '../../layouts/dashboard/DashboardSidebarEmployee';
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import EmployeAuth from '../../layouts/EmployeAuth';
import { MHidden } from '../../components/@material-extend';
import { Requestform } from '../../components/authentication/Request';
import Satisfaction from './Satisfaction';
import EmpListDivider from './EmpListDivider';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 360,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function SendRequest() {
  return (
    <RootStyle title=" የአገልግሉት መጠየቂያ ቅፅ">
      <EmployeAuth>
        <DashboardNavbarForEmployee />
      </EmployeAuth>
      <DashboardSidebarEmployee />
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              የአገልግሉት መጠየቂያ ቅፅ
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>እባክዎ ጥያቄዎን በትክክል ይሙሉ!</Typography>
          </Box>

          <Requestform />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
