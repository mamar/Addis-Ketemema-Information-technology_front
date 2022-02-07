// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppTasks,
  TotalSolutionOffered,
  TotalPrinterDone,
  TotalCompuersDone,
  AppNewsUpdate,
  TotalRequest,
  AppOrderTimeline,
  TotalNetwork,
  TotalPhotocopy,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
  TotalOthers
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
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

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
