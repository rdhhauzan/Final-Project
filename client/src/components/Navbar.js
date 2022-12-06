import { useState } from "react";
import { close, menu } from "../assets";
import teamupnologo from "../assets/teamupnologo.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigation = useNavigate();
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-5 justify-between items-center navbar">
      <img
        src={teamupnologo}
        alt="fotologo"
        className="w-[200px] h-full cursor-pointer"
        onClick={() => navigation("/home")}
      />

      {localStorage.getItem("access_token") ? (
        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          <li
            className={`font-poppins font-normal cursor-pointer text-[16px] mr-10 text-white `}
          >
            <Link to="/home">Home</Link>
          </li>
          <li
            className={`font-poppins font-normal cursor-pointer text-[16px] mr-10 text-white `}
          >
            <a
              href="#"
              onClick={() => {
                localStorage.clear();
              }}
            >
              Logout
            </a>
          </li>
        </ul>
      ) : (
        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          <li
            className={`font-poppins font-normal cursor-pointer text-[16px] mr-10 text-white `}
          >
            <Link to="/login">Login</Link>
          </li>
          <li
            className={`font-poppins font-normal cursor-pointer text-[16px] mr-0 text-white `}
          >
            <Link to="/register">Register</Link>
          </li>
        </ul>
      )}

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle((men) => !men)}
        />

        <div
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          {localStorage.getItem("access_token") ? (
            <ul className="list-none flex flex-col justify-end items-center flex-1">
              <li
                className={`font-poppins font-normal cursor-pointer text-[16px] mr-10 text-white `}
              >
                <Link to="/home">Home</Link>
              </li>
              <li
                className={`font-poppins font-normal cursor-pointer text-[16px] mr-10 text-white `}
              >
                <Link to="/">Logout</Link>
              </li>
            </ul>
          ) : (
            <ul className="list-none flex flex-col justify-end items-center flex-1">
              <li
                className={`font-poppins font-normal cursor-pointer text-[16px] mb-4 text-white `}
              >
                <Link to="/login">Login</Link>
              </li>
              <li
                className={`font-poppins font-normal cursor-pointer text-[16px] mr-0 text-white `}
              >
                <Link to="/register">Register</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
