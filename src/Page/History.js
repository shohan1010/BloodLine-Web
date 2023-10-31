import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import Nav_Bar from './Nav_Bar';

const History = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const currentUserEmail = user.email;

        const userDocRef = doc(db, 'show data', currentUserEmail);
        const subcollectionRef = collection(userDocRef, 'Blood Request');
        const subcollectionQuery = query(subcollectionRef);

        try {
          const querySnapshot = await getDocs(subcollectionQuery);
          const userData = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            userData.push(data);
            console.log("data: " + data);
            console.log("userData: " + userData);
          });

          setUserEmail(currentUserEmail);
          setUserName(userData.map(item => item.name).join(', '));

        } catch (error) {
          console.error('Error getting subcollection data:', error);
        }
      } else {
        console.log('No user is currently authenticated');
      }
    });
  }, []);

  return (
    <div>
        <Nav_Bar></Nav_Bar>
      <h1>User Profile</h1>
      <p>Email: {userEmail}</p>
      <p>Name: {userName}</p>
    </div>
  );
};

export default History;
