import { useEffect,useState } from "react";
import { API } from "../api";

export default function History(){
  const [data,setData]=useState([]);
  const userId=localStorage.getItem("userId");

  useEffect(()=>{
    API.get(`/borrow/history/${userId}`).then(res=>setData(res.data));
  },[userId]);

  return(
    <div>
      <h2>Borrow History</h2>
      {data.map(h=>(
        <div key={h._id}>
          {h.bookId.bookName} | Cost: ₹{h.totalCost+h.totalOverdue}
        </div>
      ))}
    </div>
  );
}
