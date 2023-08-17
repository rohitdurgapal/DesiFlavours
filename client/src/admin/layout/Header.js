import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contextapi/AdminContext";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBCollapse,
} from "mdb-react-ui-kit";
import toast from "react-hot-toast";
const Header = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    setTimeout(() => {
      navigate("/admin/login");
    }, 2000);
  };
  return (
    <>
      <MDBNavbar expand="lg" light bgColor="light" className="nav-class">
        <MDBContainer fluid>
          <NavLink to="/admin" className="header-logo">
            <span>Desi</span> Flavours
          </NavLink>
          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 ul-header-design">
              <MDBNavbarItem>
                <NavLink to="/admin" className="nav-link" end>
                  Home
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <NavLink to="/admin/order" className="nav-link" end>
                  Order
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <NavLink to="/admin/sales" className="nav-link" end>
                  Sales
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <NavLink to="/admin/masters/category" className="nav-link" end>
                  Category
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <NavLink
                  to="/admin/masters/subcategory"
                  className="nav-link"
                  end
                >
                  Sub Category
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <NavLink to="/admin/masters/quantity" className="nav-link" end>
                  Quantity
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <NavLink to="/admin/masters/item" className="nav-link" end>
                  Item
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <NavLink to="/admin/customer" className="nav-link" end>
                  Customer
                </NavLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBDropdown>
              <MDBDropdownToggle className="custom-account-name">
                {auth?.user?.name}
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <NavLink to="/admin/profile" className="dropdown-item">
                  My Profile
                </NavLink>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="dropdown-item"
                >
                  Logout
                </button>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Header;
