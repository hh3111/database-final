import React from 'react';
import Navigation from '../Components/Navigation';
import { Link } from 'react-router-dom'
import "../Navigation.scss"


const LoginPage = () => {
  return (
    <div className='jsondata'>
        <Navigation />
        <div className='nav'>
            <Link className='a' to="/customertable">Customers</Link>
            <Link className='a' to="/propertytable">Properties</Link>
            <Link className='a' to="/devicetable">Devices</Link>
            <Link className='a' to="/datatable">Data</Link>
        </div>
    </div>
  );
};

export default LoginPage;