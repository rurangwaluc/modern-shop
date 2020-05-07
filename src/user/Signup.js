import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';
import Menu from "../core/Menu";




const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: ' ',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values;

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
       
  <form id='form-s'>
  <label className='label'>
      <p className="label-txt">Name</p>
      <input  onChange={handleChange('name')} type="text" className="input"  value={name} />
      <div className="line-box">
        <div className="line"></div>
      </div>
    </label>
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
    <button className='button' onClick={clickSubmit} type="submit">Register</button>
  </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (
        <div>
            <Menu />
            <div className="container col-md-8 offset-md-2">
                <div className='text-center mt-3'>
                    <h1 className='title'>Register</h1>

                </div>
                {showSuccess()}
                {showError()}
                {signUpForm()}
            </div>
        </div>
    );
};

export default Signup;