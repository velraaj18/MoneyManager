import { PanelMenu } from "primereact/panelmenu";

const Sidebar = () => {
  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
    },
    {
      label: "Transactions",
      icon: "pi pi-list",
    },
    {
      label: "Accounts",
      icon: "pi pi-wallet",
    },
    {
      label: "Reports",
      icon: "pi pi-chart-bar",
    },
  ];

  return (
    <div className="w-15rem flex justify-content-center">
      <PanelMenu model={items} className="w-full md:w-20rem"/>
    </div>
  );
};

export default Sidebar;
