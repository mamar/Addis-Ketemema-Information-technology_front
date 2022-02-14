// material
import { styled } from '@mui/material/styles';
import { Box, Card, Container, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// layouts
import DashboardNavbar from '../layouts/dashboard/DashboardNavbar';
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import EmployeAuth from '../layouts/EmployeAuth';
import { MHidden } from '../components/@material-extend';
import { AddSatisfaction } from '../components/authentication/Request';
import Satisfaction from './Satisfaction'; // ----------------------------------------------------------------------

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
  return (
    <RootStyle title="Send Request | Minimal-UI">
      <EmployeAuth>
        <DashboardNavbar />
      </EmployeAuth>
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Add Satisfaction
          </Typography>
          <img alt="register" src="/static/illustrations/illustration_register.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Send You Satisfaction on here
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Please fill the Satisfaction Field
            </Typography>
          </Box>
          <Button
            variant="contained"
            component={RouterLink}
            to="/Satisfaction"
            startIcon={<Icon icon={plusFill} />}
          >
            Back
          </Button>

          <AddSatisfaction />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
