import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Box, Stack, Link, Card, Typography, CardHeader } from '@material-ui/core';
// utils
import { mockImgCover } from '../../../utils/mockImages';
//
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

function NewsItem({ news }) {
  const { urlToImage, title, content, pubDate, link } = news;
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt=""
        src={urlToImage}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box m={2}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2">{title}</Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {content}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {formatDistance(new Date(pubDate), new Date())}
      </Typography>
    </Stack>
  );
}

export default function AppNewsUpdate() {
  const options = {
    method: 'GET',
    url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-vaccine-news/0',
    headers: {
      'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
      'x-rapidapi-key': '09aac4d697msh67831e80a87bf46p1755b7jsn7e9f5f44b4d4'
    }
  };
  const [vaccineNews, setvaccineNews] = useState([]);
  useEffect(() => {
    axios
      .request(options)
      .then((info) => {
        setvaccineNews(info?.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <Card>
      <CardHeader title="News Update" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {vaccineNews?.news?.length > 0
            ? vaccineNews?.news?.slice(2).map((news) => <NewsItem key={news.title} news={news} />)
            : 'Loading...'}
        </Stack>
      </Scrollbar>
    </Card>
  );
}
