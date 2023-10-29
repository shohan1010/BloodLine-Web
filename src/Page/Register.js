import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Nav_Bar from './Nav_Bar';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';
import { FormControl, Typography } from '@mui/material';
import { ClipLoader } from 'react-spinners';
import { red } from '@mui/material/colors';

const BloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

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
    Name: '',
    Email: '',
    Phone: '',
    BloodGroup: '',
    Location: '',
    DateOfBirth: null,
    Gender: 'Male',
    password: '',
    district: '',
    DonorType: 'Not Eligible'
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateEmail = async () => {
    setError(null);
    setIsLoading(true);

    const { Email, password, Name, Phone, district, DateOfBirth, Gender, BloodGroup,DonorType } = formData;

    if (!Email || !password || !Name || !Phone || !district || !DateOfBirth || !Gender || !BloodGroup || !DonorType) {
      setError("Required fields are empty");
      setIsLoading(false);
      return;
    }

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, Email);

      // if the location of the user already exists
      if (signInMethods && signInMethods.length > 0) {
        setError("Email address is already in use");
        setIsLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, Email, password);
      const user = userCredential.user;
      const AccountCreate = new Date();

      if (user) {
        const setdata = doc(db, "cities", Email);
        const newData = {
          Name,
          Email,
          Phone,
          BloodGroup,
          Location: district,
          DateOfBirth,
          Gender,
          DonorType,
          AccountCreate
        };

        await setDoc(setdata, newData);
        console.log("Account created successfully, and data saved to Firestore");
        window.location.href = "/login";
      } else {
        setError("Error creating Account");
        setIsLoading(false);
      }
    } catch (err) {
      const errorMessage = err.message;
      setError(errorMessage);
      setIsLoading(false);
    }
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
      Gender: event.target.value,
    });
  };
  const handleEligibleChange = (event) => {
    setFormData({
      ...formData,
      DonorType: event.target.value,
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      DateOfBirth: date,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add additional form submission logic here
  };

  return (
    <div>
      <Nav_Bar />

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
      
      <Container maxWidth="xs" style={{ marginRight: '10%',display: isLoading ? 'none' : 'block' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center" marginTop={15}>
            {error && (
              <Typography variant="body1" color="error" marginLeft={10}>
                {error}
              </Typography>
            )}
            {!isLoading && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={formData.Name}
                    onChange={(event) => handleChange(event, event.target.value, 'Name')}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={formData.Email}
                    onChange={(event) => handleChange(event, event.target.value, 'Email')}
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
                    value={formData.Phone}
                    onChange={(event) => handleChange(event, event.target.value, 'Phone')}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <Autocomplete
                      options={BloodGroups}
                      renderInput={(params) => <TextField {...params} label="Blood Group" />}
                      value={formData.BloodGroup}
                      onChange={(_, newValue) => handleChange(_, newValue, 'BloodGroup')}
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
                      maxDate={new Date()}
                      required
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <RadioGroup value={formData.Gender} onChange={handleGenderChange} row>
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                  <h2 className=' mb-1'>Are You Eligible For Donate Blood?</h2>
                  <RadioGroup value={formData.DonorType} onChange={handleEligibleChange} row>
                    <FormControlLabel value="Eligible" control={<Radio />} label="Yes" />
                    <FormControlLabel value="Not Eligible" control={<Radio />} label="No" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                  <Button type="button" variant="contained" color="primary" onClick={handleCreateEmail} style={
                  {backgroundColor: 'primary',
                  color: 'white',
                  fontSize: '15px',
                  padding: '15px 30px'}}>
                    Register
                  </Button>
                </Grid>
              </>
            )}
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