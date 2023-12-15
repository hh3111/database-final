import React from 'react';
import Login from '../Components/Login'
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
        <h1>Login</h1>
        <Login />
        <Link className='createaccount' to="/register"><h5>Create New Account</h5></Link>
        
    </div>
  );
};

export default LoginPage;