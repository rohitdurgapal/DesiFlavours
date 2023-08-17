import React from "react";
import CartQuantity from "./cart/CartQuantity";
import CartPriceQuantity from "./cart/CartPriceQuantity";

const PopularCombo = ({
  popularCombo,
  addToCart,
  minusToCart,
  PlusToCart,
  cartDetails,
}) => {
  return (
    <>
      <section className="hv1-menu-area s-py-50 bg-overlay">
        <div className="container">
          <div className="section-title">
            <h2>Most Popular Combo</h2>
            <span></span>
            <span></span>
          </div>
          <div className="hv1-menu-wrapper">
            {popularCombo?.map((combo) => (
              <div className="single-hv1-menu" key={combo._id}>
                <div className="image">
                  <img
                    src={
                      combo.itemImage
                        ? `${process.env.REACT_APP_BACKEND}uploads/items/${combo.itemImage}`
                        : `${process.env.REACT_APP_BACKEND}uploads/dummy/no-image.png`
                    }
                    alt={combo.name}
                  />
                </div>
                <div className="content">
                  <h4>{combo.name}</h4>
                </div>
                <div className="quantity add-cart-block">
                  <div className="price-and-cart">
                    <CartQuantity
                      combo={combo}
                      addToCart={addToCart}
                      minusToCart={minusToCart}
                      PlusToCart={PlusToCart}
                      cartDetails={cartDetails}
                    />
                    <CartPriceQuantity
                      combo={combo}
                      addToCart={addToCart}
                      minusToCart={minusToCart}
                      PlusToCart={PlusToCart}
                      cartDetails={cartDetails}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularCombo;
