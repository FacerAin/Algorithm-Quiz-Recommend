import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


const labels = {
  1: '쉬움',
  2: '보통',
  3: '어려움'
};

export default function PLevForm({value, setValue}) {
  const [hover, setHover] = React.useState(-1);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        난이도
      </Typography>
      <Grid container alignItems="center"
        justify="center" spacing={3}>
        <Grid item xs={12} sm={6}>
          <Rating size="large" value={value} name="customized-10" onChangeActive={(event, newHover) => {
            setHover(newHover);
          }} onChange={(event, newValue) => {
            setValue(newValue);
          }} max={3} />
          {value !== null && labels[hover !== -1 ? hover : value]}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}