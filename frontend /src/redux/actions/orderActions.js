import api from "../../utils/api";

import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  myOrdersRequest,
  myOrdersSuccess,
  myOrdersFail,
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
  clearOrderErrors,
} from "../slices/orderSlice";

// Create Order Action
export const createOrder = (session_id) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const response = await api.post("/v1/eats/orders/new", { session_id });
    dispatch(createOrderSuccess(response.data.order));
  } catch (error) {
    dispatch(
      createOrderFail(
        error.response?.data?.message ||
        error.response?.data?.errMessage ||
        error.message
      )
    );
  }
};

// Get My Orders Action
export const myOrders = () => async (dispatch) => {
  try {
    dispatch(myOrdersRequest());
    const response = await api.get("/v1/eats/orders/me/myOrders");
    dispatch(myOrdersSuccess(response.data.orders));
  } catch (error) {
    dispatch(
      myOrdersFail(
        error.response?.data?.message ||
        error.response?.data?.errMessage ||
        error.message
      )
    );
  }
};

// Get Order Details Action
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailsRequest());
    const response = await api.get(`/v1/eats/orders/${id}`);
    dispatch(orderDetailsSuccess(response.data.order));
  } catch (error) {
    dispatch(
      orderDetailsFail(
        error.response?.data?.message ||
        error.response?.data?.errMessage ||
        error.message
      )
    );
  }
};

// Clear Order Errors Action
export const clearErrors = () => (dispatch) => {
  dispatch(clearOrderErrors());
};
