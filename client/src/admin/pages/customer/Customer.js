import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import Table from "react-bootstrap/Table";
import toast from "react-hot-toast";
import axios from "axios";
import Formatdate from "../../../common/Formatdate";
const Customer = () => {
  const [customer, setCustomer] = useState([]);

  var count = 0;

  //get all category
  const getAllCustomer = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/profile/customer-list`
      );
      if (data?.success) {
        setCustomer(data?.customer);
      }
    } catch (error) {
      toast.error("Something went wrong while getting customer");
    }
  };

  useEffect(() => {
    getAllCustomer();
  }, []);

  return (
    <Layout title="Category">
      <div className="add-block">
        <h3>Customer</h3>
      </div>
      <div className="stricky-table">
        {" "}
        <Table className="table-design table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Mobile</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {customer?.map((c) => (
              <tr key={c._id}>
                <td>{++count}</td>
                <td>{c.mobile}</td>
                <td>{c.name}</td>
                <td>{Formatdate(new Date(c.createdAt))}</td>
                <td>{Formatdate(new Date(c.updatedAt))}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default Customer;
