import { Icon } from '@iconify/react';
import bugFilled from '@iconify/icons-ant-design/bug-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
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

const TOTAL = 234;

export default function TotalPrinterDone() {
  const [countTask, setcount] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/Request/CountPrinter`).then((Response) => {
      setcount(Response.data);
    });
  }, []);
  return (
    <RootStyle>
      <IconWrapperStyle>
        <LocalPrintshopIcon width={24} height={24} />
      </IconWrapperStyle>
      {countTask.map((value) => (
        <Typography variant="h3" key="TotalPrinters">
          {/* fShortenNumber( */ value.total}
        </Typography>
      ))}
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        ፕሪንተር
      </Typography>
    </RootStyle>
  );
}
