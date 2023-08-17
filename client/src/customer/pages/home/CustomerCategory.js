import React, { useState } from "react";
const CustomerCategory = ({ category, categoryFunction }) => {
  const [categoryIds, setCategoryIds] = useState([]);
  const setCategoryFunction = (c) => {
    console.log("ca----", c);
    setCategoryIds([...categoryIds, c]);
    // console.log("categoryIds----", categoryIds);
  };
  return (
    <>
      <div className="single-spLeft-ctgry arrivalFood">
        <div className="title">
          <h5>Category</h5>
          <span></span>
        </div>
        <div className="arrivalFood-item">
          {category?.map((c) => (
            <div key={c._id}>
              <input
                type="checkbox"
                value={c._id}
                onClick={(e) => setCategoryFunction(e.target.value)}
              />{" "}
              {c.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomerCategory;
