import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import toast from "react-hot-toast";
import Formatdate from "../../../common/Formatdate";
const OrderHistoryModal = ({
  basicModalH,
  setBasicModalH,
  toggleShowH,
  orderId,
  userId,
  getAllOrder,
}) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [orderStatusId, setOrderStatusId] = useState("");
  const [flag, setFlag] = useState(false);
  //get order history
  const getOrderHistory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/order/get-order-history/${orderId}`
      );
      if (data?.success) {
        setOrderHistory(data?.orderHistory);
      }
    } catch (error) {
      toast.error("Something went wrong while getting order history");
    }
  };

  //get order status
  const getOrderStatus = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/order/get-order-status`
      );
      if (data?.success) {
        setOrderStatus(data?.orderStatus);
      }
    } catch (error) {
      toast.error("Something went wrong while getting order history");
    }
  };

  useEffect(() => {
    if (orderId) getOrderHistory();
    getOrderStatus();
  }, [orderId]);

  const saveOrderHistory = async (e) => {
    setFlag(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}api/v1/order/update-order-history`,
        {
          orderId,
          orderStatusId,
          userId,
        }
      );
      if (data?.success) {
        toast.success(data.message);
        setOrderStatusId("");
        getOrderHistory();
        getAllOrder();
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
  return (
    <>
      <MDBModal show={basicModalH} setShow={setBasicModalH} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Order History</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShowH}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={saveOrderHistory}>
                <div className="row justify-content-start">
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <div className="c-block">
                      <label htmlFor="statusId">Order Status</label>
                      <select
                        id="statusId"
                        value={orderStatusId}
                        onChange={(e) => setOrderStatusId(e.target.value)}
                      >
                        <option value="">Select</option>
                        {orderStatus?.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                    <div className="c-block">
                      <button
                        type="submit"
                        className="btn custom-btn"
                        disabled={flag}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="stricky-table">
                <table className="table-design table-responsive table">
                  <thead className="thead-dark">
                    <tr>
                      <th>Status</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderHistory?.map((o) => (
                      <tr key={o._id}>
                        <td>{o.statusId.name}</td>
                        <td>{Formatdate(new Date(o.createdAt))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={toggleShowH}
                className="custom-btn"
              >
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default OrderHistoryModal;
