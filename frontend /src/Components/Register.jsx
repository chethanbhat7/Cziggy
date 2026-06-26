import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "../redux/actions/userActions";
import Loader from "./layout/Loader";
import { toast } from "react-toastify";

const Register = () => {
  const [userState, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
  });

  const { name, email, password, passwordConfirm, phoneNumber } = userState;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/images.png");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    const formData = {
      name,
      email,
      password,
      passwordConfirm,
      phoneNumber,
      avatar: avatar || "/images/images.png",
    };

    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    } else {
      setUser({ ...userState, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
              <h1 className="mb-3 text-center font-weight-bold">Register</h1>

              <div className="form-group mb-3">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  name="name"
                  className="form-control"
                  value={name}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="passwordConfirm_field">Confirm Password</label>
                <input
                  type="password"
                  id="passwordConfirm_field"
                  name="passwordConfirm"
                  className="form-control"
                  value={passwordConfirm}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="phoneNumber_field">Phone Number</label>
                <input
                  type="number"
                  id="phoneNumber_field"
                  name="phoneNumber"
                  className="form-control"
                  value={phoneNumber}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-area">
                      <img
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="Avatar Preview"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                    </figure>
                  </div>
                  <div className="custom-file ms-3">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>

              <button
                id="register_btn"
                type="submit"
                className="btn btn-primary w-100 py-3 mt-4"
              >
                REGISTER
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
