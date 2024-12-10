import Books from "../model/booksModel.js";
import Reviews from "../model/reviewsModel.js";
import Users from "../model/usersModel.js";

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

    res.status(201);
    res.json({ message: "The book was created!" });
  }

  async getBooks(req, res) {
    const allBooks = await Books.find().populate("reviews");

    if (!allBooks) {
      res.status(500);
      throw new Error("Something went wrong!");
    }

    res.status(200);
    res.json(allBooks);
  }

  async getBookById(req, res) {
    const book = await Books.findOne({ _id: req.params.id }).populate("reviews");

    if (!book) {
      res.status(404);
      throw new Error("Book with the given id not found!");
    }

    res.status(200);
    res.json(book);
  }

  async updateBook(req, res) {
    if (await Books.findOne({ title: req.body.title })) {
      res.status(400);
      throw new Error("A book with this name already exists!");
    }

    if (req.body.avgRating || req.body.reviews) {
      res.status(400);
      throw new Error("Cant update the reviews and average score!");
    }

    const updatedBook = await Books.findByIdAndUpdate(req.params.id, req.body);

    if (!updatedBook) {
      res.status(404);
      throw new Error("Book with the given id not found!");
    }

    res.status(200);
    res.json({ message: "The update was successful!" });
  }

  async deleteBook(req, res) {
    const deletedBook = await Books.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      res.status(404);
      throw new Error("Book with the given id not found!");
    }

    (await Reviews.find({ bookid: req.params.id })).forEach(async (review) => {
      const deletedUserReviewRef = await Users.findOneAndUpdate(
        { _id: review.uid },
        { $pull: { reviews: review._id } }
      );

      if (!deletedUserReviewRef) {
        res.status(500);
        throw new Error("Something went wrong!");
      }
    });

    const deletedReviews = await Reviews.deleteMany({ bookid: req.params.id });

    if (!deletedReviews) {
      res.status(404);
      throw new Error("Book with the given id not found!");
    }

    res.status(200);
    res.json({ message: "The book was successfully deleted!" });
  }
}
