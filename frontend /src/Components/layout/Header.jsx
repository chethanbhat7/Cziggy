import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";
import Search from "./Search";
import { logout } from "../../redux/actions/userActions";
import "../../App.css";

const Header = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { user, loading } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className="navbar row sticky-top">
        {/* logo */}
        <div className="col-12 col-md-3">
          <Link to="/">
            <img src="/images/logo.webp" alt="logo" className="logo" />
          </Link>
        </div>

        {/* search bar and search icon */}

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/eats/stores/search/:keyword" element={<Search />} />
          </Routes>
        </div>

        {/* Login */}
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center d-flex align-items-center justify-content-center">
          <Link to="/cart" style={{ textDecoration: "none" }} className="d-flex align-items-center mr-3">
            <span id="cart">Cart</span>
            <span className="ml-1" id="cart_count">
              {cartItems?.length || 0}
            </span>
          </Link>

          {user ? (
            <Dropdown className="d-inline">
              <Dropdown.Toggle
                variant="transparent"
                id="dropdown-basic"
                className="text-white d-flex align-items-center"
                style={{ border: "none", boxShadow: "none" }}
              >
                <figure className="avatar avatar-nav mr-2 mb-0" style={{ display: "inline-block", width: "30px", height: "30px" }}>
                  <img
                    src={user.avatar?.url || "/images/images.png"}
                    alt={user.name}
                    className="rounded-circle"
                    style={{ width: "30px", height: "30px", objectFit: "cover" }}
                  />
                </figure>
                <span className="text-white font-weight-bold">{user.name}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/eats/orders/me/myOrders">
                  Orders
                </Dropdown.Item>
                <Dropdown.Item onClick={logoutHandler} className="text-danger">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            !loading && (
              <Link to="/users/login" className="material-symbols-outlined web_logo">
                account_circle
              </Link>
            )
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;