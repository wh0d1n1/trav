require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./server/_middleware/error-handler');
const pino = require('express-pino-logger')();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));


app.use(cors());
app.use(pino);

//app.options('/getTexts', cors());

// ----------------------------------------SMS---------------------------------------- //

app.use('/server/sms', require('./server/sms/sms'));

// ----------------------------------------SMS---------------------------------------- //

// api routes
app.use('/accounts', require('./server/accounts/accounts.controller'));

// swagger docs route
app.use('/api-docs', require('./server/_helpers/swagger'));

// global error handler

// start server
// Serve static assets in production
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
    });
    
    const port = process.env.PORT || 8000;
    
    app.listen(port, function () {
    console.log(`express app running on port ${port}`);
    });