import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app'; // Import initializeApp
import firebaseConfig from '../../Component/firebaseConfig';
import { ClipLoader } from 'react-spinners';

const Auth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);

    const auth = getAuth();

  const login = true;

  initializeApp(firebaseConfig);

  
 

  onAuthStateChanged(auth, (user) => {
    setIsInitializing(false); // Authentication is initialized
    if (user) {
      // User is signed in
      console.log('User is signed in');
      setIsAuthenticated(true);
    } else {
      // User is signed out
      console.log('User is signed out');
      setIsAuthenticated(false);
    }
  });


  console.log(user)
  if (isInitializing) {
    // Show a loader or loading indicator while initializing
    return <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
    <ClipLoader
      color={'#d73636'}
      loading={true}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>;
  }

  if (!user) {
    console.log("This is not a valid user");
    return <Navigate to="/Login" />;
  }

  return <Outlet />;
};

export default Auth;
