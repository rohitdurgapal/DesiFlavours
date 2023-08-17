import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import Table from "react-bootstrap/Table";
import toast from "react-hot-toast";
import axios from "axios";
import Formatdate from "../../../common/Formatdate";
import CategoryForm from "./CategoryForm";
const Category = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [flag, setFlag] = useState(false);
  var count = 0;

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/category/get-category`
      );
      if (data?.success) {
        setCategory(data?.category);
      }
    } catch (error) {
      toast.error("Something went wrong while getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //handle Form
  const handleInsert = async (e) => {
    setFlag(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}api/v1/category/create-category`,
        {
          name,
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        setCategoryId("");
        getAllCategory();
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

  //get single category
  const getSingleCategory = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/category/single-category/${id}`
      );
      if (data.success) {
        setName(data.category.name);
        setCategoryId(data.category._id);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND}api/v1/category/update-category/${categoryId}`,
        { name }
      );
      if (data.success) {
        toast.success(`${name} is updated`);
        setName("");
        setCategoryId("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //delete category
  const deleteCategory = async (id) => {
    if (window.confirm("Do you really want to delete this category?")) {
      try {
        const { data } = await axios.delete(
          `${process.env.REACT_APP_BACKEND}api/v1/category/delete-category/${id}`
        );
        if (data.success) {
          toast.success(`Category is deleted`);
          getAllCategory();
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Layout title="Category">
      <div className="form-box">
        <CategoryForm
          handleAction={categoryId === "" ? handleInsert : handleUpdate}
          name={name}
          setName={setName}
          categoryId={categoryId}
          flag={flag}
        />
      </div>
      <div className="add-block">
        <h3>Category</h3>
      </div>
      <div className="stricky-table">
        {" "}
        <Table className="table-design table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {category?.map((c) => (
              <tr key={c._id}>
                <td>{++count}</td>
                <td>{c.name}</td>
                <td>{Formatdate(new Date(c.createdAt))}</td>
                <td>{Formatdate(new Date(c.updatedAt))}</td>
                <td>
                  <button
                    className="btn custom-btn me-1 btn-sm mb-1"
                    onClick={() => getSingleCategory(c._id)}
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button
                    className="btn custom-btn me-1 btn-sm mb-1"
                    onClick={() => deleteCategory(c._id)}
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

export default Category;
