import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Formatdate from "../../../common/Formatdate";
import SaleRestaurantModal from "./SaleRestaurantModal";
const Sales = () => {
  const toggleShowR = () => setBasicModalR(!basicModalR);
  const [saleId, setSaleId] = useState("");
  const [sales, setSales] = useState([]);
  const [basicModalR, setBasicModalR] = useState(false);
  var count = 0;
  //get all sale
  const getAllSale = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/sales/get-sale`
      );
      if (data?.success) {
        setSales(data?.sale);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting sales");
    }
  };

  useEffect(() => {
    getAllSale();
  }, []);

  //delete sale
  const deleteSale = async (id) => {
    if (window.confirm("Do you really want to delete this sale?")) {
      try {
        const { data } = await axios.delete(
          `${process.env.REACT_APP_BACKEND}api/v1/sales/delete-sale/${id}`
        );
        if (data.success) {
          toast.success(`Sale is deleted`);
          getAllSale();
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  const changeRestaurant = (saleId) => {
    setBasicModalR(!basicModalR);
    setSaleId(saleId);
  };

  return (
    <Layout title="Sales">
      <div className="add-block">
        <h3>Sales</h3>
        <Link to="/admin/sales/add" className="btn custom-btn">
          Add
        </Link>
      </div>
      <div className="stricky-table">
        {" "}
        <Table className="table-design table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Sale Id</th>
              <th>Customer</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Total</th>
              <th>Discount</th>
              <th>Net Price</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sales?.map((c) => (
              <tr key={c._id}>
                <td>{++count}</td>
                <td>
                  #SAL00{c.sale_id}{" "}
                  <span className="restaurant-span">{c.restaurantId.name}</span>
                </td>
                <td>{c.name}</td>
                <td>{c.mobile}</td>
                <td>{c.address}</td>
                <td>{c.total}</td>
                <td>{c.discount}</td>
                <td>{c.netPrice}</td>
                <td>{Formatdate(new Date(c.createdAt))}</td>
                <td>{Formatdate(new Date(c.updatedAt))}</td>
                <td>
                  <button
                    className="btn custom-btn me-1 btn-sm mb-1"
                    onClick={() => changeRestaurant(c._id)}
                  >
                    <i className="fa fa-cutlery" aria-hidden="true"></i>
                  </button>
                  <NavLink
                    to={`/admin/sales/print-bill/${c._id}`}
                    className="btn custom-btn me-1 btn-sm mb-1"
                  >
                    <i className="fa fa-print" aria-hidden="true"></i>
                  </NavLink>
                  <NavLink
                    to={`/admin/sales/update/${c._id}`}
                    className="btn custom-btn me-1 btn-sm mb-1"
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </NavLink>
                  <button
                    className="btn custom-btn me-1 btn-sm mb-1"
                    onClick={() => deleteSale(c._id)}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="admin-modal">
        <SaleRestaurantModal
          basicModalR={basicModalR}
          setBasicModalR={setBasicModalR}
          toggleShowR={toggleShowR}
          saleId={saleId}
          getAllSale={getAllSale}
        />
      </div>
    </Layout>
  );
};

export default Sales;
