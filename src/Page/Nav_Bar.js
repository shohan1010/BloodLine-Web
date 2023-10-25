import React from 'react';

const Nav_Bar = () => {
  return (
    <div>
      <header className="#c03c38 text-white py-2">
        <div className="container mx-auto flex justify-between items-center">
          <h1>Blood Donation</h1>
          <nav>
            <ul className="list-none p-0 flex right-1">
              <li className="inline-block mx-4">
                <a href="/" className="text-white no-underline">Home</a>
              </li>
              <li className="inline-block mx-4">
                <a href="/Search_Donors" className="text-white no-underline">Search Donors</a>
              </li>
              <li className="inline-block mx-4">
                <a href="/Blood_Request" className="text-white no-underline">Blood Request</a>
              </li>
              <li className="inline-block mx-4">
                <a href="/Register" className="text-white no-underline">Register</a>
              </li>
              <li className="inline-block mx-4">
                <a href="/Login" className="text-white no-underline">Login</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Nav_Bar;
