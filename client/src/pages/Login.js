import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/actions/action";

export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginForm))
      .then(() => {
        console.log("welcome, username");
        navigation("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex w-full min-h-screen justify-center items-center font-poppins">
      <div className="flex justify-center flex-col px-8 pt-8 pb-10 w-80 h-content shadow-lg bg-[#2A302F] max-w-sm">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center font-bold text-2xl mb-5">
            <h1> LOGIN </h1>
          </div>
          <div className="form-group mb-6">
            <label className="absolute px-2 form-label inline-block text-xs mb-2 text-slate-900">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleChange}
              className="form-control block w-full px-3 py-2.5 text-sm text-gray-900 bg-white bg-clip-padding border border-solid border-gray-300 rounded-xs"
            />
          </div>
          <div className="form-group mb-6">
            <label
              for="password"
              className="absolute px-2 form-label inline-block text-xs mb-2 text-slate-900"
            >
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleChange}
              className="form-control block w-full px-3 py-2.5 bg-white bg-clip-padding text-slate-900 border border-solid border-gray-300 rounded-sm"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-wide bg-[#D7385E] text-slate-200 rounded-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
