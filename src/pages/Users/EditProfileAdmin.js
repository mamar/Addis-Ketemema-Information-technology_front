import { Box, Card, Container, Typography } from '@mui/material';
// material
import { styled } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import { MHidden } from '../../components/@material-extend';
import Editprofileform from '../../components/authentication/register/Editprofileform';
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

export default function EditProfileAdmin() {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  if (!users) {
    return <Navigate to="/login" />;
  }
  if (users) {
    if (users.user[0].ROLES === 'Employee') {
      return <Navigate to="/satisfaction" />;
    }
    return (
      <RootStyle title="Register">
        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5 }}>
              <Typography variant="h4" gutterBottom style={{ backgroundColor: '#CD92EA' }}>
                መረጃዎ የተሳሳተ ከሆነ እዚህ ጋ ይቀይሩ.
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>እባክዎ ፅ/ቤቶችን በትክክል ያስገቡ</Typography>
            </Box>

            <Editprofileform />
          </ContentStyle>
        </Container>
      </RootStyle>
    );
  }
}
