import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import Admin from './Layout/Admin/Admin';
import Login from './Layout/Users/Login';
import firebaseConfig from './Component/firebaseConfig';
import Blood_Request from './Layout/Users/Blood_Request';
import Profile from './Layout/Users/Profile';
import Register from './Layout/Users/Register';
import Search_Donors from './Layout/Welcome/Search_Donors';
import Home from './Layout/Welcome/Home';
import Error_404 from './Layout/Welcome/Error_404';
import ProtectedRoute_User from './Layout/Users/ProtectedRoute_User';
import ProtectedRoute_Admin from './Layout/Admin/ProtectedRoute_Admin';
import Admin_login from './Layout/Admin/Admin_login';

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
            
            <Route path='/Admin_login'>
              <Admin_login />
            </Route>

            {/* Admin Route */}
            <ProtectedRoute_Admin
              path="/admin"
              component={Admin}
              userRole={isAuthenticated ? 'admin' : 'guest'}
              allowedRoles={['admin']}
            />

            {/* User Routes */}
            <ProtectedRoute_User
              path="/Blood_Request"
              component={Blood_Request}
              userRole={isAuthenticated ? 'user' : 'guest'}
              allowedRoles={['user']}
            />
            <ProtectedRoute_User
              path="/Profile"
              component={Profile}
              userRole={isAuthenticated ? 'user' : 'guest'}
              allowedRoles={['user']}
            />

            <ProtectedRoute_User
              path="/Register"
              component={Register}
              userRole={!isAuthenticated ? 'guest' : 'user'}
              allowedRoles={['guest']}
            />
            <ProtectedRoute_User
              path="/Login"
              component={Login}
              userRole={!isAuthenticated ? 'guest' : 'user'}
              allowedRoles={['guest']}
            />

            



            {/* Normal Route */}
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