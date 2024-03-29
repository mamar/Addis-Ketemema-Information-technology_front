import { Box, Card, Container, Typography } from '@mui/material';
// material
import { styled } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import { MHidden } from '../../components/@material-extend';
import { Officeform } from '../../components/authentication/office';
// components
import Page from '../../components/Page';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
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

export default function AddOffice() {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  if (!users) {
    return <Navigate to="/login" />;
  }
  if (users) {
    if (users.user[0].ROLES === 'Employee') {
      return <Navigate to="/satisfaction" />;
    }
    if (users.user[0].ROLES === 'IT') {
      return <Navigate to="/dashboard/AssignedRequest" />;
    }
    return (
      <RootStyle title="Register">
        <MHidden width="mdDown">
          <SectionStyle style={{ backgroundColor: '#4DBFDE' }}>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              እንኳን ወደ ኢንፎርሜሽን ኮምኒኬሽን ቴክኖሎጂ በደህና መጡ
            </Typography>
            <img alt="register" src="/static/illustrations/illustration_register.png" />
          </SectionStyle>
        </MHidden>

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h4" gutterBottom style={{ backgroundColor: '#CD92EA' }}>
                ፅ/ቤት መሙያ ቅፅ
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>እባክዎ ፅ/ቤቶችን በትክክል ያስገቡ</Typography>
            </Box>

            <Officeform />
          </ContentStyle>
        </Container>
      </RootStyle>
    );
  }
}
