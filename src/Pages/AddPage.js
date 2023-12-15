// AboutPage.js
import React from 'react';
import CreateProperty from '../Components/CreateProperty'
import RegisterDevice from '../Components/RegisterDevice';
import Navigation from '../Components/Navigation';

const AddPage = () => {
  return (
    <div>
        <Navigation />
        <h1>Add Page</h1>
        <CreateProperty />
        <RegisterDevice />
    </div>
  );
};

export default AddPage;