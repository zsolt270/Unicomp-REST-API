import Users from "../model/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class User {
  async signUp(req, res) {
    if (Users.find({ username: req.body.username })) {
      res.status(400);
      throw new Error("The given username already exits!");
    }

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

    res.status(201).json({ message: "Successful Sign Up!" });
  }

  async logIn(req, res) {
    const user = await Users.findOne({ username: req.body.username });

    if (!user) {
      res.status(404);
      throw new Error("Username wasn't found");
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
      res.status(401);
      throw new Error("Not Allowed!");
    }

    const accessToken = jwt.sign({ uname: req.body.username }, process.env.PRIVATE_JWT_KEY);

    res.status(200).json({ message: "Logged In!", token: accessToken });
  }

  async getUserDetails(req, res) {
    const userDetails = await Users.findOne({ username: req.user.uname });

    if (!userDetails) {
      res.status(500);
      throw new Error("Something went wrong!");
    }

    res.json(userDetails);
  }
}
