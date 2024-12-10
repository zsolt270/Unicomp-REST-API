import Books from "../model/booksModel.js";

export default class Book {
  async createBook(req, res) {
    if (await Books.findOne({ title: req.body.title })) {
      res.status(400);
      throw new Error("The given book already exits!");
    }

    const newBook = await Books.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
    });

    if (!newBook) {
      res.status(500);
      throw new Error("Something went wrong!");
    }

    res.json({ message: "The Books was created!" });
  }
}
