import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import Table from "react-bootstrap/Table";
import toast from "react-hot-toast";
import axios from "axios";
import Formatdate from "../../../common/Formatdate";
import SubCategoryForm from "./SubCategoryForm";
const SubCategory = () => {
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubCategoryId] = useState("");
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

  //get all sub-category
  const getAllSubCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/sub-category/get-sub-category`
      );
      if (data?.success) {
        setSubCategory(data?.subcategory);
      }
    } catch (error) {
      toast.error("Something went wrong while getting sub category");
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllSubCategory();
  }, []);

  //handle Form
  const handleInsert = async (e) => {
    setFlag(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}api/v1/sub-category/create-sub-category`,
        {
          categoryId,
          name,
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        setCategoryId("");
        setSubCategoryId("");
        getAllSubCategory();
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

  //get single sub-category
  const getSingleSubCategory = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/sub-category/single-sub-category/${id}`
      );
      if (data.success) {
        setName(data.subcategory.name);
        setCategoryId(data.subcategory.categoryId);
        setSubCategoryId(data.subcategory._id);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //update sub-category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND}api/v1/sub-category/update-sub-category/${subcategoryId}`,
        { categoryId, name }
      );
      if (data.success) {
        toast.success(`${name} is updated`);
        setName("");
        setCategoryId("");
        setSubCategoryId("");
        getAllSubCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //delete sub-category
  const deleteSubCategory = async (id) => {
    if (window.confirm("Do you really want to delete this sub category?")) {
      try {
        const { data } = await axios.delete(
          `${process.env.REACT_APP_BACKEND}api/v1/sub-category/delete-sub-category/${id}`
        );
        if (data.success) {
          toast.success(`Sub category is deleted`);
          getAllSubCategory();
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Layout title="Sub Category">
      <div className="form-box">
        <SubCategoryForm
          handleAction={subcategoryId === "" ? handleInsert : handleUpdate}
          name={name}
          setName={setName}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          subcategoryId={subcategoryId}
          flag={flag}
          category={category}
        />
      </div>
      <div className="add-block">
        <h3>Sub Category</h3>
      </div>
      <div className="stricky-table">
        {" "}
        <Table className="table-design table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subcategory?.map((c) => (
              <tr key={c._id}>
                <td>{++count}</td>
                <td>{c.name}</td>
                <td>{c.categoryId.name}</td>
                <td>{Formatdate(new Date(c.createdAt))}</td>
                <td>{Formatdate(new Date(c.updatedAt))}</td>
                <td>
                  <button
                    className="btn custom-btn me-1 btn-sm mb-1"
                    onClick={() => getSingleSubCategory(c._id)}
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button
                    className="btn custom-btn me-1 btn-sm mb-1"
                    onClick={() => deleteSubCategory(c._id)}
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

export default SubCategory;
