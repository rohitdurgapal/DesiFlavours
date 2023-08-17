import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contextapi/AdminContext";
import axios from "axios";
import Spinner from "./Spinner";

const AdminCheck = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    setAuth(auth);
    const authCheck = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND}api/v1/auth/admin-auth`);
      if (res.data.ok === true) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok === true ? <Outlet /> : <Spinner />;
};
export default AdminCheck;
