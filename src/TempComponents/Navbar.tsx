import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { FaUserCircle } from "react-icons/fa";

interface Props {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: Props) => {
  const start = (
    <div className="flex align-items-center gap-3 navbar-start">
      <Button
        icon="pi pi-bars"
        className="p-button-text p-button-rounded navbar-menu-button lg:hidden"
        onClick={onMenuClick}
      />

      <span className="navbar-brand">
        Money Manager
      </span>
    </div>
  );

  const end = (
    <div className="flex align-items-center gap-3 navbar-end">
      <Button icon="pi pi-bell" text rounded className="navbar-icon-button" />
      <div className="navbar-user">
        <FaUserCircle size={24} />
      </div>
    </div>
  );

  return (
    <Menubar
      start={start}
      end={end}
      className="app-navbar"
      pt={{ button: { className: "hidden" } }}
    />
  );
};

export default Navbar;
