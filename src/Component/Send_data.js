import React from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, setDoc, doc, writeBatch, commit } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const data = [
    {
        "Name": "Shohan Rahman",
        "Email": "shohanrahman@gmail.com",
        "Phone": "01712345678",
        "BloodGroup": "A+",
        "Gender": "Male",
        "DonorType": "Eligible",
        "DateOfBirth": "June 15, 1995 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Dhaka"
    },
    {
        "Name": "Farzana Akter",
        "Email": "farzanaakter@gmail.com",
        "Phone": "01823456789",
        "BloodGroup": "B-",
        "Gender": "Female",
        "DonorType": "Not Eligible",
        "DateOfBirth": "March 8, 1989 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Chattogram"
    },
    {
        "Name": "Imran Khan",
        "Email": "imrankhan@gmail.com",
        "Phone": "01934567890",
        "BloodGroup": "O+",
        "Gender": "Male",
        "DonorType": "Eligible",
        "DateOfBirth": "December 10, 1980 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Khulna"
    },
    {
        "Name": "Taslima Begum",
        "Email": "taslimabegum@gmail.com",
        "Phone": "01745678901",
        "BloodGroup": "AB-",
        "Gender": "Female",
        "DonorType": "Not Eligible",
        "DateOfBirth": "September 5, 1992 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Mymensingh"
    },
    {
        "Name": "Rahat Ali",
        "Email": "rahatali@gmail.com",
        "Phone": "01856789012",
        "BloodGroup": "A+",
        "Gender": "Male",
        "DonorType": "Eligible",
        "DateOfBirth": "July 20, 1987 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Sylhet"
    },
    {
        "Name": "Nusrat Jahan",
        "Email": "nusratjahan@gmail.com",
        "Phone": "01967890123",
        "BloodGroup": "B+",
        "Gender": "Female",
        "DonorType": "Not Eligible",
        "DateOfBirth": "May 3, 1976 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Rajshahi"
    },
    {
        "Name": "Mehedi Hasan",
        "Email": "mehedihasan@gmail.com",
        "Phone": "01778901234",
        "BloodGroup": "O-",
        "Gender": "Male",
        "DonorType": "Eligible",
        "DateOfBirth": "October 15, 1982 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Barishal"
    },
    {
        "Name": "Nadia Akhter",
        "Email": "nadiaakhter@gmail.com",
        "Phone": "01890123456",
        "BloodGroup": "A-",
        "Gender": "Female",
        "DonorType": "Not Eligible",
        "DateOfBirth": "April 30, 1996 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Tangail"
    },
    {
        "Name": "Anisur Rahman",
        "Email": "anisurrahman@gmail.com",
        "Phone": "01901234567",
        "BloodGroup": "AB+",
        "Gender": "Male",
        "DonorType": "Eligible",
        "DateOfBirth": "February 21, 1991 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Comilla"
      
    },
    {
        "Name": "Laila Islam",
        "Email": "lailaislam@gmail.com",
        "Phone": "01712345678",
        "BloodGroup": "O+",
        "Gender": "Female",
        "DonorType": "Not Eligible",
        "DateOfBirth": "November 8, 1993 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Bagerhat"
    },
    {
        "Name": "Rafiqul Haque",
        "Email": "rafiqulhaque@gmail.com",
        "Phone": "01823456789",
        "BloodGroup": "B-",
        "Gender": "Male",
        "DonorType": "Eligible",
        "DateOfBirth": "August 12, 1979 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Bandarban"
    },
    {
        "Name": "Fatima Sultana",
        "Email": "fatimasultana@gmail.com",
        "Phone": "01934567890",
        "BloodGroup": "A+",
        "Gender": "Female",
        "DonorType": "Not Eligible",
        "DateOfBirth": "December 25, 1984 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Barguna"
    },
    {
        "Name": "Jamilur Rahman",
        "Email": "jamilurrahman@gmail.com",
        "Phone": "01745678901",
        "BloodGroup": "O-",
        "Gender": "Male",
        "DonorType": "Eligible",
        "DateOfBirth": "March 15, 1998 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Barisal"
    },
    {
        "Name": "Sharmin Akter",
        "Email": "sharmin.akter@gmail.com",
        "Phone": "01856789012",
        "BloodGroup": "B+",
        "Gender": "Female",
        "DonorType": "Not Eligible",
        "DateOfBirth": "July 5, 1975 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Bhola"
    },
    {
        "Name": "Sakib Ahmed",
        "Email": "sakibahmed@gmail.com",
        "Phone": "01967890123",
        "BloodGroup": "A+",
        "Gender": "Male",
        "DonorType": "Eligible",
        "DateOfBirth": "October 30, 1970 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Bogura"
      
    },
    {
        "Name": "Moushumi Rahman",
        "Email": "moushumirahman@gmail.com",
        "Phone": "01778901234",
        "BloodGroup": "AB-",
        "Gender": "Female",
        "DonorType": "Not Eligible",
        "DateOfBirth": "April 5, 1990 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Brahmanbaria"
    },
    {
        "Name": "Monirul Islam",
        "Email": "monirulislam@gmail.com",
        "Phone": "01890123456",
        "BloodGroup": "O+",
        "Gender": "Male",
        "DonorType": "Not Eligible",
        "DateOfBirth": "May 25, 1978 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Chandpur"
    },
    {
        "Name": "Farida Yasmin",
        "Email": "faridayasmin@gmail.com",
        "Phone": "01901234567",
        "BloodGroup": "B-",
        "Gender": "Female",
        "DonorType": "Not Eligible",
        "DateOfBirth": "September 10, 1997 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Chapai Nawabganj"
    },
    {
        "Name": "Aminul Haque",
        "Email": "aminulhaque@gmail.com",
        "Phone": "01712345678",
        "BloodGroup": "A-",
        "Gender": "Male",
        "DonorType": "Eligible",
        "DateOfBirth": "February 3, 1983 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Chattogram"
    },
    {
        "Name": "Sadia Akhter",
        "Email": "sadiaakhter@gmail.com",
        "Phone": "01823456789",
        "BloodGroup": "AB+",
        "Gender": "Female",
        "DonorType": "Eligible",
        "DateOfBirth": "June 5, 1986 at 12:00:00 AM UTC+6",
        "AccountCreate": "October 30, 2023 at 6:27:30 AM UTC+6",
        "Location": "Chuadanga"
    }
]


const addDataToFirestore = async (data) => {
    for (const item of data) {
      const email = item.Email;
      console.log(email)
      const docRef = doc(db, 'User_Info', email); // Replace 'yourCollectionName' with the name of your Firestore collection.
  
      try {
        await setDoc(docRef, item); // Use setDoc to add or update the document with the email as the ID.
        console.log(`Data for ${email} added to Firestore successfully.`);
      } catch (error) {
        console.error(`Error adding data for ${email} to Firestore:`, error);
      }
    }
  };

function App() {
  const handleAddDataClick = () => {
    addDataToFirestore(data);
  };

  return (
    <div className="App">
      <h1>Adding Data to Firestore</h1>
      <button onClick={handleAddDataClick}>Add Data</button>
    </div>
  );
}

export default App;
