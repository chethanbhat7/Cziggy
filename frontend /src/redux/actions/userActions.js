import api from '../../utils/api';

import {
  userRequest,
  userSuccess,
  userFail,
  logoutSuccess,
  logoutFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  clearErrors,
} from "../slices/userSlice";

// Login Action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(userRequest());
    const response = await api.post('/v1/users/login', { email, password });
    dispatch(userSuccess(response.data));
  } catch (error) {
    dispatch(
      userFail(
        error.response?.data?.message ||
        error.response?.data?.errMessage ||
        error.message
      )
    );
  }
};

// Register Action
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(userRequest());
    const response = await api.post('/v1/users/signup', userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(userSuccess(response.data));
  } catch (error) {
    dispatch(
      userFail(
        error.response?.data?.message ||
        error.response?.data?.errMessage ||
        error.message
      )
    );
  }
};

// Load User Action
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(userRequest());
    const response = await api.get("/v1/users/me");
    dispatch(userSuccess(response.data));
  } catch (error) {
    dispatch(
      userFail(
        error.response?.data?.message ||
        error.response?.data?.errMessage ||
        error.message
      )
    );
  }
};

// Update Profile Action
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());
    const response = await api.put('/v1/users/me/update', userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(updateProfileSuccess(response.data.success));
  } catch (error) {
    dispatch(
      updateProfileFail(
        error.response?.data?.message ||
        error.response?.data?.errMessage ||
        error.message
      )
    );
  }
};

// Logout User Action
export const logout = () => async (dispatch) => {
  try {
    await api.get("/v1/users/logout");
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(
      logoutFail(
        error.response?.data?.message ||
        error.response?.data?.errMessage ||
        error.message
      )
    );
  }
};

// Clear Errors Action
export const clearError = () => (dispatch) => {
  dispatch(clearErrors());
};