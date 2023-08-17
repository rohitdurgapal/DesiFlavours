import React, { useState, useEffect } from "react";
import CartQuantity from "./cart/CartQuantity";
import CartPriceQuantity from "./cart/CartPriceQuantity";
const CustomerItem = ({
  item,
  addToCart,
  minusToCart,
  PlusToCart,
  cartDetails,
  category,
  subcategory,
}) => {
  const [searchItem, setSearchItem] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [storeItem, setStoreItem] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    const data = item;
    const result = data.filter((d) =>
      d.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setStoreItem(result);
    setLoading(false);
  };

  const handleCategory = (c) => {
    setCategoryId(c);
    const data = item;
    setLoading(true);
    if (c === "") {
      setStoreItem(data);
    } else {
      const result = data.filter((d) => d.categoryId._id === c);
      setStoreItem(result);
    }
    setLoading(false);
  };

  const handleSubCategory = (s) => {
    setSubCategoryId(s);
    const data = item;
    setLoading(true);
    if (s === "") {
      setStoreItem(data);
    } else {
      const result = data.filter((d) => d.subCategoryId._id === s);
      setStoreItem(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    setStoreItem(item);
  }, [item]);

  return (
    <>
      <section className="hv1-menu-area s-py-50 bg-overlay">
        <div className="container">
          <div className="section-title">
            <h2>Menu</h2>
            <span></span>
            <span></span>
          </div>
          <div className="shop-v1-topBar">
            <div className="search">
              <div className="input-fild">
                <input
                  type="text"
                  placeholder="SEARCH ITEM..."
                  onChange={(e) => setSearchItem(e.target.value)}
                />
                <button onClick={handleSearch}>
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div className="search">
              <div className="input-fild">
                <select
                  id="categoryId"
                  value={categoryId}
                  onChange={(e) => handleCategory(e.target.value)}
                >
                  <option value="">ALL CATEGORIES</option>
                  {category?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="search">
              <div className="input-fild">
                <select
                  id="subCcategoryId"
                  value={subCategoryId}
                  onChange={(e) => handleSubCategory(e.target.value)}
                >
                  <option value="">ALL SUB CATEGORIES</option>
                  {subcategory?.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="hv1-menu-wrapper">
            {loading ? (
              <h3>Loading</h3>
            ) : (
              storeItem?.map((combo) => (
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
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerItem;
