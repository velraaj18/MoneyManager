import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import type { Account } from "../types/Account";
import type { Transaction } from "../types/Transaction";
import { CategoryService } from "../services/categoryService";

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  saveTransaction: (transaction: Transaction) => void;
  transaction?: Transaction | null;
};

const TransactionModal = ({
  visible,
  setVisible,
  saveTransaction,
  transaction,
}: Props) => {
  const [date, setDate] = useState<Date | null>(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<string[]>([])

  // Populate drop down values for category and account
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  // Pre-fill the modal on edit mode using the incoming "transaction" object
  useEffect(() => {
    if (!transaction) return;

    setDate(new Date(transaction.date));
    setAmount(transaction.amount.toString());
    setDescription(transaction.description);
    setSelectedCategory(transaction.category);
    setSelectedAccount(transaction.account);
  }, [transaction]);

  // Handle save
  const handleSave = () => {
    const transactionData: Transaction = {
      id: transaction?.id ?? Date.now(),
      date: date?.toISOString().split("T")[0] || "",
      description,
      category: selectedCategory || "",
      account: selectedAccount || "",
      amount: Number(amount),
    };

    saveTransaction(transactionData);
    setVisible(false);

    setDate(null);
    setAmount("");
    setDescription("");
    setSelectedCategory(null);
    setSelectedAccount(null);
  };

  const modalHeader = (
    <div className="flex align-items-center gap-2">
      <i className={transaction ? "pi pi-pencil" : "pi pi-plus"}></i>
      <span>{transaction ? "Edit Transaction" : "Add Transaction"}</span>
    </div>
  );

  const modalFooter = (
    <div className="flex align-items-center justify-content-between">
      <Button
        label="Cancel"
        className="p-2"
        icon="pi pi-cancel"
        onClick={() => setVisible(false)}
      />
      <Button
        label="Save"
        className="p-2"
        icon="pi pi-check"
        onClick={handleSave}
      />
    </div>
  );

  useEffect(() => {
    CategoryService.getAll().then((res) => {
      const names = res.data.data.map((c : any) => c.categoryName)
      console.log(names)
      setCategories(names)
    })
  }, [])

  const accounts: Account[] = [
    { name: "SBI", value: "SBI" },
    { name: "HDFC", value: "HDFC" },
    { name: "Others", value: "Others" },
  ];

  return (
    <Dialog
      visible={visible}
      style={{ width: "30rem" }}
      modal
      header={modalHeader}
      footer={modalFooter}
      onHide={() => setVisible(false)}
    >
      <div className="flex flex-column gap-3">
        <div className="flex flex-column gap-1">
          <label>Date</label>
          <Calendar
            value={date}
            placeholder="Select date"
            name="date"
            showIcon
            onChange={(e) => setDate(e.value as Date)}
          />
        </div>

        <div className="flex flex-column gap-1">
          <label>Amount</label>
          <InputText
            value={amount}
            placeholder="Enter amount"
            name="amount"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex flex-column gap-1">
          <label>Category</label>
          <Dropdown
            options={categories}
            value={selectedCategory}
            onChange={(e: DropdownChangeEvent) => setSelectedCategory(e.value)}
            optionLabel="name"
            optionValue="value"
            placeholder="Select a category"
          />
        </div>

        <div className="flex flex-column gap-1">
          <label>Account</label>
          <Dropdown
            options={accounts}
            value={selectedAccount}
            onChange={(e: DropdownChangeEvent) => setSelectedAccount(e.value)}
            optionLabel="name"
            optionValue="value"
            placeholder="Select a account"
          />
        </div>

        <div className="flex flex-column gap-1">
          <label>Description</label>
          <InputText
            value={description}
            placeholder="Optional note"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default TransactionModal;
