import logo from './logo.svg';
import './App.css';
import Home from './Page/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Blood_Request from './Page/Blood_Request';
import Login from './Page/Login';
import Register from './Page/Register';
import Search_Donors from './Page/Search_Donors';
import Error_404 from './Page/Error_404';
import { createTheme, ThemeProvider } from '@mui/material/styles';




function App() {
  // Custom theme fo matarial theme Primary Color
  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#c03c38', 
      },
    },
  });




  return (
    <div>
      
      <ThemeProvider theme={customTheme}>


        <Router>
          <Switch>
            

            <Route path='/Blood_Request'>
              <Blood_Request></Blood_Request>

            </Route>
            <Route path='/Login'>
              <Login></Login>

            </Route>
            <Route path='/Register'>
              <Register></Register>

            </Route>
            <Route path='/Search_Donors'>
              <Search_Donors></Search_Donors>

            </Route>
            <Route exact path='/'>
              <Home></Home>
            </Route>

            <Route path='*'>
              <Error_404></Error_404>

            </Route>

          </Switch>
        </Router>


      </ThemeProvider>

    </div>
  );

}

export default App;
