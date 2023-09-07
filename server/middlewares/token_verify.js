const jwt = require("jsonwebtoken");

const jwtsecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "unauthorized1" });
    // return res.redirect("/");
  }
  try {
    const decoded = jwt.verify(token, jwtsecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized2" });
  }
};

module.exports = authMiddleware;
