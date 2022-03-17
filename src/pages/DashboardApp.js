// material
import { Box, Container, Grid, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
// components
import Page from '../components/Page';
import {
  AppNewsUpdate,
  TotalCompuersDone,
  TotalNetwork,
  TotalOthers,
  TotalPhotocopy,
  TotalPrinterDone,
  TotalRequest,
  TotalSolutionOffered
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  if (!users) {
    return <Navigate to="/login" />;
  }
  if (users) {
    if (users.user[0].ROLES === 'Employee') {
      return <Navigate to="/satisfaction" />;
    }
    return (
      <Page title="Dashboard">
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">እንኳን ወደ ኢንፎርሜሽን ኮምኒኬሽን ቴክኖሎጂ በደህና መጡ</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <TotalRequest />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TotalSolutionOffered />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TotalCompuersDone />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TotalPrinterDone />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TotalNetwork />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TotalPhotocopy />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TotalOthers />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppNewsUpdate />
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  }
}
