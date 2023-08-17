import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const Login = ({
  loginFlag,
  showLogin,
  blockStatus,
  setBlockStatus,
  addCustomerDetails,
  flag,
  setFlag,
}) => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState({
    mobile: "",
    name: "",
    address: "",
    password: "",
    signFlag: 1,
  });
  const handleMobileVerification = async (e) => {
    setFlag(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}api/v1/sign-in/verify-mobile`,
        {
          mobile: userData.mobile,
        }
      );
      if (data?.success) {
        const { _id } = data.user;
        setUserId(_id);
        if (data.user.hasOwnProperty("name")) {
          setBlockStatus(2);
          setFlag(false);
        } else {
          setBlockStatus(3);
          setUserData({
            ...userData,
            signFlag: 0,
          });
          setFlag(false);
        }
      } else {
        toast.error(data.message);
        setFlag(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setFlag(false);
    }
  };

  const handleLogin = async (e) => {
    setFlag(true);
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND}api/v1/sign-in/login/${userId}`,
        {
          ...userData,
        }
      );
      addCustomerDetails(data);
      setUserData({
        ...userData,
        mobile: "",
        name: "",
        address: "",
        password: "",
        signFlag: 1,
      });
      setFlag(false);
      showLogin(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setFlag(false);
    }
  };
  return (
    <>
      {loginFlag ? (
        <div className="cart-modal">
          <div className="cart-inner-block">
            <div className="ItemVariantModal">
              <div className="hRwjvg">
                <div className="register-box">
                  <div className="title custom-login-class">
                    <h3>
                      Sign In{" "}
                      <i
                        className="fa fa-times crt-dtls-i"
                        aria-hidden="true"
                        onClick={showLogin}
                      ></i>
                    </h3>
                  </div>
                  {blockStatus === 1 ? (
                    <>
                      <div className="input-box mb-30 mb-sm-20">
                        <label>Mobile</label>
                        <div className="input-fild">
                          <input
                            type="number"
                            placeholder="Enter your Mobile"
                            value={userData.mobile}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                mobile: e.target.value,
                              })
                            }
                          />
                          <button>
                            <i className="fa fa-phone" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                      <div className="button mt-30 mt-sm-20">
                        <button
                          onClick={handleMobileVerification}
                          className="btn btn-skew-y"
                          data-text="Next"
                          type="button"
                          disabled={flag}
                        >
                          <span>Next</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {blockStatus === 2 ? (
                    <>
                      <div className="input-box mb-30 mb-sm-20">
                        <label>Password</label>
                        <div className="input-fild">
                          <input
                            type="password"
                            placeholder="Enter your password"
                            value={userData.password}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                password: e.target.value,
                              })
                            }
                          />
                          <button>
                            <i
                              className="fa fa-unlock-alt"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </div>
                      </div>
                      <div className="button mt-30 mt-sm-20">
                        <button
                          onClick={handleLogin}
                          className="btn btn-skew-y"
                          data-text="Login"
                          type="button"
                          disabled={flag}
                        >
                          <span>Login</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {blockStatus === 3 ? (
                    <>
                      <div className="input-box mb-30 mb-sm-20">
                        <label>Name</label>
                        <div className="input-fild">
                          <input
                            type="text"
                            placeholder="Enter your name"
                            value={userData.name}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                name: e.target.value,
                              })
                            }
                          />
                          <button>
                            <i className="fa fa-user" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                      <div className="input-box mb-30 mb-sm-20">
                        <label>Address</label>
                        <div className="input-fild">
                          <input
                            type="text"
                            placeholder="Enter your address"
                            value={userData.address}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                address: e.target.value,
                              })
                            }
                          />
                          <button>
                            <i
                              className="fa fa-address-card"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </div>
                      </div>
                      <div className="input-box mb-30 mb-sm-20">
                        <label>Password</label>
                        <div className="input-fild">
                          <input
                            type="password"
                            placeholder="Enter your password"
                            value={userData.password}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                password: e.target.value,
                              })
                            }
                          />
                          <button>
                            <i
                              className="fa fa-unlock-alt"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </div>
                      </div>
                      <div className="button mt-30 mt-sm-20">
                        <button
                          onClick={handleLogin}
                          className="btn btn-skew-y"
                          data-text="Login"
                          type="button"
                          disabled={flag}
                        >
                          <span>Login</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Login;
