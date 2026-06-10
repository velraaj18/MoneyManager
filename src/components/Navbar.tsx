import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

interface Props {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: Props) => {
  const navigate = useNavigate();
  const [logoutVisible, setLogoutVisible] = useState(false);

  const start = (
    <div className="flex align-items-center gap-3 navbar-start">
      <Button
        icon="pi pi-bars"
        className="p-button-text p-button-rounded navbar-menu-button lg:hidden"
        onClick={onMenuClick}
      />

      <span className="navbar-brand">
        <div className="app-sidebar-header">
        <div className="app-sidebar-badge">Money Manager</div>
      </div>
      </span>
    </div>
  );

  const end = (
    <div className="flex align-items-center gap-2 navbar-end">
      <Button
        label="Profile"
        icon="pi pi-user"
        severity="secondary"
        text
        className="navbar-action-button"
        onClick={() => navigate("/profile")}
      />
      <Button
        label="Logout"
        icon="pi pi-sign-out"
        severity="danger"
        outlined
        className="navbar-action-button"
        onClick={() => setLogoutVisible(true)}
      />
      <div className="navbar-avatar">
        <span>MM</span>
      </div>
    </div>
  );

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLogoutVisible(false);
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Menubar
        start={start}
        end={end}
        className="app-navbar"
        pt={{ button: { className: "hidden" } }}
      />

      <Dialog
        visible={logoutVisible}
        onHide={() => setLogoutVisible(false)}
        header="Sign out"
        className="logout-dialog"
        draggable={false}
        resizable={false}
        footer={
          <div className="flex justify-content-end gap-2">
            <Button label="Cancel" text severity="secondary" onClick={() => setLogoutVisible(false)} />
            <Button label="Logout" icon="pi pi-sign-out" severity="danger" onClick={handleLogout} />
          </div>
        }
      >
        <p className="m-0 text-600">
          You will be signed out of Money Manager and returned to the login screen.
        </p>
      </Dialog>
    </>
  );
};

export default Navbar;
