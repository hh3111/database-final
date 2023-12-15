// Example navigation component
import React from 'react';
import { Link } from 'react-router-dom'
import "../Navigation.scss"

const Navigation = () => {
  return (
    <div className='nav'>
        <div className='jsondata'>
            <Link className='a' to="/">Logout</Link>
            <Link className='a' to="/graphs">Graphs</Link>
            <Link className='a' to="/listproperties">Your Properties</Link>
            <Link className='a' to="/addproperty">Add Property</Link>
            <Link className='a' to="/listdevices">Your Devices</Link>
            <Link className='a' to="/adddevice">Add Device</Link>
            <Link className='a' to="/adminpage">Admin Page</Link>
        </div>
        
    </div>
  );
};

export default Navigation;
