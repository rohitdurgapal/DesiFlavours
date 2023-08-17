import React, { useState } from "react";
import CartModal from "./CartModal";
const CartQuantity = ({
  combo,
  addToCart,
  minusToCart,
  PlusToCart,
  cartDetails,
}) => {
  const [cartFlag, setCartFlag] = useState(false);
  const openCartModal = (id) => {
    setCartFlag(!cartFlag);
  };
  return (
    <>
      {cartFlag ? (
        <CartModal
          combo={combo}
          addToCart={addToCart}
          minusToCart={minusToCart}
          PlusToCart={PlusToCart}
          cartDetails={cartDetails}
          cartFlag={cartFlag}
          setCartFlag={setCartFlag}
        />
      ) : (
        ""
      )}
      <h6>
        {combo?.quantityId.length === 1 ? (
          combo.quantityId[0].name
        ) : (
          <>
            <button onClick={() => openCartModal(combo._id)}>
              {combo.quantityId[0].name}
            </button>
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
          </>
        )}
      </h6>
    </>
  );
};

export default CartQuantity;
