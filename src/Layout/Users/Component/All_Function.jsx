import Compressor from "compressorjs";


export const compressImage = (file,setImageUpload) => {
    let quality = 0.6; // Starting quality value
    

    const compressRepeatedly = () => {
      new Compressor(file, {
        quality,
        maxWidth: 800, // Maximum width of the compressed image
        maxHeight: 600, // Maximum height of the compressed image
        success: (compressedResult) => {
          const imageSizeInKB = compressedResult.size / 1024; // Convert size to kilobytes
          console.log("Compressed Image Size:", imageSizeInKB.toFixed(2), "KB"); // Log compressed image size in KB
          setImageUpload(compressedResult);
        },
        error: (error) => {
          console.error("Error compressing file:", error);
        },
      });
    };

    compressRepeatedly();
  };