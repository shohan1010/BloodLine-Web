import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete'; // Add this import
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Nav_Bar from './Nav_Bar';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { FormControl } from '@mui/material';

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

const Register = () => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    location: '',
    dateOfBirth: null,
    gender: 'Male',
    password: '', // Add a password field to the form
    district: '', // Add a district field
  });

  const [formDataArray, setFormDataArray] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(null);

  // Create account with email and password
  const handleCreateEmail = () => {
    const { email, password, name, phone, district, dateOfBirth, gender, bloodGroup } = formData;

    console.log("create account");
    

    // Check if any of the required fields are empty
    if (!email || !password || !name || !phone || !district || !dateOfBirth || !gender || !bloodGroup) {
      console.error("Required fields are empty");
      return; // Stop execution if any required fields are empty
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user) {
          const setdata = doc(db, "cities", email); // Use user's UID as the document ID
          const newData = {
            name,
            email,
            phone,
            bloodGroup, // Correct the property name
            location: district,
            dateOfBirth,
            gender,
          };

          setDoc(setdata, newData)
            .then(() => {
              console.log("Account created successfully and data saved to Firestore");
              
            })
            .catch((error) => {
              console.error("Error saving data to Firestore:", error);
            });
        } else {
          console.error("Error creating Account");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };



  const handleChange = (event, newValue, field) => {
    setFormData({
      ...formData,
      [field]: newValue,
    });
  };

  const handleGenderChange = (event) => {
    setFormData({
      ...formData,
      gender: event.target.value,
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      dateOfBirth: date,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormDataArray([...formDataArray, formData]);
    // Clear the form or perform any additional actions after submission
  };

  return (
    <div>
      <Nav_Bar />
      <Container>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center" marginTop={20}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(event) => handleChange(event, event.target.value, 'name')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={formData.email}
                onChange={(event) => handleChange(event, event.target.value, 'email')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={(event) => handleChange(event, event.target.value, 'password')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(event) => handleChange(event, event.target.value, 'phone')}
                required
              />
            </Grid>
            {/* <Grid item xs={12}>
              <Autocomplete
                options={bloodGroups}
                renderInput={(params) => <TextField {...params} fullWidth label="Blood Group" />}
                value={formData.bloodGroup}
                onChange={(_, newValue) => handleChange(_, newValue, 'bloodGroup')}
                required
              />
            </Grid> */}
            <Grid item xs={12}>
            <FormControl fullWidth required>
                <Autocomplete
                  options={bloodGroups}
                  renderInput={(params) => <TextField {...params} label="Blood Group" />}
                  value={formData.bloodGroup}
                  onChange={(_, newValue) => handleChange(_, newValue, 'bloodGroup')}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                options={bangladeshDistricts}
                renderInput={(params) => <TextField {...params} fullWidth label="Location" />}
                value={formData.district}
                onChange={(_, newValue) => handleChange(_, newValue, 'district')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth label="Date of Birth" />}
                  maxDate={new Date()} // Max date is today
                  required
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <RadioGroup value={formData.gender} onChange={handleGenderChange} row>
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />


              </RadioGroup>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" onClick={handleCreateEmail}>
                Register
              </Button>

            </Grid>
          </Grid>
          
        </form>


        <div className="flex justify-end pl-4">
          <p>
            Already have an account?
            <a href="/login" className="text-black hover:text-blue-500">  Login</a>
          </p>
        </div>







      </Container>
    </div>
  );
};

export default Register;
