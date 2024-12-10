import Users from "../model/usersModel.js";
import bcrypt from "bcrypt";

export default class User {
  async signUp(req, res) {
    console.log(req.body);

    res.json(req.body);
  }
}
