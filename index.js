// index.js
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', function (req, res) {
  const { date } = req.params;
  let timestamp;

  if (!date) {
    timestamp = new Date();
  } else if (!isNaN(date)) {
    timestamp = new Date(parseInt(date));
  } else {
    timestamp = new Date(date);
  }

  if (isNaN(timestamp)) {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({
      unix: timestamp.getTime(),
      utc: timestamp.toUTCString(),
    });
  }
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
