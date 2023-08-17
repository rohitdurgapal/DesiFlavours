import React from "react";
import Multiselect from "multiselect-react-dropdown";
import Table from "react-bootstrap/Table";
const ItemForm = ({
  handleAction,
  name,
  setName,
  category,
  categoryId,
  setCategoryId,
  subcategory,
  subCategoryId,
  setSubCategoryId,
  itemId,
  flag,
  addSelectedItem,
  removeSelectedItem,
  quantity,
  quantityId,
  updatePrice,
  count,
  popularId,
  setPopularId,
  itemImage,
  setItemImage,
}) => {
  return (
    <>
      <h3>{itemId === "" ? "Add" : "Update"} Item</h3>
      <form>
        <div className="row justify-content-start">
          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12">
            <div className="c-block">
              <label htmlFor="popularId">Popular</label>
              <select
                id="popularId"
                value={popularId}
                onChange={(e) => setPopularId(e.target.value)}
              >
                <option key="0" value="0">
                  No
                </option>
                <option key="1" value="1">
                  Yes
                </option>
              </select>
            </div>
          </div>
          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12">
            <div className="c-block">
              <label htmlFor="categoryId">Category</label>
              <select
                id="categoryId"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option>Select</option>
                {category?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-3 col-xs-12">
            <div className="c-block">
              <label htmlFor="subCategoryId">Sub Category</label>
              <select
                id="subCategoryId"
                value={subCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
              >
                <option>Select</option>
                {subcategory?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
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
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <div className="c-block">
              <label>Quantity</label>
              <Multiselect
                displayValue="name"
                onSelect={(e) => addSelectedItem(e)}
                onRemove={(e) => removeSelectedItem(e)}
                options={quantity}
                selectedValues={quantityId}
                showCheckbox
              />
            </div>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
            <div className="c-block img-block">
              <label htmlFor="itemImage">Image</label>
              {itemImage ? <span>{`${itemImage.name}`}</span> : ""}
              <input
                id="itemImage"
                type="file"
                accept="image/*"
                onChange={(e) => setItemImage(e.target.files[0])}
              />
            </div>
          </div>
          <div className="col-lg-1 col-md-2 col-sm-2 col-xs-12">
            <div className="c-block">
              <button
                type="button"
                onClick={handleAction}
                className="btn custom-btn"
                disabled={flag}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
      {quantityId.length > 0 ? (
        <div className="multi-select-block">
          <Table className="table-design table-responsive">
            <thead>
              <tr>
                <th>#</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {quantityId?.map((c) => (
                <tr key={c._id}>
                  <td>{++count}</td>
                  <td>{c.name}</td>
                  <td>
                    <input
                      type="number"
                      value={c.price}
                      onChange={(e) => updatePrice(c._id, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ItemForm;
