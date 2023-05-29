 // import express from 'express';
  const express = require('express');
  const bookRoute =  require('./bookRoute');
  const connection = require('./modals/index.js');
  require("dotenv/config");
  const  cors  = require("cors");

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(express.static('public'));

  app.get('/',(req,res)=>{
    res.send('Server has started!');
  });

  app.use('/book',bookRoute);

  app.listen(process.env.PORT || 9000,async ()=>{
    console.log('Server has started at port 9000!');

    try{
      await connection.authenticate();
      connection.sync();
      console.log("Successfully connected to database!!!");
    }catch(err){
      console.log("Error during connection to database:",err);
    }
  });