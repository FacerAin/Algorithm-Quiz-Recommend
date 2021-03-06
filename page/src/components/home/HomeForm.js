import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Copyright from '../common/Copyright'
import Header from '../common/Header'
import CardForm from '../card/CardForm'
import InfoForm from '../card/InfoForm'


const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(8),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

export default function HomeForm({ challenge }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Container maxWidth="md" component="main">
          <Grid container alignItems="center"
        justify="center" spacing={3}>
        <InfoForm/>
        </Grid>
      
          <Grid container spacing={5} alignItems="flex-end">
            {challenge.map((data) => {
              return (
                <CardForm data={data}/>
              )
            })}
          </Grid>
        </Container>

      </main>
      <Copyright />
    </React.Fragment>
  );
}