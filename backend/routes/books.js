// import express from "express"
// import Book from "../models/Book.js"
// import BookCategory from "../models/BookCategory.js"

// const router = express.Router()

// /* Get all books in the db */
// router.get("/allbooks", async (req, res) => {
//     try {
//         const books = await Book.find({}).populate("transactions").sort({ _id: -1 })
//         res.status(200).json(books)
//     }
//     catch (err) {
//         return res.status(504).json(err);
//     }
// })

// /* Get Book by book Id */
// router.get("/getbook/:id", async (req, res) => {
//     try {
//         const book = await Book.findById(req.params.id).populate("transactions")
//         res.status(200).json(book)
//     }
//     catch {
//         return res.status(500).json(err)
//     }
// })

// /* Get books by category name*/
// router.get("/", async (req, res) => {
//     const category = req.query.category
//     try {
//         const books = await BookCategory.findOne({ categoryName: category }).populate("books")
//         res.status(200).json(books)
//     }
//     catch (err) {
//         return res.status(504).json(err)
//     }
// })

// /* Adding book */
// router.post("/addbook", async (req, res) => {
//     if (req.body.isAdmin) {
//         try {
//             const newbook = await new Book({
//                 bookName: req.body.bookName,
//                 alternateTitle: req.body.alternateTitle,
//                 author: req.body.author,
//                 bookCountAvailable: req.body.bookCountAvailable,
//                 language: req.body.language,
//                 publisher: req.body.publisher,
//                 bookStatus: req.body.bookSatus,
//                 categories: req.body.categories
//             })
//             const book = await newbook.save()
//             await BookCategory.updateMany({ '_id': book.categories }, { $push: { books: book._id } });
//             res.status(200).json(book)
//         }
//         catch (err) {
//             res.status(504).json(err)
//         }
//     }
//     else {
//         return res.status(403).json("You dont have permission to delete a book!");
//     }
// })

// /* Addding book */
// router.put("/updatebook/:id", async (req, res) => {
//     if (req.body.isAdmin) {
//         try {
//             await Book.findByIdAndUpdate(req.params.id, {
//                 $set: req.body,
//             });
//             res.status(200).json("Book details updated successfully");
//         }
//         catch (err) {
//             res.status(504).json(err);
//         }
//     }
//     else {
//         return res.status(403).json("You dont have permission to delete a book!");
//     }
// })

// /* Remove book  */
// router.delete("/removebook/:id", async (req, res) => {
//     if (req.body.isAdmin) {
//         try {
//             const _id = req.params.id
//             const book = await Book.findOne({ _id })
//             await book.remove()
//             await BookCategory.updateMany({ '_id': book.categories }, { $pull: { books: book._id } });
//             res.status(200).json("Book has been deleted");
//         } catch (err) {
//             return res.status(504).json(err);
//         }
//     } else {
//         return res.status(403).json("You dont have permission to delete a book!");
//     }
// })

// export default router

import express from "express";
import Book from "../models/Book.js";
import BookCategory from "../models/BookCategory.js";

const router = express.Router();

/* --------------------------------------------------
   GET ALL BOOKS (Student View)
-------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ _id: -1 });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* --------------------------------------------------
   GET BOOK BY ID
-------------------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("transactions");
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* --------------------------------------------------
   GET ALL BOOKS (ADMIN / INTERNAL)
-------------------------------------------------- */
router.get("/allbooks", async (req, res) => {
  try {
    const books = await Book.find({})
      .populate("transactions")
      .sort({ _id: -1 });

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* --------------------------------------------------
   ADD BOOK (ADMIN ONLY)
-------------------------------------------------- */
router.post("/addbook", async (req, res) => {
  if (!req.body.isAdmin) {
    return res.status(403).json("You dont have permission to add a book!");
  }

  try {
    const newBook = new Book({
      bookName: req.body.bookName,
      alternateTitle: req.body.alternateTitle,
      author: req.body.author,
      pricePerDay: req.body.pricePerDay,
      duePerDay: req.body.duePerDay,
      bookCountAvailable: req.body.bookCountAvailable,
      language: req.body.language,
      publisher: req.body.publisher,
      bookStatus: req.body.bookStatus || "Available",
      categories: req.body.categories || []
    });

    const book = await newBook.save();

    if (book.categories.length > 0) {
      await BookCategory.updateMany(
        { _id: book.categories },
        { $push: { books: book._id } }
      );
    }

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* --------------------------------------------------
   UPDATE BOOK
-------------------------------------------------- */
router.put("/updatebook/:id", async (req, res) => {
  if (!req.body.isAdmin) {
    return res.status(403).json("You dont have permission to update book!");
  }

  try {
    await Book.findByIdAndUpdate(req.params.id, {
      $set: req.body
    });

    res.status(200).json("Book updated successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

/* --------------------------------------------------
   DELETE BOOK
-------------------------------------------------- */
router.delete("/removebook/:id", async (req, res) => {
  if (!req.body.isAdmin) {
    return res.status(403).json("You dont have permission to delete book!");
  }

  try {
    const book = await Book.findById(req.params.id);
    await book.deleteOne();

    await BookCategory.updateMany(
      { _id: book.categories },
      { $pull: { books: book._id } }
    );

    res.status(200).json("Book deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
