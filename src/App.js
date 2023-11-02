import logo from './logo.svg';
import './App.css';
import Home from './Page/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Blood_Request from './Page/Blood_Request';
import Login from './Page/Login';
import Register from './Page/Register';
import Search_Donors from './Page/Search_Donors';
import Error_404 from './Page/Error_404';
import ProtectedRoute from './Component/ProtectedRoute';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseConfig from './Page/firebaseConfig';
import { initializeApp } from 'firebase/app';
import History from './Page/History';








function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#c03c38',
      },
    },
  });

  useEffect(() => {

    initializeApp(firebaseConfig);

    const auth = getAuth();


    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User is signed in");
        setIsAuthenticated(true);
      } else {
        // User is signed out
        console.log("User is signed out")
        setIsAuthenticated(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <ThemeProvider theme={customTheme}>
        <Router>
          <Switch>

          <Route path='/Login'>
              <Login />
            </Route>



            // ProtectedRoute
            <ProtectedRoute
              path="/Blood_Request"
              component={Blood_Request}
              isAuthenticated={isAuthenticated}
            />
            <ProtectedRoute
              path="/History"
              component={History}
              isAuthenticated={isAuthenticated}
            />


            <ProtectedRoute
              path="/Register"
              component={History}
              isAuthenticated={!isAuthenticated}
            />

            // Normal Route
            
            {/* <Route path='/Blood_Request'>
              <Login />
            </Route> */}
            {/* <Route path='/Register'>
              <Register />
            </Route> */}
            <Route path='/Search_Donors'>
              <Search_Donors />
            </Route>

            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='*'>
              <Error_404 />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;