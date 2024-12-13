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

  async updateBookReview(req, res) {
    const review = await Reviews.findOne({ _id: req.params.id });
    const loggedInUser = await Users.findOne({ username: req.user.uname });

    if (!review) {
      res.status(404);
      throw new Error("Review with this id wasn't found!");
    }

    if (review.uid !== loggedInUser._id) {
      res.status(403);
      throw new Error("Dont have to necessary permissions!");
    }

    if (!req.body.uid && !req.body.bookId) {
      if (req.body.rating) {
        const reviewsForCurrBook = await Reviews.find({ bookid: review.bookid });
        const sumOfRatings =
          reviewsForCurrBook
            .map((review) => {
              return Number(review.rating);
            })
            .reduce((prev, curr) => {
              return prev.rating + curr.rating;
            }) + req.body.rating;

        const newAvgRating = sumOfRatings / reviewsForCurrBook.length + 1;

        const updatedBook = Books.findByIdAndUpdate(review.bookid, { avgRating: newAvgRating });

        if (!updatedBook) {
          res.status(500);
          throw new Error("Something went wrong!");
        }
      }

      const updatedReview = await Reviews.findByIdAndUpdate(req.params.id, req.body);

      if (!updatedReview) {
        res.status(500);
        throw new Error("Something went wrong!");
      }

      res.status(200);
      res.json({ message: "The update was successful!" });
    } else {
      res.status(403);
      throw new Error("Action is prohibited!");
    }
  }

  async deleteBookReview(req, res) {
    const review = await Reviews.findOne({ _id: req.params.id });
    const loggedInUser = await Users.findOne({ username: req.user.uname });

    if (!review) {
      res.status(404);
      throw new Error("Review with this id wasn't found!");
    }

    if (review.uid !== loggedInUser._id) {
      res.status(403);
      throw new Error("Dont have to necessary permissions!");
    }

    const deletedReview = await Reviews.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      res.status(500);
      throw new Error("Something went wrong!");
    }

    const deletedReviewFromBooks = await Books.findOneAndUpdate(
      { _id: review.bookid },
      { $pull: { reviews: review._id } }
    );

    if (!deletedReviewFromBooks) {
      res.status(500);
      throw new Error("Something went wrong!");
    }

    const deletedReviewFromUsers = await Users.findOneAndUpdate(
      { _id: review.uid },
      { $pull: { reviews: review._id } }
    );

    if (!deletedReviewFromUsers) {
      res.status(500);
      throw new Error("Something went wrong!");
    }
  }
}
