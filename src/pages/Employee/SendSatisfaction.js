// material
import { styled } from '@mui/material/styles';
import { Box, Card, Container, Typography, Button } from '@mui/material';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// layouts
import DashboardNavbar from '../../layouts/dashboard/DashboardNavbar';
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import EmployeAuth from '../../layouts/EmployeAuth';
import { MHidden } from '../../components/@material-extend';
import { AddSatisfaction } from '../../components/authentication/Request';
import EmpListDivider from './EmpListDivider';
import Satisfaction from './Satisfaction';
import DashboardNavbarForEmployee from '../../layouts/dashboard/DashboardNavbarForEmployee';
import DashboardSidebarEmployee from '../../layouts/dashboard/DashboardSidebarEmployee';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
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

export default function SendSatisfaction() {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  if (!users) {
    return <Navigate to="/login" />;
  }
  if (users) {
    if (users.user[0].ROLES === 'IT' || users.user[0].ROLES === 'Admin') {
      return <Navigate to="/dashboard/app" />;
    }
    return (
      <RootStyle title="የእርካታ መሙያ ቅፅ">
        <EmployeAuth>
          <DashboardNavbarForEmployee />
        </EmployeAuth>
        <DashboardSidebarEmployee />

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h4" gutterBottom>
                የእርካታ መሙያ ቅፅ
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>እባክዎ እርካታዉን በትክክል ይሙሉ</Typography>
            </Box>

            <AddSatisfaction />
          </ContentStyle>
        </Container>
      </RootStyle>
    );
  }
}
