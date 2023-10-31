import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid, IconButton } from '@mui/material';
import Nav_Bar from './Nav_Bar';
import GoogleIcon from '@mui/icons-material/Google';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import { ClipLoader } from 'react-spinners';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setError(null);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    setIsLoading(true); // Set isLoading to true
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        setError(null);
        setIsLoading(false); // Set isLoading to false on success
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false); // Set isLoading to false on failure
      });
  };

  const handleEmailSignIn = () => {
    setIsLoading(true); // Set isLoading to true
    if (!email || !password) {
      setError("Required fields are empty");
      setIsLoading(false); // Set isLoading to false
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setError(null);
        setIsLoading(false); // Set isLoading to false on success
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false); // Set isLoading to false on failure
      });
  };

  const handleSignOut = () => {
    setIsLoading(true); // Set isLoading to true
    signOut(auth)
      .then(() => {
        setUser(null);
        setIsLoading(false); // Set isLoading to false on success
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false); // Set isLoading to false on failure
      });
  };

  return (
    <div>
      <Nav_Bar></Nav_Bar>
      {isLoading && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <ClipLoader
            color={'#d73636'}
            loading={true}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <Container maxWidth="xs" className='shadow-xl rounded-xl'>
        <Grid elevation={3} style={{ padding: '20px', marginTop: '250px', display: isLoading ? 'none' : 'block' }}>
          {user ? (
            <div>
              <Typography variant="h4" align="center">Welcome, {user.email}</Typography>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleSignOut}
                style={{ marginTop: '15px' }}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div>
              <Typography variant="h4" align="center">Login</Typography>
             
              <TextField
                fullWidth
                label="Email or Phone Number"
                name='email'
                margin="normal"
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Password"
                name='password'
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Grid item xs={10} style={{ textAlign: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: 'primary',
                    color: 'white',
                    fontSize: '15px',
                    padding: '15px 30px',
                    marginTop: '10px',
                  }}
                  onClick={handleEmailSignIn}
                  required
                >
                  Login
                </Button>
              </Grid>
              <IconButton onClick={handleGoogleSignIn} style={{ marginTop: '15px', marginRight: '10px' }}>
                <GoogleIcon />
              </IconButton>
              {error && <Typography variant="body1" color="error" marginLeft={10}>Username or Password is incorrect</Typography>}
              <div className="flex justify-end ">
                <p>
                  Don't have an account?<a href="/register" className="text-black hover:text-blue-500">  Register
                  </a>
                </p>
              </div>
            </div>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Login;