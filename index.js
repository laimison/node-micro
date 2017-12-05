const express = require('express');
const geoip = require('geoip-lite');
const Loadmill = require('express-loadmill');

const app = express();
app.use(Loadmill({verifyToken: process.env.LOADMILL_VERIFY_TOKEN}));

app.get('/', (req, res) => {
    try {

        const ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        console.log("IP is ",ip);
        const location = geoip.lookup(ip);
        console.log("Location is ", location.ll);

        res.send(location);
    } catch (e) {
        res.status(500).end();
    }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));