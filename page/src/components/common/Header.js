import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {BiRefresh} from 'react-icons/bi'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header({ user, onLogout, onSync }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            내일은 코딩왕
          </Typography>
          {user ? (
            <>
            <Typography className={classes.title}>
              {user.id}
            </Typography>
            <Button onClick= {onSync} color="inherit">
            <BiRefresh/>
            </Button>
            
              <Button color="inherit" onClick={onLogout}>로그아웃</Button></>

          ) : (
              <>

                <Button to="/login" color="inherit">로그인</Button>
              </>
            )}
        </Toolbar>
      </AppBar>
    </div>
  );
}