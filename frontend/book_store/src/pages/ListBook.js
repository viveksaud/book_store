import React, {useEffect,useState } from 'react';
import api from '../api/config.js';
import {FaTrashAlt} from 'react-icons/fa';
 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";

function ListBook() {
    const [bookList, setBookList] = useState([]);
    useEffect(()=>{
        async function getBooks(){
            const response = await api.get("/book");
            if(response.data){
                setBookList(response.data);
            }
        }
        getBooks();
    },[]);
    const deleteBook = async (id, idx )=>{
        const data = window.confirm('Do you want to Delete?'); 
     if(data){
        try{
        const response =  await api.delete(`/book/delete/${id}`);
     if(response.data.success){
        const newBookList = bookList.filter((book,index)=> index != idx)
        setBookList(newBookList);
        console.log('book is deleted');
        toast.success("book deleted");
     }
     else{console.log('unable to delete book');
    toast.error("unable to delete book");}
    }catch(err){
        console.log(err.message);
        toast.error("err.message");
    }
    }
    }
  return <center>{bookList.length > 0 ?bookList.map((book,index)=>{
    return (
      <div
        key={index}
        style={{
          boxShadow: "0px 0px 5px #ccc",
          padding: "10px",
          margin: "10px",
          width: " 45%",
          color: "green",
          textAlign: "start",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {book.name}
        <FaTrashAlt
          onClick={() => {
            deleteBook(book.id, index);
          }}
          
          style={{  cursor: "pointer" , color: 'red'}}
        />
        <ToastContainer />
      </div>
    );
        
  }):"!!!No Books Found!!!"}</center>;
}

export default ListBook;
