const Models = require("../model/user.model");
const bcrypt = require("bcrypt");
const auth = require("../middleware/authentication");

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await Models.User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ message: "Incorrect password!" });
    }
    const token = auth.generateToken({ email: email, password: password });
    res.send({ message: "Logged in successfully!", accessToken: token });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = userLogin;
