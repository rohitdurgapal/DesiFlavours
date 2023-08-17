import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Salesfields from "./Salesfields";
import { useParams } from "react-router-dom";
const Saleform = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [netPrice, setNetPrice] = useState(0);
  const [saleId, setSaleId] = useState("");
  const [flag, setFlag] = useState(false);
  var count = 0;
  const navigate = useNavigate();

  const addSelectedItem = (e) => {
    let selectedIds = selectedItem.map((item) => item._id);
    let itemId = e.filter((i) => !selectedIds.includes(i._id));
    const result = [...selectedItem, ...itemId];
    setSelectedItem(result);
    const total = result.map((c) => c.price * c.quantity);
    const totalsum = total.reduce((a, b) => a + b);
    setTotal(totalsum);
    setNetPrice(totalsum - discount);
  };

  const removeSelectedItem = (e) => {
    let remainingItems = e.map((i) => i._id);
    let result = selectedItem.filter((s) => remainingItems.includes(s._id));
    setSelectedItem(result);
    if (result.length === 0) {
      setSelectedItem([]);
      setTotal(0);
      setNetPrice(0);
    } else {
      const total = result.map((c) => c.price * c.quantity);
      const totalsum = total.reduce((a, b) => a + b);
      setTotal(totalsum);
      setNetPrice(totalsum - discount);
    }
  };

  const updateQuantity = (_id, quantity) => {
    const result = selectedItem.map((item) => {
      if (item._id === _id) {
        return { ...item, quantity };
      } else {
        return item;
      }
    });
    setSelectedItem(result);
    const total = result.map((c) => c.price * c.quantity);
    const totalsum = total.reduce((a, b) => a + b);
    setTotal(totalsum);
    setNetPrice(totalsum - discount);
  };

  const updateQuantityData = (_id, quantityData) => {
    let selectedIds = selectedItem.filter((item) => item._id === _id);
    let quantityd = selectedIds[0].quantityData.filter(
      (q) => q._id === quantityData
    );
    const result = selectedItem.map((item) => {
      if (item._id === _id) {
        return {
          ...item,
          quantityId: quantityd[0]._id,
          price: quantityd[0].price,
        };
      } else {
        return item;
      }
    });

    setSelectedItem(result);
    const total = result.map((c) => c.price * c.quantity);
    const totalsum = total.reduce((a, b) => a + b);
    setTotal(totalsum);
    setNetPrice(totalsum - discount);
  };

  const updateDiscount = (discount) => {
    setDiscount(discount);
    setNetPrice(total - discount);
    return [...selectedItem, discount];
  };

  //get all item
  const getAllItem = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/items/get-item`
      );
      if (data?.success) {
        const itemData = data?.item;
        const newItems = itemData.map((c) => ({
          ["_id"]: c._id,
          ["itemName"]: c.name + " - " + c.subCategoryId.name,
          ["name"]: c.name,
          ["quantityData"]: c.quantityId,
          ["quantityId"]: c.quantityId[0]._id,
          ["price"]: c.quantityId[0].price,
          ["quantity"]: 1,
          ["netPrice"]: c.quantityId[0].price,
        }));
        setItems(newItems);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting items");
    }
  };

  //handle Form
  const handleSubmit = async (e) => {
    setFlag(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}api/v1/sales/create-sale`,
        {
          name,
          mobile,
          address,
          items: selectedItem,
          total,
          discount,
          netPrice,
        }
      );
      if (data?.success) {
        toast.success(`Sale is created`);
        navigate("/admin/sales");
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

  useEffect(() => {
    getAllItem();
  }, []);

  //get single sale
  const getSingleSale = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/sales/single-sale/${id}`
      );
      if (data.success) {
        setName(data.sale.name);
        setMobile(data.sale.mobile);
        setAddress(data.sale.address);
        setSelectedItem(data.sale.items);
        setSaleId(data.sale._id);
        setTotal(data.sale.total);
        setDiscount(data.sale.discount);
        setNetPrice(data.sale.netPrice);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //update sale
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND}api/v1/sales/update-sale/${saleId}`,
        {
          name,
          mobile,
          address,
          items: selectedItem,
          total,
          discount,
          netPrice,
        }
      );
      if (data.success) {
        toast.success(`Sale is updated`);
        navigate("/admin/sales");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // get data on update
  let { id } = useParams();
  useEffect(() => {
    if (id && id !== "") {
      setSaleId(id);
      getSingleSale(id);
    }
  }, [id]);

  return (
    <Layout title="Sale">
      <div className="form-box">
        <Salesfields
          handleAction={saleId === "" ? handleSubmit : handleUpdate}
          name={name}
          setName={setName}
          mobile={mobile}
          setMobile={setMobile}
          address={address}
          setAddress={setAddress}
          removeSelectedItem={removeSelectedItem}
          addSelectedItem={addSelectedItem}
          selectedItem={selectedItem}
          updateQuantity={updateQuantity}
          updateDiscount={updateDiscount}
          items={items}
          count={count}
          total={total}
          discount={discount}
          netPrice={netPrice}
          saleId={saleId}
          flag={flag}
          updateQuantityData={updateQuantityData}
        />
      </div>
    </Layout>
  );
};

export default Saleform;
