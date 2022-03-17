// material
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import { Requestform } from '../../components/authentication/Request';
// components
import Page from '../../components/Page';
// layouts
import DashboardNavbarForEmployee from '../../layouts/dashboard/DashboardNavbarForEmployee';
import DashboardSidebarEmployee from '../../layouts/dashboard/DashboardSidebarEmployee';
import EmployeAuth from '../../layouts/EmployeAuth';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
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
  const users = JSON.parse(localStorage.getItem('userinfo'));
  if (!users) {
    return <Navigate to="/login" />;
  }
  if (users) {
    if (users.user[0].ROLES === 'IT' || users.user[0].ROLES === 'Admin') {
      return <Navigate to="/dashboard/app" />;
    }
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
}
