import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./admin/auth/Login";
import Sales from "./admin/pages/sales/Sales";
import Saleform from "./admin/pages/sales/Saleform";
import Item from "./admin/pages/items/Item";
import Printbill from "./admin/pages/sales/Printbill";
import AdminCheck from "./admin/auth/AdminCheck";
import Category from "./admin/pages/category/Category";
import SubCategory from "./admin/pages/subcategory/SubCategory";
import Quantity from "./admin/pages/quantity/Quantity";
import Home from "./admin/pages/home/Home";
import Order from "./admin/pages/order/Order";
import PrintOrderBill from "./admin/pages/order/PrintOrderBill";
import AdminProfile from "./admin/layout/AdminProfile";
import Customer from "./admin/pages/customer/Customer";
// Customer
import CustomerHome from "./customer/pages/home/CustomerHome";
import Profile from "./customer/pages/profile/Profile";
import MyOrder from "./customer/pages/profile/MyOrder";
import MyOrderBill from "./customer/pages/profile/MyOrderBill";
import CustomerCheck from "./customer/auth/CustomerCheck";
import PageNotFound from "./common/PageNotFound";
function App() {
  return (
    <Routes>
      {/* customer route */}
      <Route path="/" element={<CustomerHome />} />
      <Route path="/customer" element={<CustomerCheck />}>
        <Route path="/customer" element={<Profile />} />
        <Route path="/customer/order" element={<MyOrder />} />
        <Route path="/customer/order/bill/:id" element={<MyOrderBill />} />
      </Route>
      {/* admin route */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<AdminCheck />}>
        <Route path="/admin" element={<Home />} />
        <Route path="/admin/masters/category" element={<Category />} />
        <Route path="/admin/masters/subcategory" element={<SubCategory />} />
        <Route path="/admin/masters/quantity" element={<Quantity />} />
        <Route path="/admin/order" element={<Order />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/customer" element={<Customer />} />
        <Route
          path="/admin/order/print-bill/:id"
          element={<PrintOrderBill />}
        />
        <Route path="/admin/sales" element={<Sales />} />
        <Route path="/admin/sales/add" element={<Saleform />} />
        <Route path="/admin/sales/update/:id" element={<Saleform />} />
        <Route path="/admin/sales/print-bill/:id" element={<Printbill />} />
        <Route path="/admin/masters/item" element={<Item />} />
      </Route>
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
  );
}

export default App;
