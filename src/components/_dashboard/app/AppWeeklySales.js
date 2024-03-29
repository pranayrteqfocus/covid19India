import { RiVirusLine } from 'react-icons/ri';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------
AppWeeklySales.propTypes = {
  activeCases: PropTypes.any.isRequired
};
export default function AppWeeklySales({ activeCases }) {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <RiVirusLine size="50" />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(activeCases)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Active Cases
      </Typography>
    </RootStyle>
  );
}
