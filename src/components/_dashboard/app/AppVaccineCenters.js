/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, Typography, Box, Grid, Button } from '@material-ui/core';
import BasicTable from '../../customize-component/customTable';
import { vaccineCenters } from '../../../_mocks_/__vaccineCenters__';
import { stateCitiesName } from '../../../_mocks_/__StateCitiesName__';
import { StateCities } from '../blog';
import SelectCity from '../blog/citiesName';
import { puneCenters } from '../../../_mocks_/__punCenters__';
import GoogleMap from './AppMap';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));
export function AppVaccineCenters() {
  const classes = useStyles();
  const [states, setstates] = useState([]);
  const [city, setcity] = useState([]);
  const [isMap, setIsMap] = useState(false);
  const [vaccineCentersList, setvaccineCentersList] = useState([]);
  useEffect(() => {
    const filterStates = stateCitiesName.filter(
      (obj, index, self) => index === self.findIndex((el) => el.state_id === obj.state_id)
    );
    setstates(filterStates);
  }, []);
  const handleState = (data) => {
    if (data) {
      const cityName = [];
      stateCitiesName.forEach((element) => {
        if (element.state_id === data) {
          cityName.push(element);
        }
      });
      setcity(cityName);
    } else {
      setcity([]);
    }
  };
  const handleCity = (cityId) => {
    if (cityId === 365) {
      setvaccineCentersList(vaccineCenters);
    } else if (cityId === 363) {
      setvaccineCentersList(puneCenters);
    } else {
      setvaccineCentersList(null);
    }
  };
  const handleMap = () => {
    setIsMap(!isMap);
  };
  return (
    <Card style={{ overflow: 'inherit', maxHeight: 500 }}>
      <CardHeader title="Vaccine Centers" />
      <Grid container justifyContent="start" spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Box p={2} className={classes.formControl}>
            <StateCities posts={states} placeholder="Select State" stateId={handleState} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box p={2} className={classes.formControl}>
            <SelectCity cities={city} cityId={handleCity} placeholder="Select City" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box p={2} className={classes.formControl}>
            {vaccineCentersList?.length > 0 ? (
              <Button onClick={handleMap} variant="contained">
                View in {isMap ? 'Table' : 'Map'}
              </Button>
            ) : (
              ''
            )}
          </Box>
        </Grid>
        <Grid container justifyContent="center">
          <Box py={2} my={2}>
            {vaccineCentersList?.length > 0 ? (
              <Box>
                {isMap ? (
                  <Box px={2} mx={2} style={{ width: 1100, height: 300 }}>
                    <GoogleMap latLong={vaccineCentersList} />
                  </Box>
                ) : (
                  <Box px={2} mx={2}>
                    <BasicTable vaccineList={vaccineCentersList} />
                  </Box>
                )}
              </Box>
            ) : (
              <Typography variant="body2">Select State and City to get Vaccine Centers</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
