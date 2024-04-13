import './core/styles/global.scss';

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import Navbar from './core/components/navbar/Navbar';
import Sidebar from './core/components/sidebar/Sidebar';
import EWSResult from './features/HealthRecord/presentation/pages/ews_result/EWSResult';
import Home from './features/PatientData/presentation/pages/home/Home';
import EWSTablePage from './features/EWSTable/presentation/pages/ews_table/EWSTablePage';
import ProtocolLists from './features/Protocols/presentation/pages/protocol_lists/ProtocolLists';
import AddUpdateData from './features/PatientData/presentation/pages/add_update_data/AddUpdateData';
import PatientHealthRecord from './features/HealthRecord/presentation/pages/patient_health_record/PatientHealthRecord';
import AddUpdateRecord from './features/HealthRecord/presentation/pages/add_update_data/AddUpdateRecord';

function App() {

  // LAYOUTS
  const Layout = () =>{
    return (
      <div className="main d-flex">
        <div className="sidebar-container p-3">
          <Sidebar />
        </div>
        <div className="content-container px-4 py-3">
          <Navbar />
          <Outlet />
        </div>
      </div>
    )
  }

  // ROUTER
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        // PATIENTS
        {
          path:"/",
          element: <Home />
        },
        {
          path: "/patient/add-data",
          element: <AddUpdateData />,
        },
        {
          path: "/patient/records/:id",
          element: <PatientHealthRecord />,
        },
        {
          path: "/patient/records/add",
          element: <AddUpdateRecord />,
        },
        {
          path: "/patient/ews/result/:id",
          element: <EWSResult />,
        },
        // EWS TABLE
        {
          path: "/ews-table",
          element: <EWSTablePage />,
        },
        // PROTOCOL LISTS
        {
          path: "/protocols",
          element: <ProtocolLists />,
        },
      ]
    },
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
