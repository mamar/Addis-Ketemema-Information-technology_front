import SensorsIcon from '@mui/icons-material/Sensors';
import { Card, Typography } from '@mui/material';
// material
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
// utils
import { API_URL } from '../../../pages/Constant1';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    theme.palette.error.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function TotalOthers() {
  const [countTask, setcount] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/Request/CountOthers`).then((Response) => {
      setcount(Response.data);
    });
  }, []);
  return (
    <RootStyle>
      <IconWrapperStyle>
        <SensorsIcon width={24} height={24} />
      </IconWrapperStyle>
      {countTask.map((value) => (
        <Typography variant="h3" key="TotalOthers">
          {value.total}
        </Typography>
      ))}
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        ሌሎች
      </Typography>
    </RootStyle>
  );
}
