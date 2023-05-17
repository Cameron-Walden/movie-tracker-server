const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

function verifyUser(request, response, next) {
  function valid(err, user) {
    if (err) {
      console.error("JWT verification error:", err);
      return next(new Error("Not Authorized in verified"));
    }
    request.user = user;
    next();
  }
  try {
    const authHeader = request.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Invalid authorization header");
    }
    const token = authHeader.split(" ")[1];
    console.log(token, "token verify user");
    jwt.verify(token, getKey, {}, valid);
  } catch (error) {
    console.error("JWT verification error:", error);
    next("Not Authorized in next valid");
  }
}

const client = jwksClient({
  jwksUri: process.env.JWKS_URI,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      console.error("Key retrieval error:", err);
      return callback(err);
    }
    const signinKey = key.publicKey || key.rsaPublicKey;
    callback(null, signinKey);
  });
}

module.exports = verifyUser;
