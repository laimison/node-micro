const express = require('express');
const path    = require("path");
const geoip = require('geoip-lite');
const Loadmill = require('express-loadmill');

const app = express();
app.use(Loadmill({verifyToken: process.env.LOADMILL_VERIFY_TOKEN}));

app.get('/location', (req, res) => {
    try {

        let ip = req.headers['x-forwarded-for'] || "";
        ip = ip.split(",")[0];

        const location = geoip.lookup(ip);
        console.log("Location is ", location);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(location));

    } catch (e) {
        console.log("error: ", e);
        res.status(500).end();
    }
});

app.get('/',  (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(80, () => console.log('Example app listening on port 80!'));