import React from 'react';
import { Outlet } from 'react-router-dom';

const Admin_login = () => {
  return (
    <div>

      <h1>This is Admin Login Page</h1>

      <Outlet/>
      
    </div>
  );
};

export default Admin_login