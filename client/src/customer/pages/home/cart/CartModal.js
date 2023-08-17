import React from "react";
import "./CartModal.css";
import CartModalPrice from "./CartModalPrice";
const CartModal = ({
  combo,
  addToCart,
  minusToCart,
  PlusToCart,
  cartDetails,
  cartFlag,
  setCartFlag,
}) => {
  return (
    <>
      <div className="cart-modal">
        <div className="cart-inner-block">
          <div className="ItemVariantModal">
            <div className="hRwjvg">
              <div className="cart-heading">
                <h2>
                  {combo.name}{" "}
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    onClick={() => setCartFlag(!cartFlag)}
                  ></i>
                </h2>
              </div>
              <table className="table table-responsive cart-table">
                <tbody>
                  {combo?.quantityId.map((q) => (
                    <tr key={q._id}>
                      <td>
                        <img
                          src={
                            combo.itemImage
                              ? `${process.env.REACT_APP_BACKEND}uploads/items/${combo.itemImage}`
                              : `${process.env.REACT_APP_BACKEND}uploads/dummy/no-image.png`
                          }
                          alt={combo.name}
                        />
                      </td>
                      <td>
                        <div className="price">
                          <span>{q.name}</span>
                        </div>
                      </td>
                      <td>
                        <CartModalPrice
                          combo={combo}
                          q={q}
                          addToCart={addToCart}
                          minusToCart={minusToCart}
                          PlusToCart={PlusToCart}
                          cartDetails={cartDetails}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal;
