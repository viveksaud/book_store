import React from 'react';
import { useLocation } from 'react-router-dom';

const Explore = () => {
    const book = useLocation().state.book;
  return (
    <>
      <div
        style={{
          width: "200px",
          height: "300px",
          margin: "20px",
          padding: "20px",
          boxShadow: "0px 0px 5px #ccc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: "#f2f2f2",
          borderRadius: "10px",
          // background: `linear-gradient(135deg, ${book.gradientColor1}, ${book.gradientColor2})`,
        }}
      >
        <img
          src={book.image}
          alt={`bookImage`}
          style={{
            height: "200px",
            width: "100%",
            objectFit: "contain",
          }}
        />
      </div>
      <div
        style={{
          width: "200px",
          height: "300px",
          margin: "20px",
          padding: "20px",
          boxShadow: "0px 0px 5px #ccc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: "#f2f2f2",
          borderRadius: "10px",
          // background: `linear-gradient(135deg, ${book.gradientColor1}, ${book.gradientColor2})`,
        }}
      >
        <small
          style={{
            marginTop: "10px",
            textAlign: "center",
            color: "green",
          }}
        >
          {book.name}
        </small>
        <br />
        <br />
        <b>Author:</b>
        <small
          style={{
            marginTop: "10px",
            textAlign: "center",
            color: "green",
          }}
        >
          {book.author}
        </small>
        <br />
        <br />
        <b>Description:</b>
        <small
          style={{
            marginTop: "10px",
            textAlign: "center",
            color: "green",
          }}
        >
          {book.description}
        </small>
      </div>
    </>
  );
}

export default Explore