/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Tooltip from '@material-ui/core/Tooltip';
import { FaMapMarkerAlt } from 'react-icons/fa';

const GoogleMap = ({ latLong, ...props }) => (
  <GoogleMapReact
    bootstrapURLKeys={{
      key: 'AIzaSyDfkQ37lEOioZHll0KlQXbStgwFAqbCCD8'
    }}
    {...props}
    defaultCenter={{
      lat: latLong[0]?.district_name === 'Nagpur' ? 21.146633 : 18.516726,
      lng: latLong[0]?.district_name === 'Nagpur' ? 79.08886 : 73.856255
    }}
    defaultZoom={11}
  >
    {latLong?.map((element, idx) => (
      <Marker key={idx} title={element?.name} lat={+element?.lat} lng={+element?.longs} />
    ))}
  </GoogleMapReact>
);
const Marker = (props) => (
  <Tooltip title={props.title} aria-label={props.title}>
    <div className="SuperAwesomePin" style={{ color: 'red', fontSize: '30px' }}>
      <FaMapMarkerAlt />
    </div>
  </Tooltip>
);

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  latLong: PropTypes.any.isRequired
};

GoogleMap.defaultProps = {
  children: null
};

export default GoogleMap;
