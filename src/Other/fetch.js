import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Typography, Grow, Grid } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocs(collection(db, 'cities'));
        const itemsArray = data.docs.map((doc) => doc.data());
        setItems(itemsArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [isHovered, setIsHovered] = useState(null);

  return (
    <div className="App">
      <h1>Items from Firestore</h1>
      <Grid container spacing={2}>
        {items.map((item, index) => (
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
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Blood Group: {item.bloodGroup}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gender: {item.gender}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {item.location}
                  </Typography>
                  {/* Add more information here */}
                </CardContent>
                <CardActions style={{ justifyContent: 'flex-end' }}>
                  <button
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    Learn More
                  </button>
                </CardActions>
              </Card>
            </Grid>
          </Grow>
        ))}
      </Grid>
    </div>
  );
}

export default App;

