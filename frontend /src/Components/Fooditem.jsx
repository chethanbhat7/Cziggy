import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { addItemToCart, updateCartItemQuantity, removeItemFromCart } from "../redux/actions/cartActions";

const Fooditem = ({ fooditem, restaurant }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  // Find if this item is in cart
  const cartItem = cartItems?.find((item) => {
    const itemFoodId = item.foodItem?._id || item.foodItem;
    return itemFoodId === fooditem._id;
  });

  const quantity = cartItem ? cartItem.quantity : 0;
  const showButtons = !!cartItem;

  // Add button click
  const addToCartHandler = () => {
    if (!user) {
      navigate("/users/login");
      return;
    }
    dispatch(addItemToCart(user._id || user.id, fooditem._id, restaurant, 1));
  };

  // Increase quantity
  const increaseQty = () => {
    if (!user) {
      navigate("/users/login");
      return;
    }
    if (quantity < fooditem.stock) {
      dispatch(updateCartItemQuantity(user._id || user.id, fooditem._id, quantity + 1));
    }
  };

  // Decrease quantity
  const decreaseQty = () => {
    if (!user) {
      navigate("/users/login");
      return;
    }
    if (quantity > 1) {
      dispatch(updateCartItemQuantity(user._id || user.id, fooditem._id, quantity - 1));
    } else {
      dispatch(removeItemFromCart(user._id || user.id, fooditem._id));
    }
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto food-image"
          src={fooditem.images?.[0]?.url || "/images/placeholder.png"}
          alt={fooditem.name}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{fooditem.name}</h5>

          <p className="fooditem_des">{fooditem.description}</p>

          <p className="card-text">
            <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
            {fooditem.price}
          </p>

          {/*BUTTON LOGIC */}
          {!showButtons ? (
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary mt-2"
              disabled={fooditem.stock === 0}
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          ) : (
            <div className="stockCounter d-flex align-items-center mt-2">
              <button
                className="btn btn-danger"
                onClick={decreaseQty}
              >
                -
              </button>

              <input
                type="number"
                className="form-control text-center mx-2"
                value={quantity}
                readOnly
                style={{ width: "60px" }}
              />

              <button
                className="btn btn-primary"
                onClick={increaseQty}
              >
                +
              </button>
            </div>
          )}

          <hr />

          <p>
            Status:{" "}
            <span
              className={
                fooditem.stock > 0 ? "greenColor" : "redColor"
              }
            >
              {fooditem.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Fooditem;