import { useEffect, useState } from "react";
import { API } from "../api";

export default function Dashboard(){
  const [data,setData]=useState({});
  const userId = localStorage.getItem("userId");

  useEffect(()=>{
    API.get(`/borrow/dashboard/${userId}`).then(res=>setData(res.data));
  },[userId]);

  return(
    <div>
      <h2>Dashboard</h2>
      <p>Active Borrows: {data.active}</p>
      <p>History Count: {data.history}</p>
      <p>Total Due: ₹{data.totalDue}</p>
    </div>
  );
}
