import Book from "../models/Book.js";

const books = [
  { bookName:"Atomic Habits", author:"James Clear", pricePerDay:10, duePerDay:5, bookCountAvailable:3 },
  { bookName:"Rich Dad Poor Dad", author:"Robert Kiyosaki", pricePerDay:8, duePerDay:4, bookCountAvailable:4 },
  { bookName:"Wings Of Fire", author:"A P J Abdul Kalam", pricePerDay:7, duePerDay:3, bookCountAvailable:5 }
];

export const seedBooks = async () => {
  const count = await Book.countDocuments();
  if(count===0){
    await Book.insertMany(books);
    console.log("20 Books Seeded");
  }
};
