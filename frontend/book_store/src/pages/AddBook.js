// import React,{useState} from 'react'
// import '../assets/sass/form.scss';
// import api from "../api/config.js"; 


// function AddBook() {
//     const [formData, setFormData] = useState({});
//     const [imageData, setImageData] = useState();
//     const handleChange = (e) => {
//         console.log(e.target.value);
//         setFormData({...formData, [e.target.name]: e.target.value});
//     };
//     const addBook = async (e) =>{
//         e.preventDefault();
//         const response = await api.post("/book/add", {
//             ...formData,
//             image: imageData,
//         },
//         {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             }
//         }
//         );
//         console.log(response);
//     }
//   return (
//     <div style={{ display: "flex", justifyContent: "center", padding: "60px" }}>
//       <form 
//         style={{ display: "flex", flexDirection: "column" }}

//         onSubmit={addBook}

//       >
//         Name:
//         <input type="text" name="name" onChange={handleChange} />
//         Author:
//         <input type="text" name="author" onChange={handleChange} />
//         Genre:
//         <input type="text" name="genre" onChange={handleChange} />
//         Description:
//         <textarea
//           name="description"
//           rows="10"
//           onChange={handleChange}
//         ></textarea>
//         <input
//           type="file"
//           name="image"
//           onChange={(e) => setImageData(e.target.files[0])}
//         />
//         <input type="submit" value="submit" style={{}} onClick={() => {}} />
//       </form>
//     </div>
//   );
// }

// export default AddBook;

import React, { useState } from "react";
import "../assets/sass/form.scss";
import api from "../api/config.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddBook() {
  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const addBook = async (e) => {
    e.preventDefault();
    try{
     const response = await api.post(
      "/book/add",
      { ...formData, image: imageData },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log(response);
    if(response.data.id){
      // console.log(response);
      // console.log('success');
      toast.success("New Book is added successfully!!!");
      e.target.reset();//clears the form input field
      setFormData({});// clears the form data
      setImageData();// 
    }else{
      console.log(response.data.message);
      toast.error(response.data.message);
    }
    }catch(err){
     
      toast.error(err.message);
    }
  };

  return (
    <div className="form-container">
      <form className="add-book-form" onSubmit={addBook}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <input type="text" id="genre" name="genre" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>

        {/* <div className="form-group"> */}
        {/* <label htmlFor="image">Image: </label> */}
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => setImageData(e.target.files[0])}
          style={{ display: "inline-block" }}
        />
        {/* </div> */}

        <input
          type="submit"
          value="Submit"
          className="submit-button"
          onClick={() => {}}
        />
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddBook;
