import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { ClipLoader } from 'react-spinners';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grow,
  Grid,
} from '@mui/material';

// Firebase Configuration
import firebaseConfig from './firebaseConfig';
import { Navbar } from 'react-bootstrap';
import Nav_Bar from './Nav_Bar';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const bangladeshLocations = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria",
  "Chandpur", "Chapai Nawabganj", "Chattogram", "Chuadanga", "Comilla", "Cox's Bazar",
  "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj",
  "Jamalpur", "Jessore (Jashore)", "Jhalokati", "Jhenaidah", "Joypurhat", "Khagrachari",
  "Khulna", "Kishoreganj", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura",
  "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail",
  "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna",
  "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur",
  "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail",
  "Thakurgaon", "Other district"
];

const Search_Donors = () => {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    BloodGroup: '',
    Location: [], // Use an array to store selected locations
    DonorType: '',
  });

  const [isHovered, setIsHovered] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const searchUsers = async () => {
    try {
      setLoading(true);
      let q = query(collection(db, 'User_Info'));

      if (filters.BloodGroup) {
        q = query(q, where('BloodGroup', '==', filters.BloodGroup));
      }
      if (filters.Location.length > 0) { // Check if locations are selected
        q = query(q, where('Location', 'in', filters.Location));
      }
      {

        if (filters.DonorType) {
          if (filters.DonorType !== 'All') {
            q = query(q, where('DonorType', '==', filters.DonorType));
          } else {
            console.log("DonorType is 'All");
          }
        }
        
      }

      const querySnapshot = await getDocs(q);

      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });

      setItems(users);
    } catch (error) {
      console.error('Error searching for users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial data when the component mounts
    searchUsers();
  }, []);

  return (
    <div>
      <Nav_Bar></Nav_Bar>
      <div className="relative w-full pb-5/3 max-w-5xl mx-auto mt-32 flex flex-row items-center justify-center">
        <Autocomplete
          className="w-1/3"
          name="BloodGroup"
          options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Blood Group"
              variant="outlined"
            />
          )}
          onChange={(event, value) => handleInputChange('BloodGroup', value)}
        />
        <Autocomplete
          className="w-1/3"
          name="Location"
          options={bangladeshLocations}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Location"
              variant="outlined"
            />
          )}
          onChange={(event, value) => handleInputChange('Location', value)}
          multiple={true}
          filterOptions={(options, state) => {
            return options.filter((option) =>
              option.toLowerCase().includes(state.inputValue.toLowerCase())
            );
          }}
        />
        <Autocomplete
          className="w-1/3"
          name="DonorType"
          options={['All', 'Eligible']}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Donor Type"
              variant="outlined"
            />
          )}
          onChange={(event, value) => handleInputChange('DonorType', value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={searchUsers}
          style={{ height: '50px', width: '80px' }}
        >
          Search
        </Button>
      </div>

      {/* Preloading code */}
      {isLoading && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <ClipLoader
            color={'#d73636'}
            loading={true}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {/* Preloading code */}

      <div className=' mt-20 pl-3 pr-3'>
        <Grid container spacing={2} style={{ display: isLoading ? 'none' : 'flex' }}>
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
                      {item.Name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Blood Group: {item.BloodGroup}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Gender: {item.Gender}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Location: {item.Location}
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

export default Search_Donors;
