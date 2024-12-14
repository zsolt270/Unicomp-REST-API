import Reviews from "../model/reviewsModel.js";
import Users from "../model/usersModel.js";
import Books from "../model/booksModel.js";

export default class Review {
  async newReview(req, res) {
    //check if the book exists whit the given id
    const book = await Books.findOne({ _id: req.params.bookId });

    if (!book) {
      res.status(404);
      throw new Error("There wasn't a book with the given id!");
    }

    const user = await Users.findOne({ username: req.user.uname });
    //create new review
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
    //add the new review to the users and books collection
    user.reviews.push(newReview);
    await user.save();

    book.reviews.push(newReview);
    await book.save();
    //calculate avg rating
    const reviewsForCurrBook = await Reviews.find({ bookid: book._id });

    const sumOfRatings = reviewsForCurrBook
      .map((review) => {
        return Number(review.rating);
      })
      .reduce((prev, curr) => {
        return prev + curr;
      });

    const newAvgRating = sumOfRatings / reviewsForCurrBook.length;
    const updatedBook = await Books.findByIdAndUpdate(book._id, { avgRating: newAvgRating });

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

    // check if review exists and if the currect user tries to delete review
    if (!review) {
      res.status(404);
      throw new Error("Review with this id wasn't found!");
    }

    if (review.uid.toString() !== loggedInUser._id.toString()) {
      res.status(403);
      throw new Error("Dont have the necessary permissions!");
    }
    //check if the user wants to update the connections between collections
    if (!req.body.uid && !req.body.bookId) {
      //update the review
      const updatedReview = await Reviews.findByIdAndUpdate(req.params.id, req.body);

      if (!updatedReview) {
        res.status(500);
        throw new Error("Something went wrong!");
      }
      //if the user updated the given reviews rating, then the avg rating has to change for the book
      if (req.body.rating) {
        //calculate new avg rating
        const reviewsForCurrBook = await Reviews.find({ bookid: review.bookid });

        const sumOfRatings = reviewsForCurrBook
          .map((review) => {
            return Number(review.rating);
          })
          .reduce((prev, curr) => {
            return prev + curr;
          });

        const newAvgRating = sumOfRatings / reviewsForCurrBook.length;

        //update avg rating for the corresponding book
        const updatedBook = await Books.findByIdAndUpdate(review.bookid, {
          avgRating: newAvgRating,
        });

        if (!updatedBook) {
          res.status(500);
          throw new Error("Something went wrong!");
        }
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
    // check if review exists and if the currect user tries to delete review
    if (!review) {
      res.status(404);
      throw new Error("Review with this id wasn't found!");
    }

    if (review.uid.toString() !== loggedInUser._id.toString()) {
      res.status(403);
      throw new Error("Dont have to necessary permissions!");
    }
    //delete review
    const deletedReview = await Reviews.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      res.status(500);
      throw new Error("Something went wrong!");
    }
    // find all the remaining reviews with the coresponding bookid and calculate avg rating
    const reviewsForCurrBook = await Reviews.find({ bookid: review.bookid });

    const sumOfRatings = reviewsForCurrBook
      .map((review) => {
        return Number(review.rating);
      })
      .reduce((prev, curr) => {
        return prev + curr;
      });

    const newAvgRating = sumOfRatings / reviewsForCurrBook.length;
    //update the reviews list and the book's avg rating
    const deletedReviewFromBooks = await Books.findOneAndUpdate(
      { _id: review.bookid },
      { $pull: { reviews: review._id }, avgRating: newAvgRating }
    );

    if (!deletedReviewFromBooks) {
      res.status(500);
      throw new Error("Something went wrong!");
    }
    //delete the given review from the users reviews list
    const deletedReviewFromUsers = await Users.findOneAndUpdate(
      { _id: review.uid },
      { $pull: { reviews: review._id } }
    );

    if (!deletedReviewFromUsers) {
      res.status(500);
      throw new Error("Something went wrong!");
    }

    res.status(200);
    res.json({ message: "Successful review deletion!" });
  }
}
