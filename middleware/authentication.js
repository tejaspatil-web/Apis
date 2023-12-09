import jwt from "jsonwebtoken";
const secretKey = process.env.JWTSECRETKET;
import bcrypt from "bcrypt";

//This Method Use For GenerateToken
function generateToken(user) {
  const token = jwt.sign(user, secretKey, { expiresIn: "1h" });
  return token;
}

//This Method Use For VerifyToken
function authentication(req, res, next) {
  const token = req.headers["access-token"];
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

//This Method Encrypt The Password
async function encryptPassword(req, res, next) {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 12);
  }
  next();
}

export { generateToken, authentication, encryptPassword };
