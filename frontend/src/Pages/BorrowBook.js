import { useEffect, useState } from "react";
import { API } from "../api";

export default function BorrowBook() {
  const [books,setBooks] = useState([]);

  useEffect(()=>{
    API.get("/books").then(res=>setBooks(res.data));
  },[]);

  const borrow = async(id)=>{
    const days = prompt("How many days?");
    const userId = localStorage.getItem("userId");

    await API.post("/borrow", { userId, bookId:id, days });
    alert("Book Borrowed Successfully");
  };

  return (
    <div>
      <h2>Available Books</h2>
      {books.map(b=>(
        <div key={b._id}>
          {b.bookName} - ₹{b.pricePerDay}/day
          <button onClick={()=>borrow(b._id)}>Borrow</button>
        </div>
      ))}
    </div>
  );
}
