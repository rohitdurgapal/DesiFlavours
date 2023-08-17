import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import PopularCombo from "./PopularCombo";
import CustomerItem from "./CustomerItem";
import toast from "react-hot-toast";
import axios from "axios";
//redux
import { useDispatch, useSelector } from "react-redux";
import { add, minus, plus } from "../../../redux/cartSlice";
const CustomerHome = () => {
  const [popularCombo, setPopularCombo] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [item, setItem] = useState([]);
  //get popular combo
  const getPopularCombo = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/items/get-popular-combo`
      );
      if (data?.success) {
        setPopularCombo(data?.item);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting combo");
    }
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

  //get all item
  const getAllItem = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/items/get-item`
      );
      if (data?.success) {
        setItem(data?.item);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting items");
    }
  };

  useEffect(() => {
    getPopularCombo();
    getAllCategory();
    getAllSubCategory();
    getAllItem();
  }, []);

  // redux
  const dispatch = useDispatch();
  const cartDetails = useSelector((state) => state.cart);
  // add remove cart feature
  const addToCart = (item) => {
    dispatch(add(item));
  };
  const minusToCart = (item) => {
    dispatch(minus(item));
  };
  const PlusToCart = (item) => {
    dispatch(plus(item));
  };
  return (
    <>
      <Layout title="Home">
        <PopularCombo
          popularCombo={popularCombo}
          addToCart={addToCart}
          minusToCart={minusToCart}
          PlusToCart={PlusToCart}
          cartDetails={cartDetails}
        />
        <CustomerItem
          item={item}
          addToCart={addToCart}
          minusToCart={minusToCart}
          PlusToCart={PlusToCart}
          cartDetails={cartDetails}
          category={category}
          subcategory={subcategory}
        />
      </Layout>
    </>
  );
};

export default CustomerHome;
