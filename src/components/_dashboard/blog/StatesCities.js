import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled } from '@material-ui/core/styles';
import { Box, TextField, Autocomplete, InputAdornment } from '@material-ui/core';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '& .MuiAutocomplete-root': {
    width: 200,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': {
      width: 240,

      '& .MuiAutocomplete-inputRoot': {
        boxShadow: theme.customShadows.z12
      }
    }
  },
  '& .MuiAutocomplete-inputRoot': {
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  },
  '& .MuiAutocomplete-option': {
    '&:not(:last-child)': {
      borderBottom: `solid 1px ${theme.palette.divider}`,
      maxHeight: 50
    }
  }
}));

// ----------------------------------------------------------------------

StateCities.propTypes = {
  posts: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  stateId: PropTypes.any
};

export default function StateCities({ posts, placeholder, stateId }) {
  const handleChange = (e, d) => {
    if (d) {
      stateId(d.state_id);
    } else {
      stateId(null);
    }
  };
  return (
    <RootStyle>
      <Autocomplete
        size="small"
        disablePortal
        popupIcon={null}
        options={posts}
        onChange={handleChange}
        getOptionLabel={(post) => post.state_name}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <Box
                      component={Icon}
                      icon={searchFill}
                      sx={{
                        ml: 1,
                        width: 20,
                        height: 20,
                        color: 'text.disabled'
                      }}
                    />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              )
            }}
          />
        )}
      />
    </RootStyle>
  );
}
