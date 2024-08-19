import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gameRise from "../helper/axios";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      let { data } = await gameRise({
        method: "POST",
        url: "/login",
        data: {
          email : email,
          password: password,
        },
      });
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("role", data.role);
      navigate("/homepage");
      // localStorage.removeItem("token");
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  };
  async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const googleToken = response.credential;
         try {
          const {data} = await axios.post('https://gamerise.steadzy.online/login/google', {
            googleToken
          });
          localStorage.setItem("access_token", data.access_token)
          // swal alert ('login success') JANGAN LUPA TAMBAHIN
          navigate("/homepage")
         } catch (error) {
          console.log(error);
         }
  }
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "49127258763-1sqdv8gai2aos53kg42m6koaemrunv5a.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    window.google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center flex flex-col justify-center ">
          <h1 className="text-5xl font-bold ">Login Now!</h1>
          <img  src="https://res.cloudinary.com/dmzbsqcrp/image/upload/v1720679371/Gamerise_bzx03f.png"/>
          
        </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleLogin}>
              <h1 className="text-center mb-3">LOGIN</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label">
                  <a
                    href="/register"
                    className="label-text-alt link link-hover"
                  >
                    Dont Have Account? Click Here
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>     
              <p className="flex justify-center">Or Login With:</p>     
                <div className="flex justify-center" id="buttonDiv"></div>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
