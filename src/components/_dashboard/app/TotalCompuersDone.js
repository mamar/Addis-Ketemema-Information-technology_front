import { Icon } from '@iconify/react';
import windowsFilled from '@iconify/icons-ant-design/windows-filled';
import ComputerIcon from '@mui/icons-material/Computer';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import { API_URL } from '../../../pages/Constant1';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
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
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 1723315;

export default function TotalCompuersDone() {
  const [countTask, setcount] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/CountComputer`).then((Response) => {
      setcount(Response.data);
    });
  });
  return (
    <RootStyle>
      <IconWrapperStyle>
        <ComputerIcon width={24} height={24} />
      </IconWrapperStyle>
      {countTask.map((value) => (
        <Typography variant="h3" key="TotalComputers">
          {/* fShortenNumber( */ value.total}
        </Typography>
      ))}
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        ኮምፒዩተር
      </Typography>
    </RootStyle>
  );
}
