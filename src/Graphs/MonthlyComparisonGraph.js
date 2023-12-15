import React, { useEffect, useState } from 'react';
import Navigation from '../Components/Navigation';
import "../Navigation.scss"
import axios from 'axios'
import { Chart } from 'react-google-charts'
import { Link } from 'react-router-dom';

const MonthlyComparisonGraph = () => {
  const [data, setData] = useState([])
  const [month, setMonth] = useState(11)

  const options = {
    title: "Monthly Energy Consumption",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Energy Consumption",
      minValue: 0,
    },
    vAxis: {
      title: "Month",
    },
  }

  useEffect(() => {
    axios.post('http://localhost:3001/dataquery', {
      query: `SELECT MONTH(timestamp) as month, SUM(value) as total FROM Data GROUP BY month`
    }).then((response) => {
      const energyData = [['Month', 'Energy Used']]
      const tempdata = response.data
      tempdata.map(function (element) {
        energyData.push([parseInt(element.month), parseFloat(element.total)])
      })
      energyData.sort(function (a, b) {
        return a[0] - b[0];
      });
      console.log(energyData)
      setData(energyData)
    })

  }, [month]);

  return (
    <div>
      <h3>Monthly Energy Consumption</h3>
      <Chart className='chart' chartType="BarChart" data={data} options={options}/>
    </div>
  );
};

export default MonthlyComparisonGraph;