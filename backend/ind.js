const express = require('express');
const bodyParser = require('body-parser');
const { createMeet } = require('./controllers/automeeting');

const app = express();
app.use(bodyParser.json());

app.post('/createMeet', createMeet);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
