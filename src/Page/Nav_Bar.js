import React, { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Nav_Bar = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const auth = getAuth();

  // Function to set user session data
  const setUserSession = (userData) => {
    localStorage.setItem('userSession', JSON.stringify(userData));
  };

  // Function to clear user session data
  const clearUserSession = () => {
    localStorage.removeItem('userSession');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        clearUserSession(); // Clear the user session on successful logout
        handleClose();
         // Close the menu after successful logout
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  useEffect(() => {
    // Check if there's a user session in local storage
    const storedSession = localStorage.getItem('userSession');
    if (storedSession) {
      const userData = JSON.parse(storedSession);
      setUser(userData);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserSession(user); // Store the user session on login
      } else {
        setUser(null);
        clearUserSession(); // Clear the user session on logout
        console.log("User not authenticated");
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe when the component unmounts
    };
  }, []);

  return (
    <div>
      <header className="#c03c38 text-white py-2">
        <div className="container mx-auto flex justify-between items-center">
          <h1>Blood Donation</h1>
          <nav>
            <ul className="list-none p-0 flex right-1">
              <li className="inline-block mx-4">
                <a href="/" className="text-white no-underline sha">Home</a>
              </li>
              <li className="inline-block mx-4">
                <a href="/Search_Donors" className="text-white no-underline">Search Donors</a>
              </li>
              
              {user ? (
                
                <div className=' rounded-xl'>
                  <li className="inline-block mx-4">
                <a href="/Blood_Request" className="text-white no-underline">Blood Request</a>
              </li>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                  >
                    {user.email}
                  </Button>
                  <Menu
                    className=' items-end'
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>History</MenuItem>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                  </Menu>
                </div>
              ) : (
                <>
                  <li className="inline-block mx-4">
                    <a href="/Register" className="text-white no-underline">Register</a>
                  </li>
                  <li className="inline-block mx-4">
                    <a href="/Login" className="text-white no-underline">Login</a>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Nav_Bar;
