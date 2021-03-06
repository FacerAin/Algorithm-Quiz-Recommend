  
import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {BsPencilSquare} from 'react-icons/bs'



const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  card: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? '#2196f3' : '#2196f3',
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tier = {
 
    title: 'Free',
    price: '진행 중',
    description: ['A+B', '1000'],
    buttonText: '풀기',
    buttonVariant: 'outlined',
 
};

export default function Pricing({data}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

            <Grid item key={tier.title} xs={12} sm={12} md={12}>
              <Card className={classes.card}>
              <CardActionArea onClick={()=>console.log('click')}>
                <CardContent>
                         <div className={classes.cardPricing}>
                    <Typography component="h4" variant="h4" color="textPrimary">
                 
                      {"D-1"}
                 
                    </Typography>
                  </div>
                  <ul>
                  <Typography component="h3" variant="subtitle1" align="center">
                        {"recursion 유형에 취약해요!"}
                      </Typography>
          
       
                  </ul>
                </CardContent>
                <CardActions>
                </CardActions>
                </CardActionArea>
              </Card>
      </Grid>
    </React.Fragment>
  );
}