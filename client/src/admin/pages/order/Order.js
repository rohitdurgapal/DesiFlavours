import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import Table from "react-bootstrap/Table";
import toast from "react-hot-toast";
import axios from "axios";
import Formatdate from "../../../common/Formatdate";
import ItemModal from "./ItemModal";
import OrderHistoryModal from "./OrderHistoryModal";
import OrderRestaurantModal from "./OrderRestaurantModal";
import { NavLink } from "react-router-dom";
const Order = () => {
  const [order, setOrder] = useState([]);
  var count = 0;
  const [items, setItems] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [userId, setUserId] = useState("");
  const [basicModal, setBasicModal] = useState(false);
  const [basicModalH, setBasicModalH] = useState(false);
  const [basicModalR, setBasicModalR] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  const toggleShowH = () => setBasicModalH(!basicModalH);
  const toggleShowR = () => setBasicModalR(!basicModalR);
  const showItems = (items) => {
    setBasicModal(!basicModal);
    setItems(items);
  };
  const showOrderHistory = (orderId, userId) => {
    setBasicModalH(!basicModalH);
    setOrderId(orderId);
    setUserId(userId);
  };
  const changeRestaurant = (orderId) => {
    setBasicModalR(!basicModalR);
    setOrderId(orderId);
  };

  //get all order
  const getAllOrder = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/order/get-order`
      );
      if (data?.success) {
        setOrder(data?.order);
      }
    } catch (error) {
      toast.error("Something went wrong while getting order");
    }
  };

  const playNotification = () => {
    let song = new Audio(`${process.env.REACT_APP_URL}notification.mp3`);
    song.play();
  };

  const getOrderCount = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/order/get-order-count`
      );
      if (data?.success) {
        setOrderCount(data?.orderCount);
        // if (data?.orderCount > 0) {
        //   playNotification();
        // }
      }
    } catch (error) {
      toast.error("Something went wrong while getting order count");
    }
  };

  // setInterval(() => {
  //   getOrderCount();
  // }, 300000);

  const updateOrder = () => {
    getAllOrder();
  };

  useEffect(() => {
    getAllOrder();
    getOrderCount();
  }, []);

  return (
    <Layout title="Order">
      <div className="form-box"></div>
      <div className="add-block">
        <h3>Order</h3>
        <button onClick={updateOrder} className="btn btn-custom custom-btn ">
          New Order<span>{orderCount}</span>
        </button>
      </div>
      <div className="stricky-table">
        {" "}
        <Table className="table-design table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Order Id</th>
              <th>Status</th>
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
            {order?.map((c) => (
              <tr key={c._id}>
                <td>{++count}</td>
                <td>
                  #ORD00{c.order_id}{" "}
                  <span className="restaurant-span">{c.restaurantId.name}</span>
                </td>
                <td>
                  <span
                    className={
                      c.statusId._id === "64c78c2cbd2af1179d1f2040"
                        ? "hfjhiueiu placed-bg"
                        : c.statusId._id === "64c78c32bd2af1179d1f2042"
                        ? "hfjhiueiu accepted-bg"
                        : c.statusId._id === "64c78c37bd2af1179d1f2044"
                        ? "hfjhiueiu rejected-bg"
                        : c.statusId._id === "64c78c3dbd2af1179d1f2046"
                        ? "hfjhiueiu deliverd-bg"
                        : ""
                    }
                  >
                    {c.statusId.name}
                  </span>
                </td>
                <td>{c.userId.name}</td>
                <td>{c.userId.mobile}</td>
                <td>{c.addressId.name}</td>
                <td>{c.total}</td>
                <td>{c.discount}</td>
                <td>{c.netPrice}</td>
                <td>{Formatdate(new Date(c.createdAt))}</td>
                <td>
                  <button
                    className="btn custom-btn me-1 btn-sm mb-1"
                    onClick={() => showItems(c.items)}
                  >
                    <i className="fa fa-list" aria-hidden="true"></i>
                  </button>
                  <button
                    className="btn custom-btn me-1 btn-sm mb-1"
                    onClick={() => showOrderHistory(c._id, c.userId)}
                  >
                    <i className="fa fa-history" aria-hidden="true"></i>
                  </button>
                  <button
                    className="btn custom-btn me-1 btn-sm mb-1"
                    onClick={() => changeRestaurant(c._id)}
                  >
                    <i className="fa fa-cutlery" aria-hidden="true"></i>
                  </button>

                  <NavLink
                    to={`/admin/order/print-bill/${c._id}`}
                    className="btn custom-btn me-1 btn-sm mb-1"
                  >
                    <i className="fa fa-print" aria-hidden="true"></i>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="admin-modal">
        <ItemModal
          basicModal={basicModal}
          setBasicModal={setBasicModal}
          toggleShow={toggleShow}
          items={items}
        />
        <OrderHistoryModal
          basicModalH={basicModalH}
          setBasicModalH={setBasicModalH}
          toggleShowH={toggleShowH}
          orderId={orderId}
          userId={userId}
          getAllOrder={getAllOrder}
        />
        <OrderRestaurantModal
          basicModalR={basicModalR}
          setBasicModalR={setBasicModalR}
          toggleShowR={toggleShowR}
          orderId={orderId}
          getAllOrder={getAllOrder}
        />
      </div>
    </Layout>
  );
};

export default Order;
