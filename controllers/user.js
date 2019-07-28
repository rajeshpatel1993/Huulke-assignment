const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = "aifsf";

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
    let username = req.body.username;
    let password = req.body.password;
    let result = {};
    let status = 200;


    User.findOne({username}, (err, user) => {
        if (!err && user) {
          bcrypt.compare(password, user.password).then(match => {
            if (match) {

                const payload = { user: user.username };
                const options = { expiresIn: '8h', issuer: 'http://localhost:3100' };
                const token = jwt.sign(payload, secret, options);
                
                result.token = token;
                result.status = status;
                result.result = user;
            } else {
              status = 400;
              result.status = status;
              result.error = 'Authentication error';
              
            }
            return res.status(status).send(result);
          }).catch(err => {
            status = 500;
            result.status = status;
            result.error = err;
            return res.status(status).send(result);
          });
        } else {
          status = 404;
          result.status = status;
          result.error = err;
          return res.status(status).send(result);
        }
      });
};
