const push = require('web-push');
const express = require('express');
const Datastore = require('nedb');
const app = express();

app.listen(5000, () => console.log('listening at 5000'));
app.use(express.static('public'));
app.use(express.json({}));

const database = new Datastore('database.db');
database.loadDatabase();

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data[1].push);
    let sub= data[0].push;
    push.sendNotification(sub, 'test message')
  });

});

app.post('/api', (request, response) => {
  console.log('I got a request!');
  const data = request.body;    //request gegevens van post body in html index van data const
  console.log(request.body);
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json({
  status: 'success'

});
});


let vapidKeys = {
    publicKey: 'BOfJ7V6sB3Sm0lF5MH-wKp1RCOsz7qQPtb4Pt18PXorGELjZ5k7eDpsDyzrKTaKuPT1Xf9ZF5wwS6wHwu7vAEXw',
    privateKey: '3Diq6h-UkqA8UwQVJXKZrPeOSktUVL-by7WN33ySKms'
  }

  push.setVapidDetails('mailto:shannonpieternella@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey)

  //let sub= {"endpoint":"https://fcm.googleapis.com/fcm/send/e5aE3Uc0vts:APA91bFwUJZHXo1dMsnNXghRjy2QKwNBGCXLM2XwHoLrjefLtr5FWw9vliF1vSfKVW7ttyOC5KsLxdu1SWFQ0hNro3HzQGV9ALyhQStEF93xCpcDS5K7f4vSVrGwzGHsT7QMvm6q4l2b","expirationTime":null,"keys":{"p256dh":"BJ_7KL7hriotDj09vntBwFH-TYiWC9VaOSW86vrkDgkQnGLkkNxole_V9CDFg95DjMf7dLd__UP3N78OtJ6XXeg","auth":"lXhZxZxqNpEcx0K9ifhXmw"}};

  //push.sendNotification(sub, 'test message')