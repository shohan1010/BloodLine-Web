import React, { useEffect, useState } from 'react';
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
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { FormControl, Typography } from '@mui/material';
import { ClipLoader } from 'react-spinners';
import { red } from '@mui/material/colors';
import firebaseConfig from '../../Component/firebaseConfig';
import Nav_Bar from '../Welcome/Nav_Bar';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import Compressor from "compressorjs";
import { compressImage } from './Component/All_Function';
import { bangladeshDistricts,BloodGroups } from './Component/Data_query';
import { male_image,female_image } from './Component/Data_query';






const Profile = () => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    BloodGroup: '',
    Location: '',
    DateOfBirth: null,
    Gender: '',
    password: '',
    Location: '',
    DonorType: ''
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);


  const handleUpdate = async () => {
    setError(null);
    // setIsLoading(true);

    const { Email, password, Name, Phone, Location, DateOfBirth, Gender, BloodGroup, DonorType } = formData;




    const AccountCreate = new Date();


    const updatedata = doc(db, "User_Info", Email);
    const newData = {
      Name,
      Email,
      Phone,
      BloodGroup,
      Location,
      DateOfBirth,
      Gender,
      DonorType,
      ProfileImage: Gender === "Male" ? male_image : female_image,
      AccountCreate
    };
    // send data to the firebase

    
    if (imageUpload) {
      const storageRef = ref(storage, `profileImages/${Email}/profile.png`);
      await uploadBytes(storageRef, imageUpload).then(async (snapshot) => {
        const imageUrl = await getDownloadURL(snapshot.ref);
        newData.ProfileImage = imageUrl; // Update user data with the image URL
      }).catch((error) => {
        console.error('Error uploading image:', error);
      });
    }

    await updateDoc(updatedata, newData);
    console.log("successfully update data saved to Firestore");
    window.location.href = "/";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        // setImageUpload(file);
        compressImage(file,setImageUpload)

      };
      reader.readAsDataURL(file);
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

  };

  useEffect(() => {
    setIsLoading(true);
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, 'User_Info', user.email);
          const docSnap = await getDoc(userRef);
          
            const userData = docSnap.data();
            setFormData((prevData) => ({
              ...prevData,
              Name: userData.Name || 'N/A',
              Email: userData.Email || 'N/A',
              Phone: userData.Phone || 'N/A',
              BloodGroup: userData.BloodGroup || 'N/A',
              Location: userData.Location || 'N/A',
              DateOfBirth: userData.DateOfBirth || null,
              Gender: userData.Gender || 'N/A',
              DonorType: userData.DonorType || 'N/A'
            }));
            setSelectedDate(userData.DateOfBirth || null);
            setIsLoading(false);
          }
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [auth, db]);

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

        
        <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>




 
        <div style={{ width: '30%', marginRight: '20px' }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="profilePicInput"
      />
      <label htmlFor="profilePicInput" style={{ cursor: 'pointer' }}>
        Choose Image
      </label>
      {image && (
        <div style={{ marginTop: '10px' }}>
          <img src={image} alt="Profile" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
    </div>




  {/* Form Section */}
  <div style={{ width: '65%' }}>
    <form onSubmit={handleSubmit}>
    <Grid container spacing={2} justifyContent={"center"} marginTop={15}>
            {error && (
              <Typography variant="body1" color="error" >
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
                        value={formData.Location}
                        onChange={(_, newValue) => handleChange(_, newValue, 'Location')}
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
                    {/* <Grid item xs={12}>
                  <h2 className=' mb-1'>Are You Eligible For Donate Blood?</h2>
                  <RadioGroup value={formData.DonorType} onChange={handleEligibleChange} row>
                    <FormControlLabel value="Eligible" control={<Radio />} label="Yes" />
                    <FormControlLabel value="Not Eligible" control={<Radio />} label="No" />
                  </RadioGroup>
                </Grid> */}
                    <Grid item xs={12}>
                      <Button type="button" variant="contained" color="primary" onClick={handleUpdate} style={
                        {
                          backgroundColor: 'primary',
                          color: 'white',
                          fontSize: '15px',
                          marginTop: '100px',
                          padding: '15px 30px'
                        }}>
                        Update
                      </Button>
                    </Grid>
                  
                  

              </>

            )}

          </Grid>
    </form>
  </div>
</Container>


    </div>
  );
};

export default Profile;