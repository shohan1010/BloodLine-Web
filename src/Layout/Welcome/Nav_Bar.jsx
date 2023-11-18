import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, Link } from 'react-router-dom';

const Nav_Bar = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const auth = getAuth();
  const navagateto = useNavigate();

  const setUserSession = (userData) => {
    localStorage.setItem('userSession', JSON.stringify(userData));
    console.log("this is user data ", userData);
  };

  const clearUserSession = () => {
    localStorage.removeItem('userSession');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navagateto('/Profile');
    handleClose();
  };

  const handleHistory = () => {
    navagateto('/History');
    handleClose();
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        clearUserSession();
        handleClose();
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  useEffect(() => {
    const storedSession = localStorage.getItem('userSession');
    if (storedSession) {
      const userData = JSON.parse(storedSession);
      setUser(userData);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserSession(user);
      } else {
        setUser(null);
        clearUserSession();
        console.log("User not authenticated");
      }
    }, (error) => {
      console.error('Auth state change error:', error);
    });

    return () => {
      unsubscribe();
    };
  }, [auth, navagateto]);

  return (
    <div>
      <header className="#c03c38 text-white py-2 shadow-2xl">
        <div className="container mx-auto flex justify-between items-center">
          
          <Link to="/"> <h1>Blood Donation</h1> </Link>
          
          <nav>
            <ul className="list-none p-0 flex right-1">
              <li className="inline-block mx-4">
                <Link to="/" className="text-white no-underline sha">Home</Link>
              </li>
              <li className="inline-block mx-4">
                <Link to="/Search_Donors" className="text-white no-underline">Search Donors</Link>
              </li>

              {user ? (
                <div className='rounded-xl'>
                  <li className="inline-block mx-4">
                    <Link to="/Blood_Request" className="text-white no-underline">Blood Request</Link>
                  </li>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                  >
                    {user.email}
                  </Button>
                  <Menu
                    className='items-end'
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleProfile} >Profile</MenuItem>
                    <MenuItem onClick={handleHistory}>History</MenuItem>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                  </Menu>
                </div>
              ) : (
                <>
                  <li className="inline-block mx-4">
                    <Link to="/Register" className="text-white no-underline">Register</Link>
                  </li>
                  <li className="inline-block mx-4">
                    <Link to="/Login" className="text-white no-underline">Login</Link>
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
