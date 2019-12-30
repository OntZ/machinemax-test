const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/*', (req, res) => {
  request(
    { url: 'https://dummy-hacxuuktha-ew.a.run.app' + req.url.replace('/api', '') },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(response ? response.statusCode : 500).json({ type: 'error', message: error ? error.message : 'Internal Server Error' });
      }

      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));