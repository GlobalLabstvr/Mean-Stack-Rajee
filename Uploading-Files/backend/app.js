const express = require('express');
const bodyParser = require('body-parser');
const mangoose = require('mongoose');
const path = require('path');
const postsRoutes = require('./routes/posts');


const app = express();

mangoose.connect("mongodb://localhost:27017/angulardb")
.then(() => {
  console.log("Connected to Db");
})
.catch(() => {
  console.log('Connection Failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
    );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
