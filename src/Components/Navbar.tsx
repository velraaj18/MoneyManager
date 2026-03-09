import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { FaUserCircle } from "react-icons/fa";

interface Props {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: Props) => {
  const start = (
    <div className="flex align-items-center gap-3">
      <Button
        icon="pi pi-bars"
        className="p-button-text lg:hidden"
        onClick={onMenuClick}
      />

      <span className="text-xl font-bold text-primary">
        Money Manager
      </span>
    </div>
  );

  const end = (
    <div className="flex align-items-center gap-3">
      <Button icon="pi pi-bell" text rounded />
      <FaUserCircle size={24} />
    </div>
  );

  return <Menubar start={start} end={end} pt={{button : {className : "hidden"} } }/>;
};

export default Navbar;