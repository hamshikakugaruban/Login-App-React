import React, { Component } from "react";
import { AUTHORIZION, TOKEN } from "./Constants/constant";
import History from "./Constants/History";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    function logOut() {
      localStorage.removeItem(AUTHORIZION);
      localStorage.removeItem(TOKEN);
      History.push("/");
      window.location.reload();
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <Link className="navbar-brand" to={"/sign-in"}>Sign-In</Link>
            <ul className="navbar-nav ml-auto">
              <li className="navbar-brand">
                {localStorage.getItem(AUTHORIZION) && (<a onClick={logOut}>Logout</a>)}
              </li>
            </ul>
      </nav>
    );
  }
}

export default Navbar;
