require('dotenv').config();
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

function verifyUser(request, response, next) {
  function valid(err, user) {
    if (err) {
      console.error("JWT verification error:", err);
      return next(new Error("Not Authorized"));
    }
    request.user = user;
    next();
  }
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Invalid authorization header");
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, getKey, {}, valid);
  } catch (error) {
    console.error("JWT verification error:", error);
    next("Not Authorized");
  }
}

const client = jwksClient({
  jwksUri: process.env.JWKS_URI,
});

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      console.error("Key retrieval error:", err);
      return callback(err);
    }
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
};

module.exports = verifyUser;
