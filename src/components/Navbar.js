import React, { Component } from 'react';
import '../App.css';
import {AUTHORIZION,TOKEN} from './Constants/constant';
import History from './Constants/History';
import{Link} from 'react-router-dom'

class Navbar extends Component {
  render() {
    function logOut(){
        localStorage.removeItem(AUTHORIZION);
        localStorage.removeItem(TOKEN);
        History.push('/')
        window.location.reload()
      }
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>Sign-in</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="navbar-brand">  
                {localStorage.getItem(AUTHORIZION)&&<a onClick={logOut}>Logout</a>}
              </li>
              <li className="nav-item">
              {!localStorage.getItem(AUTHORIZION)&& <Link className="nav-link" to={"/sign-up"}><a>Sign up</a></Link>}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
