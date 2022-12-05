import { useState } from "react";
import axios from "axios";

const CloudinaryUpload = () => {
  const [imageSelected, setImageSelected] = useState("");

  const uploadImage = async files => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "guu5ztwg");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dilgi4bff/image/upload",
      formData
    );
    //const data = await response.json();

    console.log(response);
  };

  return (
    <div>
      <input
        type="file"
        onChange={event => {
          setImageSelected(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload</button>
    </div>
  );
};

export default CloudinaryUpload;
