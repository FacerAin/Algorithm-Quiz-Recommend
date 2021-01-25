import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HomeForm from '../../components/home/HomeForm';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
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
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));


const HomeContainer = ({ history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { user, challenge } = useSelector(({ user, challenge }) => ({
    user: user.user,
    challenge: challenge.challenge
  }));

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다  ');
      history.push('/login');
    }

  }, [dispatch, user, history]);
  return (
    <>
      { challenge ? (<HomeForm challenge={challenge}/>) : (<>
        <main className={classes.layout}>
        <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>
        아직 생성된 챌린지가 없어요!
      </Typography>
        <Grid container alignItems="center"
          justify="center" spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button color="primary" variant="contained" href="/apply">
              챌린지 생성하기
        </Button>
          </Grid>
        </Grid>
</Paper>
</main>

      </>)}

    </>
  );
};
export default withRouter(HomeContainer);