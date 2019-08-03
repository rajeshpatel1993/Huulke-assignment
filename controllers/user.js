const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../config/config");

const issuer = config['app'].jwtIssuer;
const secret = config['app'].jwtSecret;
const server_port = config["app"].port;
const expiresIn = config["app"].jwtExpire;
exports.signup = (req,res, next) => {
    const { username, email, password, confirm_password, gender, dob,} = req.body;
    let result = {};
    let status = 200;

    if(password != confirm_password){
      status = 400;
      result.status = status;
      result.error = "Password and Confirm password did not match";
      return res.status(status).send(result);
    }

    let dob_iso = new Date(dob).toISOString();
    const user = new User({ username, email, password,gender,dob : dob_iso }); // document = instance of a model
    console.log(user);
    user.save((err, user) => {
        // console.log(err);
        if (!err) {
          return exports.login(req, res, next);

        } else {
          status = 500;
          result.status = status;
          result.error = err;
        }
        return res.status(status).send(result);
      });
};


exports.login = (req,res, next) => {
    let {email,password} = req.body;
    let result = {};
    let status = 200;


    User.findOne({email}, (err, user) => {
        if (!err && user) {
          bcrypt.compare(password, user.password).then(match => {
            if (match) {

                const payload = { user: user.email };
                const options = { expiresIn: expiresIn, issuer: `http://${issuer}:${server_port}` };
                const token = jwt.sign(payload, secret, options);
                
                result.token = token;
                result.status = status;
                result.result = user;
            } else {
              status = 401;
              result.status = status;
              result.message = 'Authentication error';
              
            }
            return res.status(status).send(result);
          }).catch(err => {
            status = 500;
            result.status = status;
            result.message = err;
            return res.status(status).send(result);
          });
        } else {
          status = 401;
          result.status = status;
          result.message = "User not found";
          return res.status(status).send(result);
        }
      });
};
