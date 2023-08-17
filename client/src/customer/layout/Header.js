import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { minus, plus } from "../../redux/cartSlice";
import { addLogin, addLogout } from "../../redux/customerSlice";
import { NavLink, useNavigate } from "react-router-dom";
import HeaderCheckout from "./HeaderCheckout";
import ContactDetails from "./ContactDetails";
import Login from "../auth/Login";
import axios from "axios";
const Header = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [loginFlag, setLoginFlag] = useState(false);
  const [cart, setCart] = useState(false);
  const [contactFlag, setContactFlag] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [blockStatus, setBlockStatus] = useState(1);
  const [flag, setFlag] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const loadMenu = () => {
    setMenu(!menu);
  };
  const showAccountLink = () => {
    setMyProfile(!myProfile);
  };
  const showCart = () => {
    setCart(!cart);
  };
  const showLogin = () => {
    setLoginFlag(!loginFlag);
    setBlockStatus(1);
  };
  const showContact = () => {
    setContactFlag(!contactFlag);
  };
  // redux
  const dispatch = useDispatch();
  const cartDetails = useSelector((state) => state.cart, shallowEqual);
  const customerDetails = useSelector((state) => state.customer, shallowEqual);
  //set header for customer routes
  axios.defaults.headers.common["Authorization1"] = customerDetails[0]?.token;
  // console.log("cartDetails", cartDetails);
  // console.log("customerDetails", customerDetails);

  // add remove cart feature
  const minusToCart = (item) => {
    dispatch(minus(item));
  };
  const PlusToCart = (item) => {
    dispatch(plus(item));
  };
  const addCustomerDetails = (customer) => {
    dispatch(addLogin(customer));
  };
  const logoutCustomer = () => {
    dispatch(addLogout());
    navigate("/");
  };
  const calculateTotalCount = () => {
    let totalCountCart = 0;
    let totalPriceCart = 0;
    cartDetails.forEach((i) => {
      totalCountCart += i.count;
      totalPriceCart += i.price * i.count;
    });
    setTotalCount(totalCountCart);
    setTotalPrice(totalPriceCart);
  };
  useEffect(() => {
    calculateTotalCount();
  }, [cartDetails]);
  return (
    <>
      <header className="header-area">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo">
              <NavLink to="/">
                <img
                  src={`${process.env.REACT_APP_URL}/logo-xs.png`}
                  alt="Desi Flavours"
                />
              </NavLink>
            </div>
            <div className={menu ? "main-menu active" : "main-menu"}>
              <ul>
                <li>
                  <NavLink to="/" data-text="MENU" end>
                    <span>MENU</span>
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="header-right">
              <div className="hdr-cart-dtls" onClick={showContact}>
                <div className="hdr-cart">
                  <i className="fa fa-address-book" aria-hidden="true"></i>{" "}
                </div>
              </div>
              <ContactDetails
                contactFlag={contactFlag}
                showContact={showContact}
              />
              <div className="hdr-cart-dtls" onClick={showCart}>
                <div className="hdr-cart">
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>{" "}
                  {totalCount !== 0 ? <span>{totalCount}</span> : ""}
                </div>
              </div>
              <HeaderCheckout
                cart={cart}
                showCart={showCart}
                minusToCart={minusToCart}
                PlusToCart={PlusToCart}
                totalPrice={totalPrice}
                showLogin={showLogin}
              />
              <div className="lgn-rgstr custom-lgn-rgstr">
                {customerDetails[0]?.success ? (
                  <div className="my-profile-block">
                    <button
                      className="btn btn-skew-y btn-skew-yy l-gray-btn"
                      data-text="Account"
                      onClick={showAccountLink}
                    >
                      <span>Account</span>
                    </button>
                    {myProfile ? (
                      <ul className="my-profile-sub-menu">
                        <li>
                          <NavLink to="/customer" data-text="Home v.1">
                            <span>My Profile</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/customer/order" data-text="Home v.1">
                            <span>My Order</span>
                          </NavLink>
                        </li>
                        <li>
                          <div onClick={logoutCustomer}>
                            <span>Logout</span>
                          </div>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  <button
                    className="btn btn-skew-y"
                    data-text="Login"
                    onClick={showLogin}
                  >
                    <span>Login</span>
                  </button>
                )}
              </div>
              <Login
                loginFlag={loginFlag}
                showLogin={showLogin}
                blockStatus={blockStatus}
                setBlockStatus={setBlockStatus}
                addCustomerDetails={addCustomerDetails}
                flag={flag}
                setFlag={setFlag}
              />
              <div className="hamgurger">
                <ul
                  className={menu ? "hmbrgr-icon active" : "hmbrgr-icon"}
                  onClick={loadMenu}
                >
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
