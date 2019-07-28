const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./connection');
const config = require("./config/config");
const server_port = config["app"].port;

const app = express();

const userRoutes = require('./routes/user');
const shopingRoutes = require('./routes/shop');

// app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRoutes);
app.use('/shoping', shopingRoutes);


app.listen(server_port);
