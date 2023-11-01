import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import Nav_Bar from './Nav_Bar';
import { ClipLoader } from 'react-spinners';
import { Card, CardContent, Grid, Grow, Typography } from '@mui/material';

const History = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userData, setUserData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const currentUserEmail = user.email;
        const userDocRef = doc(db, 'show data', currentUserEmail);
        const subcollectionRef = collection(userDocRef, 'Blood Request');

        try {
          const querySnapshot = await getDocs(subcollectionRef);
          const userData = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            userData.push(data);
          });

          setUserEmail(currentUserEmail);
          setUserData(userData);
        } catch (error) {
          console.error('Error getting subcollection data:', error);
        }
      } else {
        console.log('No user is currently authenticated');
      }
    });

    // Moved the return statement outside of the useEffect
  }, []);

  return (
    <div>
      <Nav_Bar />
      <h1>User Profile</h1>
      <p>Email: {userEmail}</p>
      <h2>Names:</h2>

      {isLoading && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <ClipLoader color={'#d73636'} loading={true} size={150} aria-label="Loading Spinner" data-testid="loader" />
        </div>
      )}

      <div className='mt-20 pl-3 pr-3'>
        <Grid container spacing={2} style={{ display: isLoading ? 'none' : 'flex' }}>
          {userData.map((user, index) => (
            <Grow in={true} key={index} timeout={500}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                  variant="outlined"
                  style={{
                    backgroundColor: isHovered === index ? '#f0f0f0' : 'white',
                    transition: 'background-color 0.3s',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <CardContent
                    style={{
                      transition: 'transform 0.3s',
                      transform: isHovered === index ? 'scale(1.05)' : 'scale(1)',
                    }}
                  >
                    <Typography variant="h5" component="div">
                      {user.Name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Blood Group: {user.BloodGroup}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Gender: {user.Gender}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Location: {user.Location}
                    </Typography>
                    {/* Add more information here */}
                  </CardContent>
                </Card>
              </Grid>
            </Grow>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default History;