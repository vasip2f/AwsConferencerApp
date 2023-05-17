import { React, useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import '../App.css';


function NavbarOne() {
  const [date, setDate] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      setDate(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="w-full flex justify-center items-center" style={{ backgroundColor: 'lightblue' }}>
      <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <span className="text-black text-center text-2xl font-bold tracking-wider">𝕮𝖔𝖓𝖋𝖊𝖗𝖊𝖓𝖈𝖊 𝕽𝖔𝖔𝖒  𝕭𝖔𝖔𝓚𝖎𝖓𝖌</span>
          <button
            className="md:hidden rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() => setShowMenu(!showMenu)}
          >
            <svg viewBox="0 0 20 20" className="w-6 h-6 fill-current">
              <path
                fillRule="evenodd"
                d="M3 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 14a1 1 0 110-2h6a1 1 0 110 2H9z"
                clipRule="evenodd"
              />
            </svg>
          </button>

        </div>

        {/* <div className="text-right">
          <p className="date-time text-black text-size-10">{date}</p>
        </div> */}

        <div className={`md:flex md:items-center ${showMenu ? "block" : "hidden"}`}>
          <div className="flex flex-col md:flex-row md:mx-6">

            <p className="flex items-center justify-between">W𝖊𝖑𝖈𝖔𝖒𝖊 : {localStorage.getItem("email")}</p>
            <NavLink
              to="/Calendar"
              activeClassName="font-bold"
              className="my-1 text-gray-100 md:mx-4 md:my-0 hover:text-gray-300 text-black"
              onClick={() => setShowMenu(false)}
            >
              📅
            </NavLink>

            <NavLink
              to="/login"
              activeClassName="font-bold"
              className="my-1 text-gray-100 md:mx-4 md:my-0 hover:text-gray-300 text-black"
              onClick={() => setShowMenu(false)}
            >
              𝐋𝐨𝐠𝐨𝐮𝐭
            </NavLink>

          </div>
        </div>

      </div>

    </nav>
  )
}

export default NavbarOne