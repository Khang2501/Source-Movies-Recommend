import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Navbar.module.scss";
import { FaSearch } from "react-icons/fa";

type Props = {};

export default function Navbar({}: Props) {
  const navigate = useNavigate();

  const [background, setBackground] = useState<string>(classes.navbar);

  const changeBackground = () => {
    if (window.scrollY >= 120) {
      setBackground(`${classes["navbar"]} ${classes["background"]}`);
    } else {
      setBackground(classes.navbar);
    }
  };

  window.addEventListener("scroll", changeBackground);
  return (
    <div className={background}>
      <ul className={classes["navbar_ul"]}>
        <li
          className={classes["navbar_home"]}
          onClick={() => {
            navigate("/");
          }}
        >
          Movie App
        </li>
        <li
          className={classes["navbar_search"]}
          onClick={() => {
            navigate("/search");
          }}
        >
          <FaSearch />
        </li>
      </ul>
    </div>
  );
}
