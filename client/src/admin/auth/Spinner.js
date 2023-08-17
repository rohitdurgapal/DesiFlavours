import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Spinner = () => {
  const [count, setCount] = useState(2);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate("/admin/login");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <>
      <div className="spinner-class">
        <h1>Loading...</h1>
      </div>
    </>
  );
};

export default Spinner;
