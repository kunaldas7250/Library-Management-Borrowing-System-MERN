// import { useEffect, useState } from "react";
// import { API } from "../api";

// export default function ReturnBook() {
//   const [activeBorrows, setActiveBorrows] = useState([]);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     API.get(`/borrow/active/${userId}`).then(res => setActiveBorrows(res.data));
//   }, [userId]);

//   const submitReturn = async (id) => {
//     const returnDate = prompt("Enter return date (YYYY-MM-DD)");
//     if (!returnDate) return;

//     await API.post(`/borrow/${id}/submit`, { returnDate });
//     alert("Book returned successfully");
//   };

//   return (
//     <div>
//       <h2>Return Book</h2>
//       {activeBorrows.map(b => (
//         <div key={b._id}>
//           {b.bookId.bookName}
//           <button onClick={() => submitReturn(b._id)}>Return</button>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { API } from "../api";

export default function ReturnBook() {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get(`/borrow/active/${user._id}`).then(res => setData(res.data));
  }, [user]);

  const submit = async (id) => {
    const date = prompt("Return date (YYYY-MM-DD)");
    await API.post(`/borrow/${id}/submit`, { returnDate: date });
    alert("Returned");
  };

  return (
    <div>
      <h2>Return Book</h2>
      {data.map(b => (
        <div key={b._id}>
          {b.bookId.bookName}
          <button onClick={() => submit(b._id)}>Return</button>
        </div>
      ))}
    </div>
  );
}
