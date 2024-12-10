import Reviews from "../model/reviewsModel.js";
import Users from "../model/usersModel.js";
import Books from "../model/booksModel.js";

export default class Review {
  async newReview(req, res) {
    const book = await Books.findOne({ _id: req.params.bookId });

    if (!book) {
      res.status(404);
      throw new Error("There wasn't a book with the given id!");
    }

    const user = await Users.findOne({ username: req.user.uname });

    const newReview = await Reviews.create({
      uid: user._id,
      bookid: book._id,
      rating: req.body.rating,
      reviewtext: req.body.reviewtext,
    });

    if (!newReview) {
      res.status(500);
      throw new Error("Something went wrong!");
    }

    user.reviews.push(newReview);
    await user.save();

    book.reviews.push(newReview);
    await book.save();

    const newRating = (book.avgRating + Number(req.body.rating)) / book.reviews.length;
    const updatedBook = await Books.findByIdAndUpdate(book._id, { avgRating: newRating });

    if (!updatedBook) {
      res.status(500);
      throw new Error("Something went wrong!");
    }

    res.status(201);
    res.json({ message: "Review was successfully created!" });
  }

  async getBookReviews(req, res) {
    const reviews = await Reviews.find({ bookid: req.params.bookId });

    if (!reviews) {
      res.status(404);
      throw new Error("There wasn't a book with the given id!");
    }

    res.status(200);
    res.json(reviews);
  }
}
