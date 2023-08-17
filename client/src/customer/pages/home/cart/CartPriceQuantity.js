import React from "react";

const CartPriceQuantity = ({
  combo,
  addToCart,
  minusToCart,
  PlusToCart,
  cartDetails,
}) => {
  const itemData = cartDetails.filter(
    (i) => i._id === combo._id && i.quantityId === combo.quantityId[0]._id
  );
  return (
    <>
      <div className="add-to-cart">
        <h3>₹ {combo.quantityId[0].price}</h3>{" "}
        {itemData.length > 0 ? (
          <div className="inc-dec">
            <div className="button">
              <button
                className="dec"
                onClick={() =>
                  minusToCart({
                    _id: itemData[0]?._id,
                    count: itemData[0]?.count - 1,
                    quantityId: itemData[0]?.quantityId,
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
                    _id: itemData[0]?._id,
                    count: itemData[0]?.count + 1,
                    quantityId: itemData[0]?.quantityId,
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
                selectedQuantityId: combo.quantityId[0],
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

export default CartPriceQuantity;
