const express = require('express');
const app = express();
const testRouter = require('../routes/test');
const oldRouter = require('../routes/router');
const mainRouter = require('../routes/updatedRouter')

app.use('/', testRouter);
app.use('/webhook', mainRouter); // only this one is needed
app.use('/old', oldRouter )



app.listen(8080);
module.exports = app; 