import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { RespBackend } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/api";

export function Signup() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    emaiL: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  function postSignup() {
    setError("");
    if (!info.emaiL || !info.password || !info.firstName || !info.lastName)
      return setError("there are missing fields");
    axios
      .post<RespBackend>(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
        Email: info.emaiL,
        Password: info.password,
        FirstName: info.firstName,
        LastName: info.lastName,
      })
      .then((res) => {
        if (res.status == 202 || res.status == 200) {
          localStorage.token = res.data.token;
          console.log("account created!");
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.msg);
      });
  }
  useEffect(() => {
    async function main(){
      const token = localStorage.token
      if(!token) return
       await getUser(localStorage.token)
       .then((check_user) => {
          if(check_user) return navigate('/dashboard') 
       })   
    }
    main()
}, [])
  return (
    <div className="flex mt-24 justify-center w-full ">
      <div
        style={{ maxWidth: "570px", width: "90%" }}
        className="flex flex-col justify-center bg-zinc-800 p-7 rounded-md border border-zinc-700"
      >
        <div className="mb-10">
          <h1 className="font-bold text-white text-2xl">Create your account</h1>
        </div>
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <p className="text-white font-bold text-md">First Name *</p>
            <input
              value={info.firstName}
              onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
              className="border-2 transition-all ease-in-out outline-none sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-zinc-800 border-zinc-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-700"
              type={"text"}
              placeholder="John"
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-white font-bold text-md">Last Name *</p>
            <input
              value={info.lastName}
              onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
              className="border-2 transition-all ease-in-out outline-none sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-zinc-800 border-zinc-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-700"
              type={"text"}
              placeholder="Michael"
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-white font-bold text-md">Email *</p>
            <input
              value={info.emaiL}
              onChange={(e) => setInfo({ ...info, emaiL: e.target.value })}
              className="border-2 transition-all ease-in-out outline-none sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-zinc-800 border-zinc-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-700"
              type={"email"}
              placeholder="name@example.com"
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-white font-bold text-md">Password *</p>
            <input
              value={info.password}
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
              className="border-2 transition-all ease-in-out outline-none sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-zinc-800 border-zinc-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-700"
              type={"password"}
              placeholder="••••••••"
            />
          </div>
          {error && (
            <div className="mb-2">
              <p className="text-red-500 font-normal">{error}</p>
            </div>
          )}
          <div className="flex flex-col gap-6">
            <button
              onClick={postSignup}
              className="text-white font-medium bg-blue-700 p-2 rounded-md hover:bg-blue-800 transition-all duration-200 focus:ring-blue-500 focus:ring-4 ease-in-out"
            >
              Signup
            </button>
            <p className="text-sm font-ligh text-gray-500 dark:text-gray-400">
              Already have an account yet?{" "}
              <Link
                className="font-medium text-primary-600 hover:underline text-blue-500"
                to="/"
              >
                login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
