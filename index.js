const express = require('express');
const geoip = require('geoip-lite');
const Loadmill = require('express-loadmill');

const app = express();
app.use(Loadmill({verifyToken: process.env.LOADMILL_VERIFY_TOKEN}));

app.get('/', (req, res) => {
    try {

        let ip = req.headers['x-forwarded-for'] || "";
        ip = ip.split(",")[0];
        console.log("IP is ",geoip.pretty(ip));

        const location = geoip.lookup(ip);
        console.log("Location is ", location);
        res.send(location);

    } catch (e) {
        console.log("error: ", e);
        res.status(500).end();
    }
});

app.listen(80, () => console.log('Example app listening on port 80!'));