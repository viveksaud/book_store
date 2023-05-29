// import React, {useEffect, useState } from 'react';
// import api from '../api/config.js';



// function Home() {
//     const [bookList, setBookList] = useState([]);
//     useEffect(()=>{
//         async function fetchBooks(){
//         const response = await api.get("/book");
//         // console.log(response.data); 
//         setBookList(response.data);
//         }
//         fetchBooks();
//     },[]);
//   return (
//     <div style={{ display: "flex", flexWrap: "wrap", flexShrink: '0'}}>
//       {bookList.map((book, index) => {
//         return (
//           <div
//             key={index}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               padding: "20px",
//               boxShadow: "0px 0px 5px #ccc",
//               marginLeft: "20px",
//               height: "300px",
//             }}
//           >
//             <img
//               src={book.image}
//               alt={`bookImage${index}`}
//               style={{ height: "200px", width: "200px", objectFit: "contain" }}
//             />
//             <br />
//             <h2>{book.name}</h2>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default Home

import React, { useEffect, useState } from "react";
import api from "../api/config.js";
import { useNavigate } from "react-router-dom";

function Home() {
  const [bookList, setBookList] = useState([]);
  const [tempBook, setTempBook] = useState([]);
  const [searchText, setSearchText] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      const response = await api.get("/book");
      setBookList(response.data); 
      setTempBook(response.data);
    }
    fetchBooks();
  }, []);

  useEffect(()=>{
    async function searchBook(){
      const response = await api.get(`/book/search/all?q=${searchText}`);
      if(response.data){
      // console.log(response.data);
      setBookList(response.data);
      
      }
    }
    if(searchText) searchBook();
    else setBookList(tempBook);
  },[searchText]);

  return (
    <>
      <center style={{ background: "#ffffff", margin: "0" }}>
        <input
          type="text"
          placeholder="Search Books...."
          style={{
            width: "40%",
            margin: "20px",
            padding: "10px",
            // background:"#ffffff",
          }}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </center>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          cursor: "pointer",
          // backgroundColor: "#f9f9f9", // Replace with your desired background color
          minHeight: "100vh", // Ensures the div takes up the full height of the viewport
          // padding: "20px",
          // marginTop: "20px",

          // background: "linear-gradient(135deg, #7C3AED, #41C7C7)",
          background: "linear-gradient(to bottom, #FFFFFF, #F9F9F9)",
        }}
      >
        {bookList.map((book, index) => (
          <div
            onClick={() =>
              navigate("/explores", {
                state: {
                  book,
                },
              })
            }
            key={index}
            style={{
              width: "200px",
              height: "300px",
              margin: "20px",
              padding: "20px",
              boxShadow: "0px 0px 5px #ccc",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // backgroundColor: "#f2f2f2",
              borderRadius: "10px",
              // background: `linear-gradient(135deg, ${book.gradientColor1}, ${book.gradientColor2})`,
            }}
          >
            <img
              src={book.image}
              alt={`bookImage${index}`}
              style={{
                height: "200px",
                width: "100%",
                objectFit: "contain",
              }}
            />
            <h2
              style={{
                marginTop: "10px",
                textAlign: "center",
                color: "#333",
              }}
            >
              {book.name}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
