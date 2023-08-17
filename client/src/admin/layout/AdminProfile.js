import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../contextapi/AdminContext";
const AdminProfile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gstn, setGstn] = useState("");
  const [mobile, setMobile] = useState("");
  const id = auth.user?._id;

  // get data on update
  const getSingleProfile = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/auth/profile/${id}`
      );
      if (data?.success) {
        setEmail(data?.user?.email);
        setName(data?.user?.name);
        setAddress(data?.user?.address);
        setMobile(data?.user?.mobile);
        setGstn(data?.user?.gstn);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getSingleProfile();
  }, []);

  const handleAction = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}api/v1/auth/update-profile`,
        {
          id,
          name,
          address,
          mobile,
          gstn,
        }
      );
      if (data?.success) {
        toast.success(`${name} is updated`);
        getSingleProfile();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout title="Profile">
      <div className="add-block">
        <h3>Profile</h3>
      </div>
      <Form onSubmit={handleAction}>
        <div className="row justify-content-start">
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
            <div className="c-block">
              <label htmlFor="email">Email</label>
              <input
                className="admin-profile-input"
                id="email"
                type="text"
                value={email}
                onChange={(e) => setAddress(e.target.value)}
                readOnly
              />
            </div>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
            <div className="c-block">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <div className="c-block">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
            <div className="c-block">
              <label htmlFor="mobile">Mobile</label>
              <input
                id="mobile"
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
            <div className="c-block">
              <label htmlFor="gstn">GSTN</label>
              <input
                id="gstn"
                type="text"
                value={gstn}
                onChange={(e) => setGstn(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12">
            <div className="c-block">
              <button type="submit" className="btn custom-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      </Form>
    </Layout>
  );
};

export default AdminProfile;
