import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import axios from "axios";
import Spinner from "./Spinner";

const CustomerCheck = () => {
  const customerDetails = useSelector((state) => state.customer, shallowEqual);
  axios.defaults.headers.common["Authorization1"] = customerDetails[0]?.token;
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/sign-in/customer-auth`
      );
      if (res.data.ok === true) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (customerDetails[0]?.token) authCheck();
  }, [customerDetails[0]?.token]);

  return ok === true ? <Outlet /> : <Spinner />;
};
export default CustomerCheck;
