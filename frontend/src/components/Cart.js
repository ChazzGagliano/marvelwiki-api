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
                {user.data.user.cart.map((c) => {
                    return (
                        <div>
                        <div>
                            <il>{c.comicTitle}</il>
                        </div>
                        <div>
                            <il>${c.comicPrice}</il>
                        </div>
                        <div>
                        http://i.annihil.us/u/prod/marvel/i/mg/9/40/5109ab5908cce
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
    