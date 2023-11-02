import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const ContactDetails = ({ contactFlag, showContact }) => {
  const [contactData, setContactData] = useState([]);
  const getAllContact = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/auth/profile-contact`
      );
      if (data?.success) {
        setContactData(data?.user);
      }
    } catch (error) {
      toast.error("Something went wrong while getting profile");
    }
  };
  useEffect(() => {
    getAllContact();
  }, []);
  return (
    <>
      {" "}
      {contactFlag ? (
        <div className="cart-modal">
          <div className="contact-details-block">
            <div className="cart-heading">
              <h4>
                Contact Details{" "}
                <i
                  className="fa fa-times"
                  aria-hidden="true"
                  onClick={showContact}
                ></i>
              </h4>
              {contactData?.map((c) => (
                <div className="contact-address" key={c._id}>
                  {c.address} {c?.gstn ? <span>GSTN - {c.gstn}</span> : ""}
                  {c?.mobile ? <span>Mobile - {c.mobile}</span> : ""}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ContactDetails;
