
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
