import React, { useEffect, useState } from 'react';
import "../Navigation.scss"
import AdminPage from './AdminPage'
import axios from 'axios'

const DataTable = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/getdata')
      .then((response) => {
        setData(response.data)
      })
  }, []);
  
  return (
    <div>
      <AdminPage />
      <h1>Data</h1>
      <div className='jsondata'>
        {data.map((data) => {
          return (
            <p>{JSON.stringify(data)}</p>
          )
        })}
      </div>
    </div>
  );
};

export default DataTable;