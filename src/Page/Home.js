// Import Statements
import React, { useState, useEffect } from 'react';
import Nav_Bar from './Nav_Bar';
import { Container, TextField, Button, Typography, Grid, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import only necessary Firebase functions
import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';

const Home = () => {
  // Function to handle "Donate Now" button click
  function donateNow() {
    alert("Thank you for your willingness to donate blood. Your contribution can save lives!");
  }

  // State for the currently authenticated user
  const app = initializeApp(firebaseConfig)

  const [user, setUser] = useState(null);

  // Initialize Firebase authentication
  const auth = getAuth();

  // useEffect to track changes in authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [auth]); // Pass [auth] as the dependency to avoid a missing dependency warning

  return (
    <div>
      <Nav_Bar />

      <section id="hero">
        <h2>Welcome to our Blood Donation</h2>
        <p>Help save lives by donating blood. Your contribution can make a difference.</p>
        <button className="btn" onClick={donateNow}>Donate Now</button>
      </section>

      <section id="about">
        <h2>About Us</h2>
        <p>We are a non-profit organization dedicated to saving lives by providing a safe and efficient blood donation service.</p>
      </section>

      <section id="donors">
        <h2>Our Donors</h2>
      
      </section>

      <section id="recipients">
        <h2>Recipients in Need</h2>
        {/* You can display recipient information here */}
      </section>

      <section id="contact">
        <h2>Contact Us</h2>
        <p>If you have any questions or need assistance, please feel free to contact us.</p>
      </section>

      <footer>
        <p>&copy; 2023 Blood Donation</p>
      </footer>
    </div>
  );
};

export default Home;
