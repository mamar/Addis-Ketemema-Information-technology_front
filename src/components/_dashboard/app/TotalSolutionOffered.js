import appleFilled from '@iconify/icons-ant-design/apple-filled';
import { Icon } from '@iconify/react';
import { Card, Typography } from '@mui/material';
// material
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
// utils
import { useEffect, useState } from 'react';
import { API_URL } from '../../../pages/Constant1';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
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
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------
export default function TotalSolutionOffered() {
  const [countTask, setcount] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/Request/CountSolutionOffered`).then((Response) => {
      setcount(Response.data);
    });
  }, []);
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={appleFilled} width={24} height={24} />
      </IconWrapperStyle>
      {countTask.map((value) => (
        <Typography variant="h3" key="TotalSolutionOfferd">
          {/* fShortenNumber( */ value.total}
        </Typography>
      ))}
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        መፍትሄ የተሰጣቸዉ
      </Typography>
    </RootStyle>
  );
}
