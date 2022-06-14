const express = require('express');
const fs = require('fs/promises')

LAST_RESET_PATH = process.env.LAST_RESET_PATH || './last-reset.json'
let lastReset = fs.readFile(LAST_RESET_PATH).then(JSON.parse)

const router = express.Router();

router.post('/reset', (req, res) => {
    lastReset = Promise.resolve({
        time: Date.now(),
        reason: req.body.reason
    });
    // Save last reset
    lastReset.then(JSON.stringify).then((data) => {
        fs.writeFile(LAST_RESET_PATH, data);
    });
    res.sendStatus(200);
});

router.get('/lastreset', (req, res) => {
    lastReset.then((result) => {
        res.send(result);
    });
});

module.exports = router;
