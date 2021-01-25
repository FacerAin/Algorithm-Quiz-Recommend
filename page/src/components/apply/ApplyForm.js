import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PNumForm from './PNumForm';
import PLevForm from './PLevForm'
import PDateForm from './PDateForm'
import Copyright from '../common/Copyright'
import {get} from '../../modules/challenge'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';


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

const steps = ['문제 개수', '난이도', '마감 기한'];

function getStepContent(step, selectedDate, handleDateChange, value, setValue, num, setNum) {
  switch (step) {
    case 0:
      return <PNumForm num={num} setNum={setNum} />;
    case 1:
      return <PLevForm value={value} setValue={setValue} />;
    case 2:
      return <PDateForm selectedDate={selectedDate} handleDateChange={handleDateChange} />;
    default:
      throw new Error('Unknown step');
  }
}

/*
        challengeForm={challengeForm}
        onChange={onChange}
        onSubmit={onSubmit}
*/

function ApplyForm({ history}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [value, setValue] = React.useState(2);
  const [num, setNum] = React.useState(0);

  const { user } = useSelector(({ auth, user }) => ({
    user: user,
  }));

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    if(activeStep === steps.length - 1){
      history.push('/');
      dispatch(get())
    }else{
      handleNext()
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            챌린지 생성
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  {getStepContent(activeStep, selectedDate, handleDateChange, value, setValue, num, setNum)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        뒤로
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? '생성' : '다음'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}

export default withRouter(ApplyForm)