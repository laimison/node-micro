const express = require('express');
var Loadmill = require('express-loadmill');

const app = express();
app.use(Loadmill({verifyToken: process.env.LOADMILL_VERIFY_TOKEN}));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));