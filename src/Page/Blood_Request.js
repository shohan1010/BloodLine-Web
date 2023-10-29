import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import Nav_Bar from './Nav_Bar';
import { Typography } from '@mui/material';
import { ClipLoader } from 'react-spinners';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
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

// Function to update data in Firebase Firestore
const updateFirestoreData = async (formData) => {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const docRef = doc(db, 'User_Info', formData.email);

    // Set the document with the user's data, creating it if it doesn't exist
    await setDoc(docRef, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      bloodGroup: formData.bloodGroup,
      location: formData.location,
      gender: formData.gender,
    }, { merge: true });

    console.log('Firestore data updated successfully');
    window.location.href = "/";
  } catch (e) {
    console.error('Error updating Firestore data:', e);
  }
};

const Blood_Request = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false); // State for the loading indicator

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    location: '',
    dateOfBirth: null,
    gender: 'Male'
  });

  // Define handleChange function to handle form field changes
  const handleChange = (event, newValue, field) => {
    setFormData({
      ...formData,
      [field]: newValue,
    });
  };

  // Define handleGenderChange function to handle gender changes
  const handleGenderChange = (event) => {
    setFormData({
      ...formData,
      gender: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true); // Show loading indicator while submitting

      // Update data in Firestore
      await updateFirestoreData(formData);
    } catch (e) {
      setError('Error updating Firestore data: ' + e.message);
    } finally {
      setLoading(false); // Hide loading indicator when done
    }
  };

  return (
    <div>
      <Nav_Bar></Nav_Bar>

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


<Container maxWidth="xs" style={{ marginRight: '10%',display: isLoading ? 'none' : 'block' }}>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center" marginTop={15}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange(e, e.target.value, 'name')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange(e, e.target.value, 'email')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  const newValue = e.target.value.slice(0, 11);
                  handleChange(e, newValue, 'phone');
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={bloodGroups}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Blood Group" name="bloodGroup" />
                )}
                value={formData.bloodGroup}
                onChange={(_, newValue) => handleChange(_, newValue, 'bloodGroup')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={bangladeshDistricts}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Location" name="location" />
                )}
                value={formData.location}
                onChange={(_, newValue) => handleChange(_, newValue, 'location')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={formData.gender}
                onChange={handleGenderChange} 
              >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: 'primary',
                  color: 'white',
                  fontSize: '15px',
                  padding: '15px 30px'
                }}
              >
                Request
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Blood_Request;
