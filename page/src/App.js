import './App.css';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import { Route } from 'react-router-dom';
import ApplyPage from './pages/ApplyPage';

function App() {
  return (
    <div className="App">
      <>
      <Route component={HomePage} path={['/@:username', '/']} exact/>
      <Route component={LoginPage} path="/login"/>
      <Route component={RegisterPage} path="/register"/>
      <Route component={ApplyPage} path="/apply"/>
      </>
    </div>
  );
}

export default App;
