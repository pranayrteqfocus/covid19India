import { merge, parseInt } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------
const BASEURL =
  'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data';
const indData = {
  method: 'GET',
  url: `${BASEURL}/country-report-iso-based/India/ind`,
  headers: {
    'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
    'x-rapidapi-key': '09aac4d697msh67831e80a87bf46p1755b7jsn7e9f5f44b4d4'
  }
};
export default function AppCurrentVisits() {
  const [ratio, setratio] = useState([]);
  useEffect(() => {
    axios
      .all([axios.request(indData)])
      .then(
        axios.spread((ind) => {
          // setratio(ind.data[0]);
          ind.data.map((el) => {
            const combine = [
              ...ratio,
              parseInt(el.ActiveCases),
              parseInt(el.TotalCases),
              parseInt(el.TotalRecovered),
              parseInt(el.TotalTests)
            ];
            return setratio(combine);
          });
        })
      )
      .catch((error) => console.log(error));
  }, []);
  console.log(ratio);
  const theme = useTheme();
  const CHART_DATA = ratio;
  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      'brown',
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main
    ],
    labels: ['Active', 'Total Cases', 'Recovered', 'Total Tests'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <Card>
      <CardHeader title="Covid Ratio" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={CHART_DATA} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
