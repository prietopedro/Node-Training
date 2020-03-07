const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);
  if (!authorization) {
    res.status(401).json({ error: "Please prove a token" });
  }

  jwt.verify(authorization, "SuperPrivate", (err, decoded) => {
    if (err) {
      res.status(403).json({ error: "Not Authorized" });
    } else {
      req.token = decoded;
      next();
    }
  });
};
