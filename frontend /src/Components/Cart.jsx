import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faTrash } from "@fortawesome/free-solid-svg-icons";
import { updateCartItemQuantity, removeItemFromCart } from "../redux/actions/cartActions";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { cartItems, loading } = useSelector((state) => state.cart);

  const increaseQty = (foodItemId, quantity, stock) => {
    if (quantity < stock) {
      dispatch(updateCartItemQuantity(user?._id || user?.id, foodItemId, quantity + 1));
    }
  };

  const decreaseQty = (foodItemId, quantity) => {
    if (quantity > 1) {
      dispatch(updateCartItemQuantity(user?._id || user?.id, foodItemId, quantity - 1));
    } else {
      dispatch(removeItemFromCart(user?._id || user?.id, foodItemId));
    }
  };

  const removeCartItemHandler = (foodItemId) => {
    dispatch(removeItemFromCart(user?._id || user?.id, foodItemId));
  };

  if (loading) {
    return (
      <div className="container container-fluids my-5">
        <h2>Loading your cart...</h2>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container container-fluids my-5 text-center">
        <h2 className="mt-5">Your Cart is Empty</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container container-fluids">
      <h2 className="mt-5">
        Your Cart: <b>{cartItems.length} items</b>
      </h2>
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8">
          {cartItems.map((item) => {
            const foodItem = item.foodItem;
            if (!foodItem) return null;

            return (
              <React.Fragment key={foodItem._id}>
                <div className="cart-item">
                  <div className="row d-flex align-items-center">
                    {/* Item Image */}
                    <div className="col-4 col-lg-3">
                      <img
                        src={foodItem.images?.[0]?.url || "/images/placeholder.png"}
                        alt={foodItem.name}
                        height="90"
                        width="115"
                        className="img-fluid rounded"
                      />
                    </div>

                    {/* Item Name */}
                    <div className="col-5 col-lg-3">
                      <Link to={`/food/${foodItem._id}`} style={{ textDecoration: "none" }}>
                        {foodItem.name}
                      </Link>
                    </div>

                    {/* Item Price */}
                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">
                        <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" className="mr-1" />
                        {foodItem.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline-block">
                        <button
                          className="btn btn-danger minus"
                          onClick={() => decreaseQty(foodItem._id, item.quantity)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control count d-inline text-center"
                          value={item.quantity}
                          readOnly
                          style={{ width: "50px", display: "inline-block", margin: "0 5px" }}
                        />
                        <button
                          className="btn btn-primary plus"
                          onClick={() =>
                            increaseQty(foodItem._id, item.quantity, foodItem.stock)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <div className="col-4 col-lg-1 mt-4 mt-lg-0 text-center">
                      <button
                        id="delete_cart_item"
                        className="btn btn-danger"
                        onClick={() => removeCartItemHandler(foodItem._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                  <hr />
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">
                {cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)} (Units)
              </span>
            </p>
            <p>
              Est. total:{" "}
              <span className="order-summary-values">
                <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" className="mr-1" />
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * (item.foodItem?.price || 0), 0)
                  .toFixed(2)}
              </span>
            </p>
            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block w-100"
              onClick={() => navigate("/delivery")}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
