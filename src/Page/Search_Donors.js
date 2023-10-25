import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import Nav_Bar from './Nav_Bar';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

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

const Search_Donors = ({ filters, onFilterChange, onSearch }) => {
  const handleInputChange = (name, value) => {
    console.log(`Setting ${name} to:`, value);
    // onFilterChange(name, value);
  };

  const handleSearchClick = async () => {
    try {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);

      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        const firstName = userData.firstName;
        const secondName = userData.secondName;
        const lastName = userData.lastName;

        console.log(`First Name: ${firstName}, Second Name: ${secondName}, Last Name: ${lastName}`);
        console.log(doc.id, ' => ', userData);
      });

      console.log('Search worked!');
      // onSearch();
    } catch (error) {
      console.error('Error searching for donors:', error);
    }
  };

  return (
    <div>
      <Nav_Bar />
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
          multiple={true}  // Allow multiple selections
          filterOptions={(options, state) => {
            // Filter options based on the user's input
            return options.filter((option) =>
              option.toLowerCase().includes(state.inputValue.toLowerCase())
            );
          }}
        />

        <Autocomplete
          className="search-donors-input"
          name="donorType"
          options={["All", "Eligible"]}
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
          onClick={handleSearchClick}
          style={{ height: '50px', width: '80px' }}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search_Donors;
