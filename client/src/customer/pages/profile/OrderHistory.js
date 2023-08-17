import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Formatdate from "../../../common/Formatdate";
const OrderHistory = ({ orderId }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  //get order history
  const getOrderHistory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/order/get-order-history-customer/${orderId}`
      );
      if (data?.success) {
        setOrderHistory(data?.orderHistory);
      }
    } catch (error) {
      toast.error("Something went wrong while getting order history");
    }
  };
  useEffect(() => {
    getOrderHistory();
  }, []);
  return (
    <>
      <div className="order-map order-map-custom">
        {orderHistory?.map((o) => (
          <div className="single-oMap active" key={o.statusId._id}>
            <h6>{o.statusId.name}</h6>
            <div className="dot"></div>
            <p>{Formatdate(new Date(o.statusId.createdAt))}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderHistory;
