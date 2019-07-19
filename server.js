const express = require('express')
const {muc} = require('./plugins/muc')
const app = express();

muc('./controllers/', app)

app.on('error', console.log);

//module exports for testing
module.exports = app.listen(3000);

console.log('listening port 3000');



