import React, { useState, useEffect, useRef } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import Table from "react-bootstrap/Table";
import ReactToPrint from "react-to-print";
import { useParams } from "react-router-dom";
import { FormatdateOnly } from "../../../common/Formatdate";
const Printbill = () => {
  const [sales, setSales] = useState("");
  const componentRef = useRef();
  const params = useParams();

  //get sale
  const getSale = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}api/v1/sales/single-sale/${params.id}`
      );
      if (data?.success) {
        setSales(data?.sale);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSale();
  }, []);
  return (
    <Layout title="Sale Bill">
      <div className="add-block">
        <h3>Sale Bill</h3>
        <ReactToPrint
          trigger={() => (
            <button className="btn custom-btn" style={{ marginLeft: "auto" }}>
              Print Bill
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div ref={componentRef} className="bill-table-block">
        <Table>
          <tbody>
            {/* <tr>
              <td colSpan={2} style={{ padding: "0px" }}>
                <div
                  style={{
                    textAlign: "center",
                    padding: "0px",
                  }}
                >
                  <img
                    alt=""
                    src={`${process.env.REACT_APP_URL}logo-sm.png`}
                    width="55"
                    height="55"
                  />
                </div>
              </td>
            </tr> */}
            <tr>
              <td colSpan={2} style={{ padding: "0px" }}>
                <div
                  style={{
                    textAlign: "center",
                    textTransform: "uppercase",
                    fontSize: "18px",
                    padding: "0px",
                    fontWeight: "800",
                  }}
                >
                  {sales?.restaurantId?.name}
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ padding: "0px" }}>
                <div
                  style={{
                    textAlign: "center",
                    padding: "0px",
                  }}
                >
                  {sales?.restaurantId?.address}
                </div>
                {sales?.restaurantId?.gstn ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "0px",
                    }}
                  >
                    GSTN - {sales?.restaurantId?.gstn}
                  </div>
                ) : (
                  ""
                )}
                {sales?.restaurantId?.mobile ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "0px",
                    }}
                  >
                    Mobile - {sales?.restaurantId?.mobile}
                  </div>
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <hr style={{ margin: "5px 0px", padding: "0px" }} />
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ padding: "0.5rem 1.4rem" }}>
                <div
                  style={{
                    padding: "0px",
                  }}
                >
                  Name: <span>{sales.name}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ padding: "0.5rem 1.4rem" }}>
                <div
                  style={{
                    padding: "0px",
                  }}
                >
                  Address: <span>{sales.address}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ padding: "0.5rem 1.4rem" }}>
                <div
                  style={{
                    padding: "0px",
                  }}
                >
                  Mobile: <span>{sales.mobile}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ width: "50%", padding: "0.5rem 1.4rem" }}>
                <div
                  style={{
                    padding: "0px",
                  }}
                >
                  Date: {FormatdateOnly(new Date(sales.createdAt))}
                </div>
              </td>
              <td
                style={{
                  width: "50%",
                  textAlign: "right",
                  padding: "0.5rem 1.4rem",
                }}
              >
                <div
                  style={{
                    padding: "0px",
                  }}
                >
                  Bill No: - #SAL00{sales.sale_id}
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <hr style={{ margin: "5px 0px", padding: "0px" }} />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <Table>
                  <tbody>
                    <tr>
                      <th
                        style={{
                          border: "0",
                          padding: "0.5rem 0.5rem 0.5rem 0px",
                          width: "40%",
                          fontWeight: 800,
                          verticalAlign: "middle",
                        }}
                      >
                        Item
                      </th>
                      <th
                        style={{
                          border: "0",
                          textAlign: "center",
                          padding: "0.5rem",
                          width: "20%",
                          fontWeight: 800,
                          verticalAlign: "middle",
                        }}
                      >
                        Qty
                      </th>
                      <th
                        style={{
                          border: "0",
                          textAlign: "right",
                          padding: "0.5rem",
                          width: "20%",
                          fontWeight: 800,
                          verticalAlign: "middle",
                        }}
                      >
                        Price
                      </th>
                      <th
                        style={{
                          border: "0",
                          textAlign: "right",
                          padding: "0.5rem 0px 0.5rem 0.5rem",
                          width: "20%",
                          fontWeight: 800,
                          verticalAlign: "middle",
                        }}
                      >
                        Sub
                        <br />
                        Total
                      </th>
                    </tr>
                    {sales.items?.map((c) => (
                      <tr key={c._id}>
                        <td
                          style={{
                            border: "0",
                            padding: "0.5rem 0.5rem 0.5rem 0px",
                            width: "40%",
                            verticalAlign: "middle",
                          }}
                        >
                          {c.name}
                        </td>
                        <td
                          style={{
                            border: "0",
                            textAlign: "center",
                            padding: "0.5rem",
                            width: "20%",
                            verticalAlign: "middle",
                          }}
                        >
                          {c.quantity}
                        </td>
                        <td
                          style={{
                            border: "0",
                            textAlign: "right",
                            padding: "0.5rem",
                            width: "20%",
                            verticalAlign: "middle",
                          }}
                        >
                          {c.price}
                        </td>
                        <td
                          style={{
                            border: "0",
                            textAlign: "right",
                            padding: "0.5rem 0px 0.5rem 0.5rem",
                            width: "20%",
                            verticalAlign: "middle",
                          }}
                        >
                          {c.quantity * c.price}
                        </td>
                      </tr>
                    ))}
                    <tr style={{ border: "0px solid #fff" }}>
                      <td colSpan={4} style={{ padding: "0px" }}>
                        <hr style={{ margin: "5px 0px", padding: "0px" }} />
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          border: "0",
                          textAlign: "right",
                          padding: "0.5rem 0px",
                        }}
                      >
                        <div
                          style={{
                            padding: "0px",
                            border: "0px",
                            textAlign: "right",
                          }}
                        >
                          Total
                        </div>
                      </td>
                      <td
                        style={{
                          border: "0",
                          textAlign: "right",
                          padding: "0.5rem 0px",
                        }}
                      >
                        <div
                          style={{
                            padding: "0px",
                            border: "0px",
                            textAlign: "right",
                          }}
                        >
                          {sales.total}
                        </div>
                      </td>
                    </tr>
                    <tr style={{ border: "0px solid #fff" }}>
                      <td colSpan={4} style={{ padding: "0px" }}>
                        <hr style={{ margin: "5px 0px", padding: "0px" }} />
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          border: "0",
                          textAlign: "right",
                          padding: "0.5rem 0px",
                        }}
                      >
                        <div
                          style={{
                            padding: "0px",
                            border: "0px",
                            textAlign: "right",
                          }}
                        >
                          Discount
                        </div>
                      </td>
                      <td
                        style={{
                          border: "0",
                          textAlign: "right",
                          padding: "0.5rem 0px",
                        }}
                      >
                        <div
                          style={{
                            padding: "0px",
                            border: "0px",
                            textAlign: "right",
                          }}
                        >
                          {sales.discount}
                        </div>
                      </td>
                    </tr>
                    <tr style={{ border: "0px solid #fff" }}>
                      <td colSpan={4} style={{ padding: "0px" }}>
                        <hr style={{ margin: "5px 0px", padding: "0px" }} />
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          border: "0",
                          textAlign: "right",
                          padding: "0.5rem 0px",
                        }}
                      >
                        <div
                          style={{
                            padding: "0px",
                            border: "0px",
                            textAlign: "right",
                          }}
                        >
                          Net Price
                        </div>
                      </td>
                      <td
                        style={{
                          border: "0",
                          textAlign: "right",
                          padding: "0.5rem 0px",
                        }}
                      >
                        <div
                          style={{
                            padding: "0px",
                            border: "0px",
                            textAlign: "right",
                          }}
                        >
                          {sales.netPrice}
                        </div>
                      </td>
                    </tr>
                    <tr style={{ border: "0px solid #fff" }}>
                      <td colSpan={4} style={{ padding: "0px" }}>
                        <hr style={{ margin: "5px 0px", padding: "0px" }} />
                      </td>
                    </tr>
                    <tr style={{ border: "0px solid #fff" }}>
                      <td colSpan={4} style={{ textAlign: "center" }}>
                        <div
                          style={{
                            padding: "0px",
                            border: "0px",
                          }}
                        >
                          Thank you for ordering!
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default Printbill;
