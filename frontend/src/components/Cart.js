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

    if (loading) {
        return <Loading />;
      } else {
        if (user.data.error) {
          return (
            <div>
              <div>
                <Link className="linkage-2" to={`/signup`}>
                  <h1>New? Sign up!</h1>
                </Link>
              </div>
              <div>
                <Link className="linkage-2" to={`/login`}>
                  <h1>Already a Member? Login!</h1>
                </Link>
              </div>
            </div>
          );
        } else {
          return (
            <div>
                <div>
                    <h1>Cart</h1>
                </div>
                {user.data.user.cart.map((c) => {
                    return (
                        <div>
                        <div>
                            <ul>{c.comicTitle}</ul>
                        </div>
                        <div>
                            <ul>${c.comicPrice}</ul>
                        </div>
                        <div>
                        <img
                        src={c.comicImage}
                        />
                        </div>
                        </div>
                    )
                })}
            </div>
          );
        }
      }
    };
    
    export default Cart;
    