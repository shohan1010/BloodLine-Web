import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
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

const bangladeshDistricts = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria",
  "Chandpur", "Chapai Nawabganj", "Chattogram", "Chuadanga", "Comilla", "Cox's Bazar",
  "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj",
  "Jamalpur", "Jessore (Jashore)", "Jhalokati", "Jhenaidah", "Joypurhat", "Khagrachari",
  "Khulna", "Kishoreganj", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura",
  "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail",
  "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna",
  "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur",
  "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail",
  "Thakurgaon", "Other District"
];


const Search_Donors = () => {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    bloodGroup: '',
    district: [],
    donorType: '',
  });

  const [isHovered, setIsHovered] = useState(null);

  const handleInputChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const searchUsers = async () => {
    try {
      let q = query(collection(db, 'cities'));

      if (filters.bloodGroup) {
        q = query(q, where('bloodGroup', '==', filters.bloodGroup));
      }
      if (filters.district.length > 0) {
        q = query(q, where('Location', 'in', filters.district));
      }
      if (filters.donorType && filters.donorType !== 'All') {
        q = query(q, where('donorType', '==', filters.donorType));
      }

      const querySnapshot = await getDocs(q);

      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });

      setItems(users);
    } catch (error) {
      console.error('Error searching for users:', error);
    }
  };

  useEffect(() => {
    // Fetch initial data when the component mounts
    searchUsers();
  }, []);

  return (
    <div>
      <Nav_Bar></Nav_Bar>
      <div className="search-donors-container">
        <Autocomplete
          className="search-donors-input"
          name="bloodGroup"
          options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Blood Group"
              variant="outlined"
            />
          )}
          onChange={(event, value) => handleInputChange('bloodGroup', value)}
        />
        <Autocomplete
          className="search-donors-input"
          name="district"
          options={bangladeshDistricts}
          renderInput={(params) => (
            <TextField
              {...params}
              label="District"
              variant="outlined"
            />
          )}
          onChange={(event, value) => handleInputChange('district', value)}
          multiple={true}
          filterOptions={(options, state) => {
            return options.filter((option) =>
              option.toLowerCase().includes(state.inputValue.toLowerCase())
            );
          }}
        />
        <Autocomplete
          className="search-donors-input"
          name="donorType"
          options={['All', 'Eligible']}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Donor Type"
              variant="outlined"
            />
          )}
          onChange={(event, value) => handleInputChange('donorType', value)}
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

      <div>
        
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
