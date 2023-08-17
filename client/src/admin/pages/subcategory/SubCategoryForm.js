import React from "react";

const SubCategoryForm = ({
  handleAction,
  name,
  setName,
  categoryId,
  setCategoryId,
  subcategoryId,
  flag,
  category,
}) => {
  return (
    <>
      <h3>{subcategoryId === "" ? "Add" : "Update"} Sub Category</h3>
      <form onSubmit={handleAction}>
        <div className="row justify-content-start">
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
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
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
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
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
            <div className="c-block">
              <button type="submit" className="btn custom-btn" disabled={flag}>
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SubCategoryForm;
