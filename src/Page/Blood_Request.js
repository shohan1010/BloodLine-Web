import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import Nav_Bar from './Nav_Bar';
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

const updateFirestoreData = async (formData) => {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Define the main collection reference
    const mainCollectionRef = collection(db, 'show data'); // Replace 'Your_Main_Collection_Name' with the desired main collection name

    // Define the document reference in the main collection
    const mainDocRef = doc(mainCollectionRef, formData.Email); // You can use a unique identifier for the document here

    // Define a subcollection reference within the main document
    const subcollectionRef = collection(mainDocRef, 'Blood Request'); // Replace 'Your_Subcollection_Name' with the desired subcollection name

    // Create a new document in the subcollection with data
    const subDocRef = doc(subcollectionRef); // Firestore will generate a unique document ID for the subcollection document

    await setDoc(subDocRef, {
      Name: formData.Name,
      Email: formData.Email,
      Phone: formData.Phone,
      BloodGroup: formData.BloodGroup,
      Location: formData.Location,
      Gender: formData.Gender,
    });

    console.log('Firestore data updated successfully');
    // Use window.location.href with a lowercase 'L' to change the page location
    window.location.href = "/";
  } catch (e) {
    console.error('Error updating Firestore data:', e);
  }
};


const Blood_Request = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    BloodGroup: '',
    Location: '',
    dateOfBirth: null,
    Gender: 'Male',
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await updateFirestoreData(formData);
    } catch (e) {
      setError('Error updating Firestore data: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav_Bar></Nav_Bar>

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
     ) }

      <Container maxWidth="xs" style={{ marginRight: '10%', display: isLoading ? 'none' : 'block' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center" marginTop={15}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="Name" 
                value={formData.Name}
                onChange={(e) => handleChange(e, e.target.value, 'Name')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="Email" 
                type="email"
                value={formData.Email}
                onChange={(e) => handleChange(e, e.target.value, 'Email')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="Phone" 
                type="tel"
                value={formData.Phone}
                onChange={(e) => {
                  const newValue = e.target.value.slice(0, 11);
                  handleChange(e, newValue, 'Phone');
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={bloodGroups}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Blood Group" name="BloodGroup" />
                )}
                value={formData.BloodGroup}
                onChange={(_, newValue) => handleChange(_, newValue, 'BloodGroup')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={bangladeshDistricts}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Location" name="Location" />
                )}
                value={formData.Location}
                onChange={(_, newValue) => handleChange(_, newValue, 'Location')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                aria-label="Gender"
                name="Gender"
                value={formData.Gender}
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
