import { Link as RouterLink, Navigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import ItStandardForm from '../../components/authentication/standard/ItStandardForm';

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

export default function SendStandard() {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  if (!users) {
    return <Navigate to="/login" />;
  }
  if (users) {
    if (users.user[0].ROLES === 'Employee') {
      return <Navigate to="/satisfaction" />;
    }
    return (
      <RootStyle title="የባለሙያዉ ስታንዳረድ መሙያ">
        <AuthLayout>Information Technology</AuthLayout>
        <MHidden width="mdDown">
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              እንኳን ወደ ኢንፎርሜሽን ኮምኒኬሽን ቴክኖሎጂ በደህና መጡ
            </Typography>
            <img alt="register" src="/static/illustrations/illustration_register.png" />
          </SectionStyle>
        </MHidden>

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h4" gutterBottom>
                የባለሙያዉ ስታንዳረድ መሙያ ቅፅ
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>እባክዎ ስታንዳርዱን በትክክል ይሙሉ</Typography>
            </Box>

            <ItStandardForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    );
  }
}
