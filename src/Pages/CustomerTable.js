import React, { useEffect, useState } from 'react';
import "../Navigation.scss"
import AdminPage from './AdminPage'
import axios from 'axios'

const CustomerTable = () => {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/getcustomers')
      .then((response) => {
        setCustomers(response.data)
      })
  }, []);
  
  return (
    <div>
      <AdminPage />
      <h1>Customers</h1>
      <div className='jsondata'>
        {customers.map((customer) => {
          delete customer.password
          return (
            <p>{JSON.stringify(customer)}</p>
          )
        })}
      </div>
    </div>
  );
};

export default CustomerTable;