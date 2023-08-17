import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import Table from "react-bootstrap/Table";
import toast from "react-hot-toast";
import axios from "axios";
import Formatdate from "../../../common/Formatdate";
import QuantityForm from "./QuantityForm";
const Quantity = () => {
  const [quantity, setQuantity] = useState([]);
  const [name, setName] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [quantityId, setQuantityId] = useState("");
  const [flag, setFlag] = useState(false);
  var count = 0;

  //get all quantity
  const getAllQuantity = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/quantity/get-quantity`
      );
      if (data?.success) {
        setQuantity(data?.quantity);
      }
    } catch (error) {
      toast.error("Something went wrong while getting quantity");
    }
  };

  useEffect(() => {
    getAllQuantity();
  }, []);

  //handle Form
  const handleInsert = async (e) => {
    setFlag(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}api/v1/quantity/create-quantity`,
        {
          name,
          nameValue,
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        setNameValue("");
        getAllQuantity();
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

  //get single quantity
  const getSingleQuantity = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/quantity/single-quantity/${id}`
      );
      if (data.success) {
        setName(data.quantity.name);
        setNameValue(data.quantity.nameValue);
        setQuantityId(data.quantity._id);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //update quantity
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND}api/v1/quantity/update-quantity/${quantityId}`,
        { name, nameValue }
      );
      if (data.success) {
        toast.success(`${name} is updated`);
        setName("");
        setNameValue("");
        setQuantityId("");
        getAllQuantity();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //delete quantity
  const deleteQuantity = async (id) => {
    if (window.confirm("Do you really want to delete this quantity?")) {
      try {
        const { data } = await axios.delete(
          `${process.env.REACT_APP_BACKEND}api/v1/quantity/delete-quantity/${id}`
        );
        if (data.success) {
          toast.success(`Quantity is deleted`);
          getAllQuantity();
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Layout title="Quantity">
      <div className="form-box">
        <QuantityForm
          handleAction={quantityId === "" ? handleInsert : handleUpdate}
          name={name}
          setName={setName}
          nameValue={nameValue}
          setNameValue={setNameValue}
          quantityId={quantityId}
          flag={flag}
        />
      </div>
      <div className="add-block">
        <h3>Quantity</h3>
      </div>
      <div className="stricky-table">
        {" "}
        <Table className="table-design table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {quantity?.map((c) => (
              <tr key={c._id}>
                <td>{++count}</td>
                <td>{c.name}</td>
                <td>{Formatdate(new Date(c.createdAt))}</td>
                <td>{Formatdate(new Date(c.updatedAt))}</td>
                <td>
                  <button
                    className="btn custom-btn me-1 btn-sm mb-1"
                    onClick={() => getSingleQuantity(c._id)}
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button
                    className="btn custom-btn me-1 btn-sm mb-1"
                    onClick={() => deleteQuantity(c._id)}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default Quantity;
