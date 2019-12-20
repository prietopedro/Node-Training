/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ you: "Need that token m8" });
  }
  jwt.verify(authorization, "secret-sauce", (err, decoded) => {
    if (err) {
      res.status(401).json({ you: "shall not pass!" });
    } else {
      req.user = decoded;
      next();
    }
  });
};
