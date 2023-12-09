import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import { generateToken, authentication } from "../middleware/authentication.js";

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ message: "Incorrect password!" });
    }
    const token = generateToken({ email: email, password: password });
    res.send({ message: "Logged in successfully!", accessToken: token });
  } catch (error) {
    res.status(500).send(error);
  }
}

export default userLogin;
