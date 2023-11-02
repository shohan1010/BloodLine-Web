import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Button, Avatar } from '@mui/material';
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
    <div className=''>
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

      <div className=' mt-20 pl-10 pr-10'>
        <Grid container spacing={2} style={{ display: isLoading ? 'none' : 'flex' }}>
          {items.map((item, index) => (
            <Grow in={true} key={index} timeout={500}>


<Grid item xs={12} sm={6} md={4} lg={3}>
  <Card
    onMouseEnter={() => setIsHovered(index)}
    onMouseLeave={() => setIsHovered(null)}
    variant="elevation" // Change to "outlined" for a softer look
    elevation={isHovered === index ? 8 : 2}
    style={{
      backgroundColor: isHovered === index ? '#f0f0f0' : 'white',
      transition: 'background-color 0.3s',
      borderRadius: '12px',
      overflow: 'hidden',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Add box shadow for depth
    }}
  >
    <div
      style={{
        background: `url(${item.ProfileImage || (item.Gender === 'Male' ? 'https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small/default-avatar-photo-placeholder-profile-picture-vector.jpg' : 'https://cdn4.vectorstock.com/i/1000x1000/14/18/default-female-avatar-profile-picture-icon-grey-vector-34511418.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '200px', // Adjust the width and height for a full round look
        height: '200px',
        borderRadius: '50%', // Make the image round
        border: '2px solid #fff', // Add a border for a cleaner look
      }}
    ></div>
    <div style={{ padding: '20px' }}>
      <Typography
        variant="h5"
        color="primary"
        style={{ textAlign: 'center', fontSize: '1.5rem' }}
      >
        {item.Name}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ textAlign: 'center', fontSize: '1.2rem' }}
      >
        Gender: {item.Gender}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ textAlign: 'center', fontSize: '1.2rem' }}
      >
        Location: {item.Location}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ textAlign: 'center', fontSize: '1.2rem' }}
      >
        Phone: {item.Phone}
      </Typography>
      <Typography
        variant="h6"
        color="secondary"
        style={{ textAlign: 'center', fontSize: '1.5rem', margin: '10px' }}
      >
        {item.BloodGroup}
      </Typography>
    </div>
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