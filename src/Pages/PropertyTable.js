import React, { useEffect, useState } from 'react';
import "../Navigation.scss"
import AdminPage from './AdminPage'
import axios from 'axios'

const PropertyTable = () => {
  const [properties, setProperties] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/getproperties')
      .then((response) => {
        setProperties(response.data)
      })
  }, []);


  return (
    <div>
      <AdminPage />
      <h1>Properties</h1>
      <div className='jsondata'>
        {properties.map((property) => {
          delete property.password
          return (
            <p>{JSON.stringify(property)}</p>
          )
        })}
      </div>
    </div>
  );
};

export default PropertyTable;