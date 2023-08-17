import React from "react";

const CartHeaderModalPrice = ({ cartSingle, minusToCart, PlusToCart }) => {
  return (
    <>
      <div className="add-to-cart">
        <h3>₹ {cartSingle.price}</h3>{" "}
        <div className="inc-dec">
          <div className="button">
            <button
              className="dec"
              onClick={() =>
                minusToCart({
                  _id: cartSingle?._id,
                  count: cartSingle?.count - 1,
                  quantityId: cartSingle.quantityId,
                  dateNow: cartSingle?.dateNow,
                })
              }
            >
              <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
          </div>
          <span className="cart-input">{cartSingle?.count}</span>
          <div className="button">
            <button
              className="inc"
              onClick={() =>
                PlusToCart({
                  _id: cartSingle?._id,
                  count: cartSingle?.count + 1,
                  quantityId: cartSingle.quantityId,
                })
              }
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartHeaderModalPrice;
