const jwt = require('jsonwebtoken');
const config = require("../config/config");

const issuer = config['app'].jwtIssuer;
const secret = config['app'].jwtSecret;
const server_port = config["app"].port;
const expiresIn = config["app"].jwtExpire;
module.exports = {
  validateJWT: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      const options = {
        expiresIn: expiresIn,
        issuer: `http://${issuer}:${server_port}`
      };
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(token, secret, options);

        // Let's pass back the decoded token to the request object
        req.decoded = result;
        // We call next to pass execution to the subsequent middleware
        next();
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        throw new Error(err);
      }
    } else {
      result = { 
        error: `Authentication error. Token required.`,
        status: 401
      };
      res.status(401).send(result);
    }
  }
};