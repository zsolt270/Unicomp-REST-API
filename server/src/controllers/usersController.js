import Users from "../model/usersModel.js";

export default class User {
  async signUp(req, res) {
    console.log(req.body);
    res.json({ message: "sikeres" });
  }
}
