const push = require('web-push');
const express = require('express');
//const Datastore = require('nedb');
const mongoose = require('mongoose');
const cors = require('cors');
//const database = new Datastore({ filename: 'database.db', autoload: true });
const app = express();
require('dotenv').config();

app.use(express.static('public'));
app.use(express.json({}));

//Middlewares
app.use(cors());

//Import Routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);  

//connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => 
 console.log('Connected to DB')
 );

//Create payload
//const payload = JSON.stringify({ title: 'Fyxed'});


  //listen to the server  
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});

//const database = new Datastore('database.db');
//Database.loadDatabase();


    let vapidKeys = {
    publicKey: 'BOfJ7V6sB3Sm0lF5MH-wKp1RCOsz7qQPtb4Pt18PXorGELjZ5k7eDpsDyzrKTaKuPT1Xf9ZF5wwS6wHwu7vAEXw',
    privateKey: process.env.API_KEY
  }

  push.setVapidDetails('mailto:shannonpieternella@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey)