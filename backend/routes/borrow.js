// import express from "express";
// import Borrow from "../models/Borrow.js";
// import Book from "../models/Book.js";

// const router = express.Router();

// /* Validate borrow */
// router.post("/validate", async (req,res)=>{
//   const active = await Borrow.findOne({ userId:req.body.userId, status:"Active" });
//   if(active) return res.status(400).json("You already borrowed a book");
//   res.json("OK");
// });

// /* Borrow Book */
// router.post("/", async (req,res)=>{
//   const { userId, bookId, days } = req.body;
//   if(days<=0 || days>7) return res.status(400).json("Max 7 days allowed");

//   const book = await Book.findById(bookId);
//   if(book.bookCountAvailable<=0) return res.status(400).json("Book unavailable");

//   const borrowDate = new Date();
//   const dueDate = new Date();
//   dueDate.setDate(borrowDate.getDate()+days);

//   const totalCost = book.pricePerDay * days;

//   const borrow = await Borrow.create({
//     userId, bookId, borrowDate, dueDate, totalCost
//   });

//   book.bookCountAvailable--;
//   await book.save();

//   res.json(borrow);
// });

// /* Return Book */
// router.post("/:id/submit", async (req,res)=>{
//   const borrow = await Borrow.findById(req.params.id).populate("bookId");
//   const returnDate = new Date(req.body.returnDate);

//   const overdueDays = Math.max(0, Math.ceil((returnDate-borrow.dueDate)/(1000*60*60*24)));
//   borrow.totalOverdue = overdueDays * borrow.bookId.duePerDay;
//   borrow.returnDate = returnDate;
//   borrow.status = "Returned";

//   await borrow.save();

//   res.json(borrow);
// });
// /* Active Borrows */
// router.get("/active/:userId", async (req,res)=>{
//   const active = await Borrow.find({ userId:req.params.userId, status:"Active" })
//                              .populate("bookId");
//   res.json(active);
// });

// /* Borrow History */
// router.get("/history/:userId", async (req,res)=>{
//   const history = await Borrow.find({ userId:req.params.userId, status:"Returned" }).populate("bookId");
//   res.json(history);
// });

// /* Dashboard */
// router.get("/dashboard/:userId", async (req,res)=>{
//   const active = await Borrow.find({ userId:req.params.userId, status:"Active" });
//   const history = await Borrow.find({ userId:req.params.userId, status:"Returned" });
//   const totalDue = active.reduce((s,b)=>s+b.totalCost,0);
//   res.json({ active:active.length, history:history.length, totalDue });
// });

// export default router;


import express from "express";
import Borrow from "../models/Borrow.js";
import Book from "../models/Book.js";

const router = express.Router();

/* Validate borrow */
router.post("/validate", async (req, res) => {
  try {
    const active = await Borrow.findOne({ userId: req.body.userId, status: "Active" });
    if (active) return res.status(400).json("You already borrowed a book");
    res.json("OK");
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Borrow Book */
router.post("/", async (req, res) => {
  try {
    const { userId, bookId, days } = req.body;
    if (!days || days <= 0 || days > 7) return res.status(400).json("Max 7 days allowed");

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json("Book not found");
    if (book.bookCountAvailable <= 0) return res.status(400).json("Book unavailable");

    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowDate.getDate() + days);

    const totalCost = book.pricePerDay * days;

    const borrow = await Borrow.create({
      userId,
      bookId,
      borrowDate,
      dueDate,
      totalCost,
      status: "Active"
    });

    book.bookCountAvailable -= 1;
    await book.save();

    res.json(borrow);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Return Book */
router.post("/:id/submit", async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id).populate("bookId");
    if (!borrow) return res.status(404).json("Borrow not found");

    const returnDate = new Date(req.body.returnDate);
    if (!returnDate) return res.status(400).json("Return date required");

    const overdueDays = Math.max(
      0,
      Math.ceil((returnDate - borrow.dueDate) / (1000 * 60 * 60 * 24))
    );

    borrow.totalOverdue = overdueDays * borrow.bookId.duePerDay;
    borrow.returnDate = returnDate;
    borrow.status = "Returned";

    await borrow.save();

    res.json(borrow);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Active Borrows */
router.get("/active/:userId", async (req, res) => {
  try {
    const active = await Borrow.find({ userId: req.params.userId, status: "Active" })
      .populate("bookId");
    res.json(active);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Borrow History */
router.get("/history/:userId", async (req, res) => {
  try {
    const history = await Borrow.find({ userId: req.params.userId, status: "Returned" })
      .populate("bookId");
    res.json(history);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Dashboard */
router.get("/dashboard/:userId", async (req, res) => {
  try {
    const active = await Borrow.find({ userId: req.params.userId, status: "Active" });
    const history = await Borrow.find({ userId: req.params.userId, status: "Returned" });

    const totalDue = active.reduce((sum, b) => sum + b.totalCost, 0);

    res.json({
      active: active.length,
      history: history.length,
      totalDue
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;

