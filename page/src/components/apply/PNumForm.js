import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function PNumForm({num, setNum}) {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        문제 개수
      </Typography>
      <Grid alignItems="center"
        justify="center" container spacing={3}>
        <Grid item xs={5} sm={5}>
          <TextField
            required
            value={num}
            onChange={(e) => {setNum(e.target.value)}}
            id="p_num"
            name="p_num"
            label="개수"
            fullWidth
            autoComplete="given-name"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}