import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import type { CategoryRequest, CategoryResponse } from "../types/Category";
import { CategoryService } from "../services/categoryService";
import DynamicTable, { type customColumn } from "../components/DynamicTable";
import { DynamicModal } from "../components/DynamicModal";
import { InputText } from "primereact/inputtext";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";

const Categories = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryResponse | null>(null);

  const [categoryName, setCategoryName] = useState<string>("");
  const [description, setDescription] = useState("");

  const loadCategories = async () => {
    const res = await CategoryService.getAll();
    setCategories(res.data.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // For edit mode
  useEffect(() => {
    if (!selectedCategory) return;

    setCategoryName(selectedCategory.categoryName);
    setDescription(selectedCategory.description);
  }, [selectedCategory]);

  const handleSave = async () => {
    const payload : CategoryRequest = {
        categoryName : categoryName,
        description : description
    }

    if(selectedCategory){
        await CategoryService.update(selectedCategory.categoryUID, payload );
    }else{
        await CategoryService.post(payload);
    }
    await loadCategories(); 
    setModalVisible(false)
  }

    // Delete dialog accept function
    const accept = async () => {
      if (!selectedCategory) return;
      await CategoryService.delete(selectedCategory.categoryUID);
      
      await loadCategories();
    };

  var columns: customColumn[] = [
    { field: "categoryUID", header: "Category UID" },
    { field: "categoryName", header: "Category Name" },
    { field: "description", header: "Description" },
  ];

  var content = (
    <div className="flex flex-column gap-3">
      <div className="flex flex-column gap-1">
        <label>Account Name</label>
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
      <Button
        label="Cancel"
        className="p-2"
        icon="pi pi-cancel"
        onClick={() => setModalVisible(false)}
      />
      <Button
        label="Save"
        className="p-2"
        icon="pi pi-check"
        onClick={handleSave}
      />
    </div>
  );

  // Context menus
  const menuModel = [
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      command: () => {
        setModalVisible(true);
      },
    },
    {
      label: "Delete",
      icon: "pi pi-fw pi-times",
      command: () => {
        setDeleteModalVisible(true);
      },
    },
  ];

  return (
    <>
      <div className="flex justify-content-between align-items-center">
        <h3>List of Categories</h3>
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

      <DynamicTable
        value={categories}
        columns={columns}
        size="small"
        menuModel={menuModel}
        selectedRow={selectedCategory}
        setSelectedRow={setSelectedCategory}
      ></DynamicTable>

      <DynamicModal
        visible={modalVisible}
        setVisible={setModalVisible}
        header={modalHeader}
        footer={modalFooter}
        content={content}
      ></DynamicModal>

      <DeleteConfirmDialog message="Do you want to delete?"
          header="Confirmation"
          icon="pi pi-exclamation-triangle"
          visible={deleteModalVisible}
          setVisibile={setDeleteModalVisible}
          accept={accept}>

      </DeleteConfirmDialog>
    </>
  );
};

export default Categories;
