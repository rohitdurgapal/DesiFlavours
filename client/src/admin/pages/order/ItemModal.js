import React from "react";
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
const ItemModal = ({ basicModal, setBasicModal, toggleShow, items }) => {
  return (
    <>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Items</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="stricky-table">
                <table className="table-design table-responsive table">
                  <thead className="thead-dark">
                    <tr>
                      <th>Image</th>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Count</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.map((i) => (
                      <tr key={i._id}>
                        <td>
                          <img
                            style={{ width: "100px" }}
                            src={
                              i.itemImage
                                ? `${process.env.REACT_APP_BACKEND}uploads/items/${i.itemImage}`
                                : `${process.env.REACT_APP_BACKEND}uploads/dummy/no-image.png`
                            }
                            alt={i.name}
                          />
                        </td>
                        <td>{i.name}</td>
                        <td>{i.quantityName}</td>
                        <td>{i.count}</td>
                        <td>{i.price}</td>
                        <td>{i.count * i.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={toggleShow}
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

export default ItemModal;
