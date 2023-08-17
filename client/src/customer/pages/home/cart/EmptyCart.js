import React from "react";
const EmptyCart = () => {
  return (
    <>
      <div className="empty-cart-style">
        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
        <h4>Your cart is empty.</h4>
      </div>
    </>
  );
};

export default EmptyCart;
