import React, { useState, useEffect } from "react";
import CartHeaderModalPrice from "../pages/home/cart/CartHeaderModalPrice";
import EmptyCart from "../pages/home/cart/EmptyCart";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { remove } from "../../redux/cartSlice";
const HeaderCheckout = ({
  cart,
  showCart,
  minusToCart,
  PlusToCart,
  totalPrice,
  showLogin,
}) => {
  const dispatch = useDispatch();
  const cartDetails = useSelector((state) => state.cart, shallowEqual);
  const customerDetails = useSelector((state) => state.customer, shallowEqual);
  const userId = customerDetails[0]?.user._id;
  const [customerInfo, setCustomerInfo] = useState([]);
  const [address, setAddress] = useState([]);
  const [addressId, setAddressId] = useState("");
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  // get profile
  const getProfile = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/profile/get-profile/${userId}`
      );
      if (data?.success) {
        setCustomerInfo(data.user);
        getAllAddress();
      }
    } catch (error) {
      toast.error("Something went wrong while getting profile");
    }
  };

  const getAllAddress = async () => {
    try {
      if (address) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND}api/v1/profile/get-address/${userId}`
        );
        if (data?.success) {
          setAddress(data?.address);
        }
      }
    } catch (error) {
      toast.error("Something went wrong while getting address");
    }
  };

  useEffect(() => {
    if (userId) {
      getProfile();
    }
  }, [userId]);

  const proceedToPay = async (e) => {
    setFlag(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}api/v1/order/save-order`,
        {
          userId,
          addressId,
          items: cartDetails,
          total: totalPrice,
          discount: 0,
          netPrice: totalPrice,
        }
      );
      if (data?.success) {
        toast.success(`Order is created`);
        dispatch(remove());
        navigate("/customer/order");
      } else {
        toast.error(data.message);
        setFlag(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setFlag(false);
    }
  };

  return (
    <>
      {cart ? (
        <div className="cart-modal">
          <div className="crt-dtls">
            <div className="crt-dtls-inner">
              <h4 className="ljkfsdkjfhias">
                My cart{" "}
                <i
                  className="fa fa-times"
                  aria-hidden="true"
                  onClick={showCart}
                ></i>
              </h4>
              <div className="cart-overflow">
                <div className="cart-overflow-inner">
                  {cartDetails?.length > 0 &&
                    cartDetails?.map((cc) => (
                      <div
                        className="single-crt-dtls"
                        key={`${cc._id}-${cc.quantityId}`}
                      >
                        <div className="img">
                          <img
                            src={
                              cc.itemImage
                                ? `${process.env.REACT_APP_BACKEND}uploads/items/${cc.itemImage}`
                                : `${process.env.REACT_APP_BACKEND}uploads/dummy/no-image.png`
                            }
                            alt={cc.name}
                          />
                        </div>
                        <div className="title">
                          <h6 className="cart-checkout-name" title={cc.name}>
                            {cc.name}
                          </h6>
                          <h6>{cc.quantityName}</h6>
                        </div>
                        <CartHeaderModalPrice
                          cartSingle={cc}
                          minusToCart={minusToCart}
                          PlusToCart={PlusToCart}
                        />
                      </div>
                    ))}
                </div>
                {customerDetails[0]?.success && cartDetails?.length > 0 ? (
                  <div className="customer-details-block">
                    <h6>Customer Details</h6>
                    <p className="pfsdfjdlkfjdlf">
                      Note - Make sure to do payment before place order. Payment
                      will be checked before delivering the order.
                    </p>
                    <div className="customer-inner-block">
                      <div className="customer-inner-block1">
                        <p>Karan Suyal - 9321201795</p>
                        <div className="payment-owner">
                          <img
                            src={`${process.env.REACT_APP_URL}/qr-code.png`}
                            alt="QR Code"
                          />
                        </div>
                      </div>
                      <div className="customer-inner-block2">
                        <p>Customer Info</p>{" "}
                        <div className="customer-info">
                          {customerInfo.name} - {customerInfo.mobile}
                          <div className="customer-address">
                            <select
                              onClick={getAllAddress}
                              value={addressId}
                              onChange={(e) => setAddressId(e.target.value)}
                            >
                              <option>Select Address</option>
                              {address?.map((adr) => (
                                <option key={adr._id} value={adr._id}>
                                  {adr.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {cartDetails?.length > 0 ? (
                <div className="button cart-checkout">
                  <button
                    disabled={flag}
                    className="btn btn-skew-y"
                    data-text={
                      customerDetails[0]?.success ? "Place Order" : "Checkout"
                    }
                    onClick={
                      customerDetails[0]?.success ? proceedToPay : showLogin
                    }
                  >
                    <span>
                      {customerDetails[0]?.success ? "Place Order" : "Checkout"}
                    </span>
                  </button>
                  {totalPrice !== 0 ? (
                    <h2 className="cart-total-price">{totalPrice}</h2>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}

              {cartDetails?.length === 0 ? <EmptyCart /> : ""}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default HeaderCheckout;
