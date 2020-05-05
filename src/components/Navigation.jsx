import React, { Component } from 'react';
import {FaUsers} from 'react-icons/fa';
import {Link} from '@reach/router';

class Navigation extends Component {
  render() {
    const {userName} = this.props;
    return (
      <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <FaUsers className="mr-1" /> Meeting Log
          </Link>
          <div className="navbar-nav ml-auto">
            {userName && (
              <Link className="nav-item nav-link" to="/meetings">
                meetings
              </Link>
            )}
            {!userName && (
              <Link className="nav-item nav-link" to="/login">
                log in
              </Link>
            )}
            {!userName && (
              <Link className="nav-item nav-link" to="/register">
                register
              </Link>
            )}
            {userName && (
              <Link className="nav-item nav-link" to="/login" onClick={this.props.logoutUser} >
              </Link>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
