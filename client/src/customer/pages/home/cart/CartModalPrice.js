import React from "react";

const CartModalPrice = ({
  combo,
  q,
  addToCart,
  minusToCart,
  PlusToCart,
  cartDetails,
}) => {
  const itemData = cartDetails.filter(
    (i) => i._id === combo._id && i.quantityId === q._id
  );
  return (
    <>
      <div className="add-to-cart">
        <h3>₹ {q.price}</h3>{" "}
        {itemData.length > 0 ? (
          <div className="inc-dec">
            <div className="button">
              <button
                className="dec"
                onClick={() =>
                  minusToCart({
                    _id: combo?._id,
                    count: itemData[0]?.count - 1,
                    quantityId: q._id,
                    dateNow: itemData[0]?.dateNow,
                  })
                }
              >
                <i className="fa fa-minus" aria-hidden="true"></i>
              </button>
            </div>
            <span className="cart-input">{itemData[0]?.count}</span>
            <div className="button">
              <button
                className="inc"
                onClick={() =>
                  PlusToCart({
                    _id: combo?._id,
                    count: itemData[0]?.count + 1,
                    quantityId: q._id,
                  })
                }
              >
                <i className="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="btn-cart"
            onClick={() =>
              addToCart({
                ...combo,
                selectedQuantityId: q,
                count: 1,
              })
            }
          >
            <i className="fa fa-shopping-cart" aria-hidden="true"></i> Add
          </button>
        )}
      </div>
    </>
  );
};

export default CartModalPrice;
