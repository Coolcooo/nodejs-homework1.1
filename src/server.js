const path = require('path');
const express = require('express');
const mainRouter = require('./routers');

const app = express();

app.use('/', mainRouter);
app.listen(8080,'127.0.0.1', () => {
    console.log('Server started on port 8080');
});

