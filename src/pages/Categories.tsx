import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import type {
  Category,
  CategoryRequest,
  CategoryResponse,
} from "../types/Category";
import { CategoryService } from "../services/categoryService";
import DynamicTable, { type customColumn } from "../components/DynamicTable";
import { DynamicModal } from "../components/DynamicModal";
import { InputText } from "primereact/inputtext";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";
import { getTransactionTypeLabel } from "../utils/TransactionTypeHelper";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import { TransactionTypeCode } from "../enums/TransactionTypeCode";
import { Card } from "primereact/card";

const Categories = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryResponse | null>(null);
  const [selectedTransactionType, setSelectedTransactionType] = useState<number | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const loadCategories = async () => {
    const res = await CategoryService.getAll();
    setCategories(res.data.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    setCategoryName(selectedCategory.categoryName);
    setDescription(selectedCategory.description);
    setSelectedTransactionType(selectedCategory.transactionType);
  }, [selectedCategory]);

  const handleSave = async () => {
    if (selectedTransactionType == null) return;

    const payload: CategoryRequest = {
      categoryName,
      description,
      transactionType: selectedTransactionType,
    };

    if (selectedCategory) {
      await CategoryService.update(selectedCategory.categoryUID, payload);
    } else {
      await CategoryService.post(payload);
    }
    await loadCategories();
    setModalVisible(false);
  };

  const accept = async () => {
    if (!selectedCategory) return;
    await CategoryService.delete(selectedCategory.categoryUID);
    await loadCategories();
  };

  const transactionTypeTemplate = (rowData: Category) =>
    getTransactionTypeLabel(rowData.transactionType);

  const transactionTypes = Object.entries(TransactionTypeCode)
    .filter(([, value]) => value !== 0)
    .map(([key, value]) => ({
      name: key,
      value,
    }));

  const columns: customColumn[] = [
    { field: "categoryName", header: "Category Name" },
    { field: "transactionTypeCode", header: "Type", body: transactionTypeTemplate },
    { field: "description", header: "Description" },
  ];

  const content = (
    <div className="flex flex-column gap-3">
      <div className="flex flex-column gap-1">
        <label>Transaction Type</label>
        <Dropdown
          options={transactionTypes}
          value={selectedTransactionType}
          onChange={(e: DropdownChangeEvent) => setSelectedTransactionType(e.value)}
          optionLabel="name"
          optionValue="value"
          placeholder="Select transaction type"
        />
      </div>
      <div className="flex flex-column gap-1">
        <label>Category Name</label>
        <InputText
          value={categoryName}
          placeholder="Enter category name"
          name="categoryName"
          onChange={(e) => setCategoryName(e.target.value)}
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
  );

  const modalHeader = (
    <div className="flex align-items-center gap-2">
      <i className={selectedCategory ? "pi pi-pencil" : "pi pi-plus"}></i>
      <span>{selectedCategory ? "Edit Category" : "Add Category"}</span>
    </div>
  );

  const modalFooter = (
    <div className="flex align-items-center justify-content-between">
      <Button label="Cancel" className="p-2" icon="pi pi-times" severity="secondary" text onClick={() => setModalVisible(false)} />
      <Button label="Save" className="p-2" icon="pi pi-check" onClick={handleSave} />
    </div>
  );

  const menuModel = [
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      command: () => setModalVisible(true),
    },
    {
      label: "Delete",
      icon: "pi pi-fw pi-times",
      command: () => setDeleteModalVisible(true),
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Organization</p>
          <h2 className="dashboard-title">Categories</h2>
          <p className="dashboard-subtitle">
            Shape how your spending and income are grouped for better tracking.
          </p>
        </div>

        <div className="dashboard-toolbar">
          <Button
            className="flex align-items-center gap-2 p-2"
            onClick={() => {
              setModalVisible(true);
              setCategoryName("");
              setDescription("");
              setSelectedCategory(null);
            }}
          >
            <i className="pi pi-plus"></i>
            <span className="hidden md:block">Add Category</span>
          </Button>
        </div>
      </div>

      <Card className="dashboard-panel">
        <DynamicTable
          value={categories}
          columns={columns}
          size="small"
          menuModel={menuModel}
          selectedRow={selectedCategory}
          setSelectedRow={setSelectedCategory}
        />
      </Card>

      <DynamicModal
        visible={modalVisible}
        setVisible={setModalVisible}
        header={modalHeader}
        footer={modalFooter}
        content={content}
      />

      <DeleteConfirmDialog
        message="Do you want to delete?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        visible={deleteModalVisible}
        setVisibile={setDeleteModalVisible}
        accept={accept}
      />
    </div>
  );
};

export default Categories;
