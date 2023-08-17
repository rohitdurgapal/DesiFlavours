import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Formatdate from "../../../common/Formatdate";
import OrderHistory from "./OrderHistory";
import { NavLink } from "react-router-dom";
const MyOrder = () => {
  const [order, setOrder] = useState([]);
  const [userId, setUserId] = useState(
    useSelector((state) => state.customer[0].user._id)
  );
  //get all order
  const getAllOrder = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/order/get-order/${userId}`
      );
      if (data?.success) {
        setOrder(data?.orderByCustomer);
      }
    } catch (error) {
      toast.error("Something went wrong while getting order");
    }
  };
  useEffect(() => {
    getAllOrder();
  }, []);
  return (
    <>
      <Layout title="Order">
        <section className="banner-area relative">
          <div className="container">
            <div className="banner-wrapper">
              <div className="section-title">
                <h2>My Order</h2>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </section>
        <section className="order-status-area s-py-50">
          <div className="container">
            <div className="order-status">
              <div className="os-wrapper">
                {order?.map((c) => (
                  <div className="single-os-wrap" key={c._id}>
                    <div className="os-content">
                      <div className="stricky-table">
                        {" "}
                        <table className="table-design table-responsive table-design-customer">
                          <thead className="thead-dark">
                            <tr key={c._id}>
                              <th>Name</th>
                              <th>Mobile</th>
                              <th>Address</th>
                              <th>Total</th>
                              <th>Discount</th>
                              <th>Net Price</th>
                              <th>Order Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr key={c._id}>
                              <td>{c.userId.name}</td>
                              <td>{c.userId.mobile}</td>
                              <td>{c.addressId.name}</td>
                              <td>{c.total}</td>
                              <td>{c.discount}</td>
                              <td>{c.netPrice}</td>
                              <td>{Formatdate(new Date(c.createdAt))}</td>
                              <td>
                                <NavLink
                                  to={`/customer/order/bill/${c._id}`}
                                  className="btn custom-btn me-1 btn-sm mb-1"
                                >
                                  <i
                                    className="fa fa-print"
                                    aria-hidden="true"
                                  ></i>
                                </NavLink>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <OrderHistory orderId={c._id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default MyOrder;
