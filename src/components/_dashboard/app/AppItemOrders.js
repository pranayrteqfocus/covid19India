import { GiDeathSkull } from 'react-icons/gi';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

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

const TOTAL = 1723315;

export default function AppItemOrders(props) {
  return (
    <RootStyle>
      <IconWrapperStyle>
        {/* <Icon icon={windowsFilled} width={24} height={24} /> */}
        <GiDeathSkull size="40" />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(props.totalDeath)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total Deaths
      </Typography>
    </RootStyle>
  );
}
