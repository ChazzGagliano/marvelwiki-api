import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Cart = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchData() {
        const data = await axios.get(`http://localhost:3030/user/cart`, {
          withCredentials: true,
        });
        setUser(data);
        console.log(data);
        setLoading(false);
      }
  
      if (user === null) {
        fetchData();
      }
    }, [user]);
  
}

export default Cart