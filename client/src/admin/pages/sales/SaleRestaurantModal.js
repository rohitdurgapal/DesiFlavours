import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import toast from "react-hot-toast";
const SaleRestaurantModal = ({
  basicModalR,
  setBasicModalR,
  toggleShowR,
  saleId,
  getAllSale,
}) => {
  const [restaurant, setRestaurant] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [flag, setFlag] = useState(false);

  //get order status
  const getRestaurant = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/auth/profile-contact`
      );
      if (data?.success) {
        setRestaurant(data?.user);
      }
    } catch (error) {
      toast.error("Something went wrong while getting restaurant");
    }
  };

  useEffect(() => {
    if (saleId) getRestaurant();
  }, [saleId]);

  const changeOrderRestaurant = async (e) => {
    setFlag(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}api/v1/sales/update-restaurant`,
        {
          saleId,
          restaurantId,
        }
      );
      if (data?.success) {
        getAllSale();
        toast.success("Restaurant change successfully");
        setFlag(false);
      } else {
        toast.error(data.message);
        setFlag(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setFlag(false);
    }
  };
  return (
    <>
      <MDBModal show={basicModalR} setShow={setBasicModalR} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Change Restaurant</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShowR}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={changeOrderRestaurant}>
                <div className="row justify-content-start">
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <div className="c-block">
                      <label htmlFor="restaurantId">Restaurant</label>
                      <select
                        id="restaurantId"
                        value={restaurantId}
                        onChange={(e) => setRestaurantId(e.target.value)}
                      >
                        <option value="">Select</option>
                        {restaurant?.map((r) => (
                          <option key={r._id} value={r._id}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                    <div className="c-block">
                      <button
                        type="submit"
                        className="btn custom-btn"
                        disabled={flag}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={toggleShowR}
                className="custom-btn"
              >
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default SaleRestaurantModal;
