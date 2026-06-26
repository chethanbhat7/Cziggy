import api from "../../utils/api";

import {
  cartRequest,
  cartFail,
  cartSuccess,
  updateCartSuccess,
  removeCartSuccess,
  clearCart as clearCartAction,
  clearError as clearErrorAction,
  saveDeliveryInfor
} from "../slices/cartSlice";

// Add Item to Cart
export const addItemToCart = (userId, foodItemId, restaurantId, quantity) => async (dispatch) => {
  try {
    dispatch(cartRequest());
    const response = await api.post("/v1/eats/cart/add-to-cart", {
      userId,
      foodItemId,
      restaurantId,
      quantity
    });
    dispatch(cartSuccess(response.data.cart));
  } catch (error) {
    dispatch(
      cartFail(
        error.response?.data?.message ||
        error.response?.data?.errMessage ||
        error.message
      )
    );
  }
};

// Update Cart Item Quantity
export const updateCartItemQuantity = (userId, foodItemId, quantity) => async (dispatch) => {
  try {
    dispatch(cartRequest());
    const response = await api.post("/v1/eats/cart/update-cart-item", {
      userId,
      foodItemId,
      quantity
    });
    dispatch(updateCartSuccess(response.data.cart));
  } catch (error) {
    dispatch(
      cartFail(
        error.response?.data?.message ||
        error.response?.data?.errMessage ||
        error.message
      )
    );
  }
};

// Remove Item from Cart
export const removeItemFromCart = (userId, foodItemId) => async (dispatch) => {
  try {
    dispatch(cartRequest());
    const response = await api.delete("/v1/eats/cart/delete-cart-item", {
      data: { userId, foodItemId }
    });
    dispatch(removeCartSuccess(response.data));
  } catch (error) {
    dispatch(
      cartFail(
        error.response?.data?.message ||
        error.response?.data?.errMessage ||
        error.message
      )
    );
  }
};

// Get Cart
export const getCart = () => async (dispatch) => {
  try {
    dispatch(cartRequest());
    const response = await api.get("/v1/eats/cart/get-cart");
    dispatch(cartSuccess(response.data.data));
  } catch (error) {
    dispatch(
      cartFail(
        error.response?.data?.message ||
        error.response?.data?.errMessage ||
        error.message
      )
    );
  }
};

// Save Delivery Info
export const saveDeliveryInfo = (deliveryInfo) => (dispatch) => {
  dispatch(saveDeliveryInfor(deliveryInfo));
};

// Clear Cart
export const clearCart = () => (dispatch) => {
  dispatch(clearCartAction());
};

// Clear Cart Error
export const clearCartError = () => (dispatch) => {
  dispatch(clearErrorAction());
};
