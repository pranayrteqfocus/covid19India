import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const options = {
  method: 'GET',
  url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/covid-ovid-data/sixmonth/IND',
  headers: {
    'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
    'x-rapidapi-key': '09aac4d697msh67831e80a87bf46p1755b7jsn7e9f5f44b4d4'
  }
};

export default function AppWebsiteVisits() {
  const [dateTime, setdateTime] = useState([]);
  const [cases, setcases] = useState([]);
  const [freshCases, setFreshCases] = useState([]);
  const [deaths, setdeaths] = useState([]);
  useEffect(() => {
    axios
      .all([axios.request(options)])
      .then(
        axios.spread((graphs) => {
          const date = graphs.data.map((el) => el.date);
          const totalCases = graphs.data.map((el) => el.total_cases);
          const totalDeaths = graphs.data.map((el) => el.total_deaths);
          const newCases = graphs.data.map((el) => el.new_cases);
          setdateTime(date);
          setcases(totalCases);
          setdeaths(totalDeaths);
          setFreshCases(newCases);
          console.log(graphs);
        })
      )
      .catch((error) => console.log(error));
  }, []);

  const CHART_DATA = [
    {
      name: 'Total Cases',
      type: 'column',
      data: cases
    },
    {
      name: 'Total Deaths',
      type: 'area',
      data: freshCases
    },
    {
      name: 'New Cases',
      type: 'line',
      data: deaths
    }
  ];
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: dateTime,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)}`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Covid-19" subheader="-Past 6months" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
