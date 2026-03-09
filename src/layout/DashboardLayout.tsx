import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />

      <div className="flex">
        <div className="surface-100 p-3">
          <Sidebar />
        </div>

        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
