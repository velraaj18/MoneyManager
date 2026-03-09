import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const start = <span className="text-xl font-bold text-primary">Money Manager</span>;

  const end = (
    <div className="flex align-items-center gap-3">
      <Button icon="pi pi-bell" text rounded />
      <FaUserCircle size={24} />
    </div>
  );

  return(
    <>
      <Menubar start={start} end= {end}/>
    </>
  )
};

export default Navbar;
