const updateFirestoreData = async (formData) => {
    try {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
  
      // Define the main collection reference
      const mainCollectionRef = collection(db, 'Your_Main_Collection_Name'); // Replace 'Your_Main_Collection_Name' with the desired main collection name
  
      // Define the document reference in the main collection
      const mainDocRef = doc(mainCollectionRef, formData.Email); // You can use a unique identifier for the document here
  
      // Define a subcollection reference within the main document
      const subcollectionRef = collection(mainDocRef, 'Your_Subcollection_Name'); // Replace 'Your_Subcollection_Name' with the desired subcollection name
  
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
  