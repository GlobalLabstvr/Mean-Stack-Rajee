const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mangoose = require('mongoose');

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

app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
    );
  next();
});

app.post("/api/posts",(req, res, next) => {
  const post = new Post ({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json ({
    message: 'Posts Added Successfully'
  });
});

app.get("/api/posts",(req, res, next) => {
  Post.find().then( documents => {
    res.status(200).json ({
      message: 'Posts added successfully',
      posts: documents
    });
  });
});

module.exports = app;
