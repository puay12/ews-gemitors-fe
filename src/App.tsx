import './core/styles/global.scss';

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import Navbar from './core/components/navbar/Navbar';
import Sidebar from './core/components/sidebar/Sidebar';
import EWSResult from './features/HealthRecord/presentation/pages/ews_result/EWSResult';
import Home from './features/PatientData/presentation/pages/home/Home';
import EWSTablePage from './features/EWSTable/presentation/pages/ews_table/EWSTablePage';
import ProtocolLists from './features/Protocols/presentation/pages/protocol_lists/ProtocolLists';
import AddData from './features/PatientData/presentation/pages/add_data/AddData';
import PatientHealthRecord from './features/HealthRecord/presentation/pages/patient_health_record/PatientHealthRecord';
import AddRecord from './features/HealthRecord/presentation/pages/add_data/AddRecord';
import UpdateData from './features/PatientData/presentation/pages/edit_data/UpdateData';
import UpdateRecord from './features/HealthRecord/presentation/pages/update_record/UpdateRecord';
import UpdateScore from './features/HealthRecord/presentation/pages/update_score/UpdateScore';
import { useState } from 'react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleCollapseSideBar = async () => {
    setSidebarOpen(!sidebarOpen);
  };

  // LAYOUTS
  const Layout = () => {
    const sidebarClass = sidebarOpen ? "sidebar-container p-3 sidebar-open" : "sidebar-container p-3";
    const contentClass = sidebarOpen ? "content-container px-4 py-3 content-open" : "content-container px-4 py-3";
    const toggleClass = sidebarOpen ? "btn-toggler btn" : "btn-toggler btn-open btn";
    
    return (
      <div className="main d-flex">
        <div className={sidebarClass}>
          <Sidebar />
        </div>
        <button className={toggleClass} type="button" onClick={handleCollapseSideBar}>
          <i className="fa fa-solid fa-bars"></i>
        </button>
        <div className={contentClass}>
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
          element: <AddData />,
        },
        {
          path: "/patient/update-data",
          element: <UpdateData />,
        },
        {
          path: "/patient/records/:id",
          element: <PatientHealthRecord />,
        },
        {
          path: "/patient/records/add",
          element: <AddRecord />,
        },
        {
          path: "/patient/records/update",
          element: <UpdateRecord />,
        },
        {
          path: "/patient/ews/result",
          element: <EWSResult />,
        },
        {
          path: "/patient/ews/update",
          element: <UpdateScore />,
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
