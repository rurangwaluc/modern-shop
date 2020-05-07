import React, { useState } from "react";
import { Redirect } from "react-router-dom";
// import Layout from "../core/Layout";
import Menu from "../core/Menu";
import Spinner from 'react-bootstrap/Spinner';


import { signin, authenticate, isAuthenticated } from "../auth";


const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () => (

         
  <form id='form-s'>
    <label  className='label'>
      <p className="label-txt">Email</p>
      <input onChange={handleChange('email')} type="email" className="input" value={email} />
      <div className="line-box">
        <div className="line"></div>
      </div>
    </label>
    
    <label  className='label'>
      <p className="label-txt">Password</p>
      <input  onChange={handleChange('password')} type="password" className="input" value={password} />
      <div className="line-box">
        <div className="line"></div>
      </div>
    </label>
    <button className='button' onClick={clickSubmit} type="submit">Login</button>
  </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <Spinner animation='border' role='status'>
            <span className='sr-only'>Loading...</span>
             </Spinner>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <div>
        <Menu />
            
               <div className="container col-md-8 offset-md-2">
                <div className='text-center mt-3'>
                    <h1 className='title'>Login</h1>
                    </div>
                {showLoading()}
                {showError()}
                {signUpForm()}
                {redirectUser()}
            </div>
        </div>
    );
};

export default Signin;