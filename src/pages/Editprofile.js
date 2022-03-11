import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { RegisterForm } from '../components/authentication/register';
import AuthSocial from '../components/authentication/AuthSocial';
import Editprofileform from '../components/authentication/register/Editprofileform';
import DashboardNavbarForEmployee from '../layouts/dashboard/DashboardNavbarForEmployee';
import EmpListDivider from './Employee/EmpListDivider';
import EmployeAuth from '../layouts/EmployeAuth';
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
  return (
    <RootStyle title="መረጃዎን ይቀይሩ">
      <EmployeAuth>
        <DashboardNavbarForEmployee />
      </EmployeAuth>
      <MHidden width="mdDown">
        <SectionStyle style={{ backgroundColor: '#C7E4F9' }}>
          <Typography
            variant="h3"
            sx={{ px: 5, mt: 10, mb: 5 }}
            style={{ backgroundColor: '#4DBFDE' }}
          >
            እንኳን ወደ ኢንፎርሜሽን ኮምኒኬሽን ቴክኖሎጂ በደህና መጡ
          </Typography>
          <EmpListDivider />
        </SectionStyle>
      </MHidden>

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

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?&nbsp;
              <Link to="" component={RouterLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
