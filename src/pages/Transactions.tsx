import { Button } from "primereact/button";

import { useState } from "react";
import TransactionModal from "../components/TransactionModal";
import RecentTransactions from "../components/RecentTransactions";

const Transactions = () => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <div className="flex justify-content-between align-items-center">
        <h3 className="m-0">Transactions</h3>

        <Button className="flex align-items-center gap-2 p-2" onClick={() => setVisible(true)}>
          <i className="pi pi-plus"></i>
          <span className="hidden md:block">Add Transaction</span>
        </Button>
      </div>

      <RecentTransactions/>

      <TransactionModal visible={visible} setVisible={setVisible}/>
      
    </>
  );
};

export default Transactions;