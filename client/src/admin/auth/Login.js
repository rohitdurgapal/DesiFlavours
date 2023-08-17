import React, { useEffect, useState } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBInput } from "mdb-react-ui-kit";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../contextapi/AdminContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    setAuth(auth);
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/auth/admin-auth`
      );
      if (res.data.ok === true) {
        navigate("/admin/");
      } else {
        navigate("/admin/login");
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  const handleForm = async (e) => {
    setFlag(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}api/v1/auth/login`,
        {
          email: user.email,
          password: user.password,
        }
      );
      if (data?.success) {
        toast.success(`${data.user.name} is logged in`);
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        localStorage.setItem("auth", JSON.stringify(data));
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
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
      <Toaster />
      <Helmet>
        <title>Login - Desi Flavours - Admin Panel</title>
      </Helmet>
      <MDBContainer className="p-3 my-5 h-custom">
        <MDBRow className="login-page">
          <MDBCol col="6" md="6" className="login-center">
            <img
              src={`${process.env.REACT_APP_URL}/logo-bg.png`}
              className="img-fluid"
              alt="Desi Flavours"
            />
          </MDBCol>

          <MDBCol col="6" md="6">
            <div className="d-flex flex-row align-items-center justify-content-center">
              <h2 className="login-admin mb-4">
                <span>Admin</span> Panel
              </h2>
            </div>
            <form onSubmit={handleForm}>
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <div className="text-center text-md-start mt-4 pt-2">
                <button
                  className="mb-0 px-5 btn custom-btn"
                  size="lg"
                  type="submit"
                  disabled={flag}
                >
                  Login
                </button>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Login;
