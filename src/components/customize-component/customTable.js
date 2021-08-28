/* eslint-disable prettier/prettier */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

BasicTable.propTypes = {
  vaccineList: PropTypes.array
};

export default function BasicTable({ vaccineList }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{ maxHeight: 200 }}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr. No.</TableCell>
            <TableCell>Center Name</TableCell>
            <TableCell align="left">Location</TableCell>
            <TableCell align="left">Vaccine Name</TableCell>
            <TableCell size="medium" align="left">
              Age
            </TableCell>
            <TableCell align="left">Available Dose</TableCell>
            <TableCell align="left">Fee</TableCell>
            <TableCell align="left">Available Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vaccineList.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.location}</TableCell>
              <TableCell align="left">{row.vaccine_name}</TableCell>
              <TableCell align="left">{row.min_age_limit}</TableCell>
              <TableCell align="left">
                <Typography variant="body1">D1 - {row.available_capacity_dose1}</Typography>
                <Typography variant="body1">D2 - {row.available_capacity_dose2}</Typography>
              </TableCell>
              <TableCell align="left">{row.vaccine_fees.length > 0 ? 'Paid' : 'Free'}</TableCell>
              <TableCell align="left">{row.next_available_day}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
