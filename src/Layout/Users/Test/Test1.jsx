import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./TestConsfig";
import Compressor from "compressorjs";

function Test1() {
  const [imageUpload, setImageUpload] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    
    new Compressor(selectedFile, {
      quality: 0.4, // Adjust quality as needed (0.6 is an example)
      maxWidth: 800, // Maximum width of the compressed image
      maxHeight: 600, // Maximum height of the compressed image
      success: (compressedResult) => {
        setImageUpload(compressedResult);
      },
      error: (error) => {
        console.error("Error compressing file:", error);
      },
    });
  };

  const uploadFile = () => {
    if (!imageUpload) {
      console.error("No file selected.");
      return;
    }

    const imageRef = ref(storage, `workimages/${imageUpload.name}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("File uploaded. Download URL:", url);
      }).catch((error) => {
        console.error("Error getting download URL:", error);
      });
    }).catch((error) => {
      console.error("Error uploading file:", error);
    });
  };

  return (
    <div className="App">
      <input
        type="file"
        onChange={handleFileChange}
      />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}

export default Test1;
