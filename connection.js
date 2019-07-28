//Import the mongoose module
const mongoose = require('mongoose');
const config = require("./config/config");

const db_host = config["db"].host;
const db_port = config["db"].port;
const db_name = config["db"].name;

const mongoDB = `mongodb://${db_host}:${db_port}/${db_name}`;

mongoose.connect(mongoDB);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;
// mongoose.set('debug', true);
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));