import './App.css';
import RegisterUser from './Components/RegisterUser';
import CreateProperty from './Components/CreateProperty';
import RegisterDevice from './Components/RegisterDevice';
import { LoginContext } from './Components/LoginContext';
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './Pages/LoginPage'
import AdminPage from './Pages/AdminPage'
import CustomerTable from './Pages/CustomerTable'
import PropertyTable from './Pages/PropertyTable'
import DeviceTable from './Pages/DeviceTable'
import DataTable from './Pages/DataTable'
import GraphsPage from './Pages/GraphsPage'
import EnergyPerDayGraph from './Graphs/EnergyPerDayGraph';
import AvgEnergyUseGraph from './Graphs/AvgEnergyUseGraph';
import DeviceConsumptionGraph from './Graphs/DeviceConsumptionGraph';
import PropertyComparisonGraph from './Graphs/PropertyComparisonGraph';
import ListPropertiesPage from './Pages/ListPropertiesPage';
import ListDevicesPage from './Pages/ListDevicesPage';

function App() {
  const [user, setUser] = useState({
    cid: -1, username: '', password: '', fname: '', lname: '', address: '', zip:''
  })

  const router = createBrowserRouter([
    {
      path:"/",
      element: <LoginPage />
    },
    {
      path:"/register",
      element: <RegisterUser />
    },
    {
      path:"/addproperty",
      element: <CreateProperty />
    },
    {
      path:"/adddevice",
      element: <RegisterDevice />
    },
    {
      path:"/adminpage",
      element: <AdminPage />
    },
    {
      path:"/customertable",
      element: <CustomerTable />
    },
    {
      path:"/propertytable",
      element: <PropertyTable />
    },
    {
      path:"/devicetable",
      element: <DeviceTable />
    },
    {
      path:"/datatable",
      element: <DataTable />
    },
    {
      path:"/graphs",
      element: <GraphsPage />
    },
    {
      path:"/energyday",
      element: <EnergyPerDayGraph />
    },
    {
      path:"/energyavg",
      element: <AvgEnergyUseGraph />
    },
    {
      path:"/deviceenergy",
      element: <DeviceConsumptionGraph />
    },
    {
      path:"/propertyenergy",
      element: <PropertyComparisonGraph />
    },
    {
      path:"/listproperties",
      element: <ListPropertiesPage />
    },
    {
      path:"/listdevices",
      element: <ListDevicesPage />
    }
  ])

  return (
      <div className="App">
        <header className="App-header">
          <LoginContext.Provider value={{user, setUser}}>
            <RouterProvider router={router} />
          </LoginContext.Provider>
        </header>
      </div>
  );
}

export default App;
