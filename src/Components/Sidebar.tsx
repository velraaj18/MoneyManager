import { PanelMenu } from "primereact/panelmenu";

const Sidebar = () => {
  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      url: "/"
    },
    {
      label: "Transactions",
      icon: "pi pi-list",
      url: "/transactions"
    },
    {
      label: "Accounts",
      icon: "pi pi-wallet",
      url: "/accounts"
    },
    {
      label: "Reports",
      icon: "pi pi-chart-bar",
      url: "/reports"
    },
    {
      label: "Category",
      icon: "pi pi-bars",
      url: "/Category"
    },
  ];

  return (
    <div className="app-sidebar">
      <PanelMenu model={items} className="app-sidebar-menu w-full" />
    </div>
  );
};

export default Sidebar;
