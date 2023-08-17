import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Multiselect from "multiselect-react-dropdown";
import Table from "react-bootstrap/Table";
const Salesfields = ({
  handleAction,
  name,
  setName,
  mobile,
  setMobile,
  address,
  setAddress,
  removeSelectedItem,
  addSelectedItem,
  selectedItem,
  updateQuantity,
  updateDiscount,
  items,
  count,
  total,
  discount,
  netPrice,
  flag,
  saleId,
  updateQuantityData,
}) => {
  return (
    <>
      <h3>{saleId === "" ? "Add" : "Update"} Sale</h3>
      <form onSubmit={handleAction}>
        <div className="row justify-content-start">
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
            <div className="c-block">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
            <div className="c-block">
              <label htmlFor="mobile">Mobile</label>
              <input
                id="mobile"
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
            <div className="c-block">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <div className="c-block">
              <label htmlFor="items">Items</label>
              <Multiselect
                displayValue="itemName"
                onSelect={(e) => addSelectedItem(e)}
                onRemove={(e) => removeSelectedItem(e)}
                options={items}
                selectedValues={selectedItem}
                showCheckbox
              />
            </div>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
            <div className="c-block">
              <button
                type="button"
                className="btn custom-btn"
                onClick={handleAction}
                disabled={flag}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
      <Table striped className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Item Quantity</th>
            <th>Item Price</th>
            <th className="right-text">Quantity</th>
            <th className="right-text">Net Price</th>
          </tr>
        </thead>
        <tbody>
          {selectedItem?.map((c) => (
            <tr key={c._id}>
              <td>{++count}</td>
              <td>{c.name}</td>
              <td>
                <select
                  className="form-control"
                  style={{ width: "150px", display: "inline-block" }}
                  value={c.quantityId}
                  onChange={(e) => updateQuantityData(c._id, e.target.value)}
                >
                  {c.quantityData?.map((q) => (
                    <option key={q._id} value={q._id}>
                      {q.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>{c.price}</td>
              <td className="right-text">
                <Form.Control
                  style={{
                    width: "60px",
                    textAlign: "center",
                    float: "right",
                  }}
                  type="number"
                  value={c.quantity}
                  placeholder="Quantity"
                  onChange={(e) => updateQuantity(c._id, e.target.value)}
                />
              </td>
              <td className="right-text">{c.quantity * c.price}</td>
            </tr>
          ))}
          {total !== 0 && (
            <>
              <tr>
                <td colSpan={5} className="bold-text">
                  Total
                </td>
                <td className="bold-text">{total}</td>
              </tr>
              <tr>
                <td colSpan={6} className="bold-text">
                  <Form.Control
                    style={{
                      width: "100px",
                      textAlign: "right",
                      display: "inline",
                    }}
                    type="number"
                    value={discount}
                    placeholder="Discount"
                    onChange={(e) => updateDiscount(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={5} className="bold-text">
                  Net Price
                </td>
                <td className="bold-text">{netPrice}</td>
              </tr>
            </>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Salesfields;
