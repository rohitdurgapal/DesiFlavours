import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Formatdate from "../../../common/Formatdate";
import ItemForm from "./ItemForm";
const Item = () => {
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subcategory, setSubCategory] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [quantity, setQuantity] = useState([]);
  const [quantityId, setQuantityId] = useState([]);
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [itemId, setItemId] = useState("");
  const [flag, setFlag] = useState(false);
  const [popularId, setPopularId] = useState(0);
  const [itemImage, setItemImage] = useState("");
  var count = 0;
  var icount = 0;
  const addSelectedItem = (e) => {
    setQuantityId(e);
  };

  const removeSelectedItem = (e) => {
    setQuantityId(e);
    if (e.lenth === 0) {
      setQuantityId([]);
    }
  };

  const updatePrice = (_id, price) => {
    const result = quantityId.map((p) => {
      if (p._id === _id) {
        return { ...p, price };
      } else {
        return p;
      }
    });
    setQuantityId(result);
  };

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

  //get all item
  const getAllItem = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/items/get-item`
      );
      if (data?.success) {
        setItems(data?.item);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting items");
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllSubCategory();
    getAllQuantity();
    getAllItem();
  }, []);

  //handle Form
  const handleInsert = async (e) => {
    setFlag(true);
    e.preventDefault();
    try {
      console.log("popularId", popularId)
      const itemData = new FormData();
      itemData.append("name", name);
      itemData.append("categoryId", categoryId);
      itemData.append("subCategoryId", subCategoryId);
      itemData.append("quantityId", JSON.stringify(quantityId));
      itemData.append("popularId", popularId);
      itemData.append("itemImage", itemImage);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}api/v1/items/create-item`,
        itemData
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        setCategoryId("");
        setSubCategoryId("");
        setQuantityId([]);
        setItemId("");
        getAllItem();
        setFlag(false);
        setPopularId("");
        setItemId("");
        setItemImage("");
      } else {
        toast.error(data.message);
        setFlag(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setFlag(false);
    }
  };

  //get single item
  const getSingleItem = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/items/single-item/${id}`
      );
      if (data.success) {
        setName(data.item.name);
        setCategoryId(data.item.categoryId);
        setSubCategoryId(data.item.subCategoryId);
        setQuantityId(data.item.quantityId);
        setItemId(data.item._id);
        setPopularId(data.item.popularId);
        // setItemImage("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //update item
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const itemData = new FormData();
      itemData.append("name", name);
      itemData.append("categoryId", categoryId);
      itemData.append("subCategoryId", subCategoryId);
      itemData.append("quantityId", JSON.stringify(quantityId));
      itemData.append("popularId", popularId);
      itemData.append("itemImage", itemImage);
      console.log("itemData", itemData)
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND}api/v1/items/update-item/${itemId}`,
        itemData
      );
      if (data.success) {
        toast.success(`${name} is updated`);
        setName("");
        setCategoryId("");
        setSubCategoryId("");
        setQuantityId([]);
        setItemId("");
        getAllItem();
        setPopularId("");
        setItemId("");
        setItemImage("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  //delete item
  const handleDelete = async (id) => {
    if (window.confirm("Do you really want to delete this item?")) {
      try {
        const { data } = await axios.delete(
          `${process.env.REACT_APP_BACKEND}api/v1/items/delete-item/${id}`
        );
        if (data.success) {
          toast.success(`Item is deleted`);
          getAllItem();
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <Layout title="Item">
      <div className="form-box">
        <ItemForm
          handleAction={itemId === "" ? handleInsert : handleUpdate}
          name={name}
          setName={setName}
          itemId={itemId}
          flag={flag}
          category={category}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          subcategory={subcategory}
          subCategoryId={subCategoryId}
          setSubCategoryId={setSubCategoryId}
          addSelectedItem={addSelectedItem}
          removeSelectedItem={removeSelectedItem}
          quantity={quantity}
          quantityId={quantityId}
          updatePrice={updatePrice}
          count={count}
          popularId={popularId}
          setPopularId={setPopularId}
          itemImage={itemImage}
          setItemImage={setItemImage}
        />
      </div>
      <div className="add-block">
        <h3>Item</h3>
      </div>

      <div className="stricky-table">
        {" "}
        <Table className="table-design table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Quantity&nbsp;-&nbsp;Price</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((c) => (
              <tr key={c._id}>
                <td>{++icount}</td>
                <td>{c.name}</td>
                <td>{c.categoryId?.name}</td>
                <td>{c.subCategoryId?.name}</td>
                <td>
                  {c.quantityId?.map((q) => (
                    <div className="item-quantity-price" key={q._id}>
                      {q.name} - {q.price}
                    </div>
                  ))}
                </td>
                <td>{Formatdate(new Date(c.createdAt))}</td>
                <td>{Formatdate(new Date(c.updatedAt))}</td>
                <td>
                  <button
                    className="btn custom-btn me-1 btn-sm mb-1"
                    onClick={() => getSingleItem(c._id)}
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button
                    className="btn custom-btn me-1 btn-sm mb-1"
                    onClick={() => handleDelete(c._id)}
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

export default Item;
