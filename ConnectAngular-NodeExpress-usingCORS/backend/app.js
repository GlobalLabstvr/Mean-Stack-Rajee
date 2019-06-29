const express = require('express');
const app = express();

app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
    );
  next();
});

app.use("/api/posts",(req, res, next) => {
  const posts = [
    {
      id: "1",
      title: "1st Server-Side Post",
      content: "Coming from Server"
    },
    {
      id: "2",
      title: "2nd Server-Side Post",
      content: "Coming from Server"
    },
    {
      id: "3",
      title: "3rd Server-Side Post",
      content: "Coming from Server"
    }
  ];
  res.status(200).json ({
    message: 'Posts added successfully',
    posts: posts
  });
});

module.exports = app;

