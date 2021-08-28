// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AppVaccineCenters } from '../components/_dashboard/app/AppVaccineCenters';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------
const BASEURL =
  'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data';
export default function DashboardApp() {
  const [covidData, setcovidData] = useState([]);

  const options = {
    method: 'GET',
    url: `${BASEURL}/country-report-iso-based/India/ind`,
    headers: {
      'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
      'x-rapidapi-key': '09aac4d697msh67831e80a87bf46p1755b7jsn7e9f5f44b4d4'
    }
  };
  const graphData = {
    method: 'GET',
    url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/covid-ovid-data/sixmonth/USA',
    headers: {
      'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
      'x-rapidapi-key': '09aac4d697msh67831e80a87bf46p1755b7jsn7e9f5f44b4d4'
    }
  };
  useEffect(() => {
    axios
      .all([axios.request(options), axios.request(graphData)])
      .then(
        axios.spread((covidData) => {
          setcovidData(covidData.data);
        })
      )
      .catch((error) => console.log(error));
  }, []);
  return (
    <Page title="Dashboard | Covid-19">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h2" align="center">
            Covid-19 India
          </Typography>
        </Box>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales activeCases={covidData[0]?.ActiveCases} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers recoveredCases={covidData[0]?.TotalRecovered} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders recoveredCases={covidData[0]?.TotalRecovered} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports totalCases={covidData[0]?.TotalCases} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            {/* covid-past-6months-report */}
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            {/* covid-ratio */}
            <AppCurrentVisits />
          </Grid>
          <Grid item xs={12}>
            <AppVaccineCenters />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
