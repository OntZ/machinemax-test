const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/machines', (req, res) => {
  console.log('reqsadf')
  request(
    { url: 'https://dummy-hacxuuktha-ew.a.run.app/machines' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        // return res.status(response.statusCode).json({ type: 'error', message: err.message });
        return console.log(error);
      }

      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));