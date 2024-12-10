import Users from "../model/usersModel.js";
import bcrypt from "bcrypt";

export default class User {
  async signUp(req, res) {
    console.log(req.body);

    const salt = await bcrypt.genSalt();
    const securedPwd = await bcrypt.hash(req.body.password, salt);

    if (!securedPwd) {
      res.status(500);
      throw new Error("Something went wrong!");
    }

    const user = await Users.create({
      username: req.body.username,
      email: req.body.email,
      password: securedPwd,
      reviews: [],
    });

    if (!user) {
      res.status(500);
      throw new Error("Something went wrong!");
    }

    res.status(201).json(user);
  }

  async logIn(req, res) {
    const user = await Users.findOne({ username: req.body.username });

    if (!user) {
      res.status(404);
      throw new Error("Username wasnt found");
    }

    res.status(200).json(user);
  }
}
