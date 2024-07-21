import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Cart = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPlusShipping, setTotalPlusShiping] = useState(0);

  const handleCompleteOrder = async (cart, totalPlusShipping) => {
    await axios.post(
      `http://localhost:3030/user/add/order`,
      {
        cart: cart,
        totalPlusShipping: totalPlusShipping,
      },
      { withCredentials: true }
    );
  };

  const deleteCart = async (cart) => {
    await axios.post(
        `http://localhost:3030/user/cart/order`,
        {
            cart:cart,
        },
        { withCredentials: true } 
    )
    window.location.reload()
  };

  const completePurchase = async () => {
    await handleCompleteOrder(user.data.user.cart, totalPlusShipping);
    await deleteCart(user.data.user.cart);
  }

  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(`http://localhost:3030/user/cart`, {
        withCredentials: true,
      });
      setUser(data);
      console.log(data);

      let calculatedTotal = 0;
      for (let i = 0; i < data.data.user.cart.length; i++) {
        calculatedTotal += data.data.user.cart[i].comicPrice;
      }
      setTotal(calculatedTotal);
      console.log(calculatedTotal);

      let absoluteTotal = 0;
      let shipping = 5;
      let tax = 3;

      for (let i = 0; i < data.data.user.cart.length; i++) {
        absoluteTotal += data.data.user.cart[i].comicPrice;
      }
      absoluteTotal += shipping;
      absoluteTotal += tax;

      setTotalPlusShiping(absoluteTotal);
      console.log(absoluteTotal);

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
                  <img src={c.comicImage} />
                </div>
              </div>
            );
          })}
          <div>
            <ul>Cart: ${total}</ul>
            <ul>Shipping: $5</ul>
            <ul>Tax: $3</ul>
            <ul>Total: {totalPlusShipping}</ul>
          </div>
          <button
            className="purchase"
            type="button"
            onClick={completePurchase}
          >
            <img
              className="purchase-button"
              src="https://freepngimg.com/thumb/buy/6-2-buy-now-png-pic.png"
            />
          </button>
        </div>
      );
    }
  }
};

export default Cart;
