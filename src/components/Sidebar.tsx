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
      label: "Budgets",
      icon: "pi pi-chart-bar",
      url: "/budgets"
    },
    {
      label: "Categories",
      icon: "pi pi-bars",
      url: "/categories"
    },
  ];

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <div className="app-sidebar-title">Overview</div>
        <div className="app-sidebar-subtitle">Manage your money with clarity and speed.</div>
      </div>
      <PanelMenu model={items} className="app-sidebar-menu w-full" />
    </div>
  );
};

export default Sidebar;
