import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const Profile = () => {
  const [address, setAddress] = useState([]);
  const [name, setName] = useState("");
  const [addressId, setAddressId] = useState("");
  const [userId, setUserId] = useState(
    useSelector((state) => state.customer[0].user._id)
  );
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [flag, setFlag] = useState(false);

  // get profile
  const getProfile = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/profile/get-profile/${userId}`
      );
      if (data?.success) {
        setCustomerName(data?.user.name);
        setCustomerMobile(data?.user.mobile);
      }
    } catch (error) {
      toast.error("Something went wrong while getting profile");
    }
  };

  // update profile
  const profileUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND}api/v1/profile/update-profile/${userId}`,
        { name: customerName }
      );
      if (data.success) {
        toast.success(`${customerName} is updated`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //get all address
  const getAllAddress = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/profile/get-address/${userId}`
      );
      if (data?.success) {
        setAddress(data?.address);
      }
    } catch (error) {
      toast.error("Something went wrong while getting address");
    }
  };

  // handle Form
  const handleInsert = async (e) => {
    setFlag(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}api/v1/profile/create-address`,
        {
          name,
          userId,
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        getAllAddress();
        setFlag(false);
      } else {
        toast.error(data.message);
        setFlag(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setFlag(false);
    }
  };

  //get single address
  const getSingleAddress = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/profile/single-address/${id}`
      );
      if (data.success) {
        setName(data.address.name);
        setAddressId(data.address._id);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //update address
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND}api/v1/profile/update-address/${addressId}`,
        { name }
      );
      if (data.success) {
        toast.success(`${name} is updated`);
        setName("");
        setAddressId("");
        getAllAddress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //delete address
  const deleteAddress = async (id) => {
    if (window.confirm("Do you really want to delete this address?")) {
      try {
        const { data } = await axios.delete(
          `${process.env.REACT_APP_BACKEND}api/v1/profile/delete-address/${id}`
        );
        if (data.success) {
          toast.success(`Address is deleted`);
          setName("");
          getAllAddress();
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    setUserId(userId);
    getProfile();
    getAllAddress();
  }, []);
  return (
    <>
      <Layout title="Profile">
        <section className="banner-area relative">
          <div className="container">
            <div className="banner-wrapper">
              <div className="section-title">
                <h2>My Profile</h2>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </section>
        <section className="profile-area s-py-50">
          <div className="profile-wrapper">
            <div className="container">
              <form onSubmit={profileUpdate}>
                <div className="row">
                  <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 input-box mb-30 mb-sm-20">
                    <label>Mobile</label>
                    <div className="input-fild">
                      <input
                        type="text"
                        value={customerMobile}
                        readOnly
                        className="mobile-no-design"
                      />
                      <button>
                        <i className="fa fa-phone" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 input-box mb-30 mb-sm-20">
                    <label>Name</label>
                    <div className="input-fild">
                      <input
                        type="text"
                        placeholder="Enter your Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                      <button>
                        <i className="fa fa-user" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 input-box mb-30 mb-sm-20">
                    <button
                      type="submit"
                      className="btn custom-profile-btn"
                      disabled={flag}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="banner-area relative">
          <div className="container">
            <div className="banner-wrapper">
              <div className="section-title">
                <h2>My Address</h2>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </section>
        <section className="profile-area s-py-50">
          <div className="profile-wrapper">
            <div className="container">
              <form onSubmit={addressId ? handleUpdate : handleInsert}>
                <div className="row">
                  <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 input-box mb-30 mb-sm-20">
                    <label>Address</label>
                    <div className="input-fild">
                      <input
                        type="text"
                        placeholder="Enter your Address"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <button>
                        <i
                          className="fa fa-address-card"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12 input-box mb-30 mb-sm-20">
                    <button
                      type="submit"
                      className="btn custom-profile-btn"
                      disabled={flag}
                    >
                      {addressId ? "Update" : "Add"}
                    </button>
                  </div>
                </div>
              </form>
              <div className="mp-history-wrapper s-pt-70">
                <div className="title">
                  <h2>My Addresses</h2>
                </div>
                <table id="mp-hstry-table" className="responsive nowrap">
                  <thead className="table-header">
                    <tr>
                      <th>Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {address?.map((a) => (
                      <tr key={a._id}>
                        <td>
                          <div className="pdct-info">
                            <h4>{a.name}</h4>
                          </div>
                        </td>
                        <td>
                          <button
                            className="btn custom-btn me-1 btn-sm mb-1"
                            onClick={() => getSingleAddress(a._id)}
                          >
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                          </button>
                          <button
                            className="btn custom-btn me-1 btn-sm mb-1"
                            onClick={() => deleteAddress(a._id)}
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Profile;
