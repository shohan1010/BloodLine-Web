  import React, { useState, useEffect } from 'react';
  import { initializeApp } from 'firebase/app';
  import { getFirestore, collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import firebaseConfig from './firebaseConfig';
  import Nav_Bar from './Nav_Bar';
  import { ClipLoader } from 'react-spinners';
  import { Card, CardContent, Grid, Grow, IconButton, Typography } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';


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
              userData.push({ ...data, id: doc.id }); 
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

  
    }, []);

    const handleDelete = async (documentId) => {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const userDocRef = doc(db, 'show data', userEmail);
      const subcollectionRef = collection(userDocRef, 'Blood Request');
    
      // Display a confirmation dialog to check if the user want to delete or not
      const isConfirmed = window.confirm('Are you sure you want to delete this Blood Request?');
    
      if (isConfirmed) {
        try {
          // firebase firestore delete collection
          await deleteDoc(doc(subcollectionRef, documentId));
          setUserData((prevUserData) => prevUserData.filter((doc) => doc.id !== documentId));
        } catch (error) {
          console.error('Error deleting document:', error);
        }
      }
    };
    

    return (
      <div>
        <Nav_Bar />
        <h1 className=' text-center mt-5 '>Your Blood Request History</h1>

        {isLoading && (
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <ClipLoader color={'#d73636'} loading={true} size={150} aria-label="Loading Spinner" data-testid="loader" />
          </div>
        )}

        <div className='mt-20 pl-3 pr-3'>
          <Grid container spacing={2} style={{ display: isLoading ? 'none' : 'flex' }}>
            {userData.map((user, index) => (
              <Grow in={true} key={index} timeout={500}>
                <Grid item xs={12} sm={6} md={4}>
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
                      <Typography variant="body2" color="text secondary">
                        Blood Group: {user.BloodGroup}
                      </Typography>
                      <Typography variant="body2" color="text secondary">
                        Gender: {user.Gender}
                      </Typography>
                      <Typography variant="body2" color="text secondary">
                        Location: {user.Location}
                      </Typography>
                      {/* Delete Icon */}
                      <IconButton className='float-right' onClick={() => handleDelete(user.id)}>
                        <DeleteIcon ></DeleteIcon>
                        </IconButton>
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
