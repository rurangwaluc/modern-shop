import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import img from "../img/fav.png";


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#000" };
    }
};

const Menu = ({ history }) => (
     <div id="navbar-content" className='container '>

        <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="container-fluid">
                            <img id='fav' src={img} alt="img"/>

                <button id='navbar-btn' className="btn  d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <i className="fas fa-align-justify"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link
                            className="nav-link"
                            style={isActive(history, "/")}
                            to="/"
                        >
                            Home
                    </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                            className="nav-link"
                            style={isActive(history, "/shop")}
                            to="/shop"
                        >
                            Shop
                    </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                            className="nav-link cart-icon"
                            style={isActive(history, "/cart")}
                            to="/cart"
                        >
                            <i className="fas fa-shopping-cart"></i>{' '}
                            <sup> <span className='item-count'>{itemTotal()}</span></sup>
                        </Link>
                        </li>
                        
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/user/dashboard")}
                            to="/user/dashboard"
                        >
                            Dashboard
                    </Link>
                    </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/admin/dashboard")}
                            to="/admin/dashboard"
                        >
                            Dashboard
                    </Link>
                    </li>
                )}

                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                         <Link
                                className="nav-link"
                                style={isActive(history, "/signin")}
                                to="/signin"
                            >
                                Login
                        </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                style={isActive(history, "/signup")}
                                to="/signup"
                            >
                                Register
                        </Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticated() && (
                    <li className="nav-item m-auto ">
                        <span
                            className="nav-link text-dark mb-2"
                            style={{ cursor: "pointer", color: "#ffffff" }}
                            onClick={() =>
                                signout(() => {
                                    history.push("/");
                                })
                            }
                        >
                            Logout
                    </span>
                    </li>
                )}
                    </ul>
                </div>
            </div>
        </nav>


    </div>
);

export default withRouter(Menu);