import React from 'react';

const Admin = () => {
  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow">
        <div className="flex items-center justify-center h-16 bg-red-500 text-white">
          <span className="text-2xl font-bold">Blood Donation</span>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center px-4 py-3 text-gray-700 sidebar-link">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                Dashboard
              </a>
            </li>
            
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between h-16 px-8">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">Profile</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Logout</a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-4">Welcome, Admin!</h2>
          <p className="text-gray-700">This is the admin dashboard for the Blood Donation website. Feel free to manage everything seamlessly.</p>
        </main>

        {/* Footer */}
        <footer className="bg-gray-200 h-16 flex items-center justify-center">
          <span>© 2022 Blood Donation. All rights reserved.</span>
        </footer>
      </div>
    </div>
  );
};

export default Admin;

