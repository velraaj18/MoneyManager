import { useState } from "react";
import Navbar from "../components/Navbar";
import SidebarMenu from "../components/Sidebar";
import { Sidebar } from "primereact/sidebar";
import { Outlet } from "react-router-dom";


const DashboardLayout = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="dashboard-shell h-screen flex flex-column">
      <Navbar onMenuClick={() => setVisible(true)} />

      <div className="dashboard-shell-body flex flex-1">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block dashboard-sidebar p-3 w-18rem">
          <SidebarMenu />
        </div>

        {/* Mobile Sidebar */}
        <Sidebar
          visible={visible}
          onHide={() => setVisible(false)}
          className="dashboard-mobile-sidebar"
        >
          <SidebarMenu />
        </Sidebar>

        {/* Content */}
        <div className="dashboard-content flex-1 p-4 overflow-auto">
          {/* When using layout routing, the layout must render the child route using Outlet. */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
