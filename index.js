const http = require('http');
const path = require('path');


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const busboy = require('connect-busboy')
const fileUpload = require('express-fileupload');

require('./connection');
const config = require("./config/config");
const server_port = config["app"].port;

const app = express();

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));// you can access image 
app.use('/images', express.static(path.join(__dirname, 'uploads')));


app.use('/user', userRoutes);
app.use('/product', productRoutes);


app.listen(server_port);
