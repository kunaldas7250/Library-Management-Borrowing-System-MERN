import mongoose from "mongoose";

const BorrowSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },

  borrowDate: Date,
  dueDate: Date,
  returnDate: Date,

  totalCost: Number,
  totalOverdue: { type: Number, default: 0 },

  status: { type: String, default: "Active" }
},
{ timestamps:true });

export default mongoose.model("Borrow", BorrowSchema);
