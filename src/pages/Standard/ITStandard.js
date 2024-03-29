import { LoadingButton } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
// material
import { Box, Card, Container, Stack, TextField, Typography } from '@mui/material';
// material
import { styled } from '@mui/material/styles';
import dateformat from 'dateformat';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// components
import { MHidden } from '../../components/@material-extend';
import Page from '../../components/Page';
import AuthLayout from '../../layouts/AuthLayout';

// layouts
// components
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

export default function ITStandard() {
  const [value, setValue] = useState([null, null]);
  return (
    <RootStyle title="ስታንዳረድ ማዉጫ">
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
            <Typography variant="h4" gutterBottom style={{ backgroundColor: '#CD92EA' }}>
              ስታንዳረድ ማዉጫ
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>እባክዎ ቀኖችን በትክክል ያስገቡ</Typography>
          </Box>

          <Stack spacing={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <MobileDateRangePicker
                  startText="From"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <>
                      <TextField {...startProps} />
                      <Box sx={{ mx: 2 }}> to </Box>
                      <TextField {...endProps} />
                    </>
                  )}
                />
              </Stack>
            </LocalizationProvider>
            <LoadingButton
              size="large"
              variant="contained"
              type="submit"
              component={RouterLink}
              to={`/dashboard/Standard/${dateformat(value[0], 'dd-mm-yy')}/${dateformat(
                value[1],
                'dd-mm-yy'
              )}`}
            >
              ስታንዳረድ ያዉጡ
            </LoadingButton>
          </Stack>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
