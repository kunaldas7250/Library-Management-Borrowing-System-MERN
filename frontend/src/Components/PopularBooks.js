// import React from "react";
// import "./PopularBooks.css";
// import Book1 from "../../public/images/book1.jpg"
// import Book2 from "../../public/images/book2.jpg"
// import Book3 from "../../public/images/book3.jpg"
// import Book4 from "../../public/images/book4.avif"
// import Book5 from "../../public/images/book5.jpg"
// import Book6 from "../../public/images/book7.avif"
// function PopularBooks() {
//   return (
//     <div className="popularbooks-container">
//       <h3 className="popularbooks-title">Popular Books</h3>
//       <div className="popularbooks">
//         <div className="popularbook-images">
//           <img
//             className="popular-book"
//             src={Book1}
//             alt=""
//           ></img>
//           <img
//             className="popular-book"
//             src={Book2}
//             alt=""
//           ></img>
//           <img
//             className="popular-book"
//             src={Book3}
//             alt=""
//           ></img>
//           <img
//             className="popular-book"
//             src={Book4}
//             alt=""
//           ></img>
//           <img
//             className="popular-book"
//             src={Book5}
//             alt=""
//           ></img>
//           <img
//             className="popular-book"
//             src={Book5}
//             alt=""
//           ></img>
//         </div>
//         <div className="popularbook-images">
//           <img
//             className="popular-book"
//             src={Book6}
//             alt=""
//           ></img>
//           <img
//             className="popular-book"
//             src={Book1}
//             alt=""
//           ></img>
//           <img
//             className="popular-book"
//             src={Book2}
//             alt=""
//           ></img>
//           <img
//             className="popular-book"
//             src={Book4}
//             alt=""
//           ></img>
//           <img
//             className="popular-book"
//             src={Book3}
//             alt=""
//           ></img>
//           <img
//             className="popular-book"
//             src={Book3}
//             alt=""
//           ></img>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PopularBooks;


import React from "react";
import "./PopularBooks.css";

function PopularBooks() {
  return (
    <div className="popularbooks-container">
      <h3 className="popularbooks-title">Popular Books</h3>

      <div className="popularbooks">
        <div className="popularbook-images">
          <img className="popular-book" src="/images/book1.jpg" alt="book" />
          <img className="popular-book" src="/images/book2.jpg" alt="book" />
          <img className="popular-book" src="/images/book3.jpg" alt="book" />
          <img className="popular-book" src="/images/book4.avif" alt="book" />
          <img className="popular-book" src="/images/book5.jpg" alt="book" />
          <img className="popular-book" src="/images/book7.avif" alt="book" />
        </div>

        <div className="popularbook-images">
          <img className="popular-book" src="/images/book7.avif" alt="book" />
          <img className="popular-book" src="/images/book1.jpg" alt="book" />
          <img className="popular-book" src="/images/book2.jpg" alt="book" />
          <img className="popular-book" src="/images/book4.avif" alt="book" />
          <img className="popular-book" src="/images/book3.jpg" alt="book" />
          <img className="popular-book" src="/images/book5.jpg" alt="book" />
        </div>
      </div>
    </div>
  );
}

export default PopularBooks;
