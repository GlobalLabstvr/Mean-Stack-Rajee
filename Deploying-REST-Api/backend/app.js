const express = require('express');
const bodyParser = require('body-parser');
const mangoose = require('mongoose');
const path = require('path');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');



const app = express();

mangoose.connect("mongodb+srv://new-user_2:" +
  process.env.MONGO_ATLAS_PW +
    "@cluster0-okjyw.mongodb.net/mean_db")
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
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
    );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
