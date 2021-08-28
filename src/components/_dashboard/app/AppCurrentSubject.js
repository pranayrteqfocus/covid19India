import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Stack, Link, Card, Typography, CardHeader } from '@material-ui/core';
//
import Scrollbar from '../../Scrollbar';
// ----------------------------------------------------------------------

function NewsItem({ news }) {
  const { urlToImage, title } = news;
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={urlToImage}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box m={2}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2">{title}</Typography>
        </Link>
      </Box>
    </Stack>
  );
}
export default function AppCurrentSubject() {
  const [covidNews, setcovidNews] = useState([]);

  const options = {
    method: 'GET',
    url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-health-news/1',
    headers: {
      'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
      'x-rapidapi-key': '09aac4d697msh67831e80a87bf46p1755b7jsn7e9f5f44b4d4'
    }
  };
  useEffect(() => {
    axios
      .request(options)
      .then((info) => {
        setcovidNews(info?.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <Card>
      <CardHeader title="Heath News" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {covidNews?.news?.length > 0
            ? covidNews?.news?.map((news) => <NewsItem key={news.title} news={news} />)
            : 'Loading...'}
        </Stack>
      </Scrollbar>
    </Card>
  );
}
