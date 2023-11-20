import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./TestConsfig";
import Compressor from "compressorjs";
import { compressImage } from "../Component/All_Function";

function Test1() {
  const [imageUpload, setImageUpload] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    compressImage(selectedFile,setImageUpload);
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
        accept="image/*"
        onChange={handleFileChange}
      />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}

export default Test1;
