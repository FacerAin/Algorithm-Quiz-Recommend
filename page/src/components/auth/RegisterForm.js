import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../common/Copyright'
import styled from 'styled-components';

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RegisterForm({ type, form, onChange, onSubmit, error }) {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <form onSubmit={onSubmit} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="id"
              label="아이디"
              name="username"
              autoFocus
              onChange={onChange}
          value={form.username}
            />
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="이름"
              name="nickname"
              onChange={onChange}
          value={form.nickname}
            />
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="bjid"
              label="백준 아이디"
              name="bjid"
              onChange={onChange}
          value={form.bjid}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
              value={form.password}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="비밀번호 확인"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
              value={form.passwordConfirm}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              회원가입
            </Button>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"계정이 이미 있으신가요? 로그인"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
