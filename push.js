const push = require('web-push');
const express = require('express');
const Datastore = require('nedb');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
app.use(express.static('public'));
app.use(express.json({}));

const database = new Datastore('database.db');
database.loadDatabase();

const database2 = new Datastore('database2.db');
database2.loadDatabase();



app.get('/send', (request, response) => {
  database.find({}, (err, data) => {
    for (i=0; i < data.length; i++) {

      if (err) {
        response.end();
        return;
      }
      //console.log('het is gelukt!');
      //response.json(data[1].push);
      //console.log(data.length);
      //console.log(data.length);
      console.log(JSON.stringify(data[i].name));
      // let sub= JSON.stringify(data[i].push);
      // push.sendNotification(sub, 'test message')
      // console.log(JSON.stringify(sub));
      
    };
  });

});



app.post('/shannon', (request, response) => {
  database.find({}, (err, data) => {
  console.log('Endpoint opgeslagen');
  console.log(request.body);
  let sub= '{"endpoint":"https://fcm.googleapis.com/fcm/send/e5aE3Uc0vts:APA91bFwUJZHXo1dMsnNXghRjy2QKwNBGCXLM2XwHoLrjefLtr5FWw9vliF1vSfKVW7ttyOC5KsLxdu1SWFQ0hNro3HzQGV9ALyhQStEF93xCpcDS5K7f4vSVrGwzGHsT7QMvm6q4l2b","expirationTime":null,"keys":{"p256dh":"BJ_7KL7hriotDj09vntBwFH-TYiWC9VaOSW86vrkDgkQnGLkkNxole_V9CDFg95DjMf7dLd__UP3N78OtJ6XXeg","auth":"lXhZxZxqNpEcx0K9ifhXmw"}}';
  push.sendNotification(sub, 'test message')

 
});
}); 


  app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    //for (i=0; i < data.length; i++) {

      if (err) {
        response.end();
        return;
      }
      console.log('het is gelukt!');
      response.json('het is gelukt bro')
         
  });

});



app.post('/api', (request, response) => {
    console.log('Endpoint opgeslagen');
    database.insert(request.body);
     
}); 


    let vapidKeys = {
    publicKey: 'BOfJ7V6sB3Sm0lF5MH-wKp1RCOsz7qQPtb4Pt18PXorGELjZ5k7eDpsDyzrKTaKuPT1Xf9ZF5wwS6wHwu7vAEXw',
    privateKey: process.env.API_KEY
  }

  push.setVapidDetails('mailto:shannonpieternella@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey)

  