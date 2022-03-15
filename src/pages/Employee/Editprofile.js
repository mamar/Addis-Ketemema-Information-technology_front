import { Link as RouterLink, Navigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
// components
import Page from '../../components/Page';
import { RegisterForm } from '../../components/authentication/register';
import AuthSocial from '../../components/authentication/AuthSocial';
import Editprofileform from '../../components/authentication/register/Editprofileform';
import DashboardNavbarForEmployee from '../../layouts/dashboard/DashboardNavbarForEmployee';
import DashboardSidebarEmployee from '../../layouts/dashboard/DashboardSidebarEmployee';
import EmployeAuth from '../../layouts/EmployeAuth';
// ----------------------------------------------------------------------

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper'
};
const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxwidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Editprofile() {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  if (!users) {
    return <Navigate to="/login" />;
  }
  if (users) {
    if (users.user[0].ROLES === 'IT' || users.user[0].ROLES === 'Admin') {
      return <Navigate to="/dashboard/app" />;
    }
    return (
      <RootStyle title="መረጃዎን ይቀይሩ">
        <EmployeAuth>
          <DashboardNavbarForEmployee />
        </EmployeAuth>

        <DashboardSidebarEmployee />

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h4" gutterBottom>
                መረጃዎ የተሳሳተ ከሆነ እዚህ ጋ ይቀይሩ.
              </Typography>
            </Box>

            <Editprofileform />

            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
              By Editing, I agree to Minimal&nbsp;
              <Link underline="always" sx={{ color: 'text.primary' }}>
                Terms of Service
              </Link>
              &nbsp;and&nbsp;
              <Link underline="always" sx={{ color: 'text.primary' }}>
                Privacy Policy
              </Link>
              .
            </Typography>
          </ContentStyle>
        </Container>
      </RootStyle>
    );
  }
}
