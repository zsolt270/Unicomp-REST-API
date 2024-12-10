import jwt from "jsonwebtoken";

const jwtAuthenticator = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401);
    throw new Error("Not logged in!");
  }

  jwt.verify(token, process.env.PRIVATE_JWT_KEY, (error, uname) => {
    if (error) {
      res.status(403);
      throw new Error("Not Allowed!");
    }
    req.user = uname;
    next();
  });
};

export default jwtAuthenticator;
