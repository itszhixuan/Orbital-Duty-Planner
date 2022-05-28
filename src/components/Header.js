import {useState} from "react";
import Navbar from "./Navbar";

function Header(props) {
    const { tasks } = props;
    return (
      <header>
        <h1>Plan-it</h1>
      </header>
    );
  }

  export default Header;