import { Card } from "primereact/card";

const Dashboard = () => {
  return (
    <div className="grid">
      <div className="col-12 md:col-6 lg:col-3">
        <Card title="Balance">₹ 45,000</Card>
      </div>

      <div className="col-12 md:col-6 lg:col-3">
        <Card title="Expenses">₹ 12,000</Card>
      </div>

      <div className="col-12 md:col-6 lg:col-3">
        <Card title="Income">₹ 25,000</Card>
      </div>

      <div className="col-12 md:col-6 lg:col-3">
        <Card title="Savings">₹ 8,000</Card>
      </div>
    </div>
  );
};

export default Dashboard;
