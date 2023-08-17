import React from "react";

const CustomerSubCategory = ({ subcategory }) => {
  return (
    <>
      <div className="single-spLeft-ctgry foodCategory">
        <div className="title">
          <h5>Sub Category</h5>
          <span></span>
        </div>
        <div className="arrivalFood-item">
          {subcategory?.map((s) => (
            <div key={s._id}>
              <input type="checkbox" /> {s.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomerSubCategory;
