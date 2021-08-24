const express = require('express');
const mongoose = require('mongoose');
const Router = require('./routes');

const app = express();
app.use(express.json());


// // READ FROM CONFIG FILE .env
// const dotenv = require('dotenv');
// dotenv.config();

const username='MY USERNAME';
const password='MY PASSWORD';

mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.zxtq1.mongodb.net/movie_seats?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);



//To make sure your connection was successful
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function(){
    console.log("Connected successfully");
});


app.use(Router);

app.listen(5000, () => {
    console.log("Server is running at port 5000")
});