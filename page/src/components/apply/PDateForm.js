import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';

export default function PDateForm({selectedDate, handleDateChange}) {
 
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        마감 기한
      </Typography>
      <Grid container alignItems="center"
        justify="center" spacing={3}>
        <Grid item xs={12} sm={6}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker value={selectedDate} onChange={handleDateChange} />
        </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}