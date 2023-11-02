import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import Nav_Bar from './Nav_Bar';
import MySVG from '../img/1.svg'

const Home = () => {
  function donateNow() {
    alert("Thank you for your willingness to donate blood. Your contribution can save lives!");
  }

  // const app = initializeApp(firebaseConfig);

  const [user, setUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        console.log("not authenticated");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (



    <div className="bg-gray-100 text-gray-800 font-sans">

    {/* Use bg gradient for visual interest */}
    <Nav_Bar></Nav_Bar>
  
    {/* Add max-w-7xl mx-auto for better content wrapping */}
    <section className="p-8 m-4 bg-white rounded-md shadow-lg max-w-7xl mx-auto flex">
  <div className="p-16 text-left" style={{ flex: '2' }}>
    <Typography variant="h2" className="text-4xl font-bold">Welcome to our<br />Blood Donation</Typography>
    <p className="text-xl text-left mt-4 mb-20">
      Help save lives by donating blood. <br />Your contribution can make a difference.
    </p>


    <Button variant="contained" color="primary" onClick={donateNow} className="bg-red-600 hover:bg-red-700 mt-6 px-8 py-3 rounded-full text-xl">
      Donate Now
    </Button>
    





  </div>
  <div><img src="https://i.ibb.co/kHK6ywG/1.png" alt="1" /></div>
  {/* <div><img src="https://i.ibb.co/Mc9ZZkC/Screenshot-2023-11-03-041345.png" alt="1" /></div> */}
  
  
  
</section>



  
    {/* Use grid for responsive layout */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
  
      {/* Display testimonials */}
      <section className="p-8 bg-white rounded-md shadow-lg">
        <Typography variant="h4">Donor Testimonials</Typography>
  
        {/* Show testimonial */}
        <blockquote className="italic mt-4">
          "Donating blood through this organization was a great experience. I felt safe and the staff was friendly and professional."
        </blockquote>
        <p className="text-gray-500 mt-2 text-sm">- Mahadi, Donor</p>
  
      </section>
  
      {/* Section for facts, stats */}
      <section className="p-8 bg-white rounded-md shadow-lg">
        <Typography variant="h4">Our Impact</Typography>
        
        {/* Stats */}
        <p className="mt-4 text-2xl font-semibold">5,000</p>
        <p className="text-gray-500">Lives saved last year</p>
  
      </section>
  
    </div>
    
  
    {/* Visual divider */}
    <div className="bg-red-600 h-1 mx-auto max-w-xl my-12"></div>
  
    {/* FAQ styling */}
    <section className="max-w-3xl mx-auto p-8 bg-white rounded-md shadow-lg">
      <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
      
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Who can donate blood?</h3>
        <p className="text-gray-700">Most people over age 16 and in good health can donate blood...</p> 
      </div>
  
    
  
    </section>
  
 
  
    <footer className="#c03c38 p-4 text-center text-white shadow-2xl">
      <Typography variant="body2">&copy; 2023 Blood Donation</Typography>
    </footer>
  
  </div>





  );
};

export default Home;