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
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      setUser(userAuth);
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);

  const handleProfile = () => {
    navigate('/Profile');
    handleClose();
  };

  const handleHistory = () => {
    navigate('/History');
    handleClose();
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem('userSession');
        handleClose();
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <header className="#c03c38 text-white py-2 shadow-2xl">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <h1>Blood Donation</h1>
          </Link>
          <nav>
            <ul className="list-none p-0 flex right-1">
              <li className="inline-block mx-4">
                <Link to="/" className="text-white no-underline sha">
                  Home
                </Link>
              </li>
              <li className="inline-block mx-4">
                <Link to="/Search_Donors" className="text-white no-underline">
                  Search Donors
                </Link>
              </li>
              {user ? (
                <div className='rounded-xl'>
                  <li className="inline-block mx-4">
                    <Link to="/Blood_Request" className="text-white no-underline">
                      Blood Request
                    </Link>
                  </li>
                  <Button variant="contained" color="primary" onClick={handleClick}>
                    {user.email}
                  </Button>
                  <Menu
                    className='items-end'
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleHistory}>History</MenuItem>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                  </Menu>
                </div>
              ) : (
                <>
                  <li className="inline-block mx-4">
                    <Link to="/Register" className="text-white no-underline">
                      Register
                    </Link>
                  </li>
                  <li className="inline-block mx-4">
                    <Link to="/Login" className="text-white no-underline">
                      Login
                    </Link>
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
