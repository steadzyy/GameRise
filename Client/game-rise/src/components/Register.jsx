import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gameRise from "../helper/axios";
import Swal from "sweetalert2";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  async function RegisterUser(e) {
    // console.log(username, email, password, role, '<<<<<<');
    e.preventDefault();
    try {
      const { data } = await gameRise({
        url: "/register",
        method: "POST",
        data: {
          username: username,
          email: email,
          password: password,
          role: role,
        },
      });
      console.log(data, "<<<<");
      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
      
        <div className="text-center flex flex-col justify-center ">
          <h1 className="text-5xl font-bold ">Register Here!</h1>
          <img  src="https://res.cloudinary.com/dmzbsqcrp/image/upload/v1720679371/Gamerise_bzx03f.png"/>
          
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={RegisterUser}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered"
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select className="select select-bordered w-full max-w-xs" onChange={(e) => {
                    setRole(e.target.value);
                  }}>
                <option>
                  --Choose Your Role--
                </option>
                <option value={'Player'}>Player</option>
                <option value={'Developer'}>Developer</option>
              </select>
              <label className="label">
                <a href="/login" className="label-text-alt link link-hover">
                  Already Have Account?
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
