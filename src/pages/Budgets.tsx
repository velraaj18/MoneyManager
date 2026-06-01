import { useEffect, useMemo, useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import type { CategoryResponse } from "../types/Category";
import type { BudgetRequest, BudgetResponse } from "../types/Budget";
import { CategoryService } from "../services/categoryService";
import { BudgetService } from "../services/budgetService";
import DynamicTable, { type customColumn } from "../components/DynamicTable";
import { DynamicModal } from "../components/DynamicModal";
import { BudgetCharts } from "../components/CustomCharts/BudgetCharts";

type BudgetRow = BudgetResponse;

const monthOptions = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 6 }, (_, index) => ({
  label: `${currentYear - 2 + index}`,
  value: currentYear - 2 + index,
}));

const formatCurrency = (value: number) =>
  `INR ${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

const getBudgetSpent = (budget: BudgetRow) =>
  Math.max(
    Number(
      budget.amountSpent ??
        Number(budget.spendLimit ?? 0) - Number(budget.amountRemaining ?? 0),
    ),
    0,
  );

const Budgets = () => {
  const [budgets, setBudgets] = useState<BudgetRow[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [selectedBudgetId, setSelectedBudgetId] = useState<number | undefined>();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [spendLimit, setSpendLimit] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number | null>(currentYear);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      const [budgetRes, categoryRes] = await Promise.all([
        BudgetService.getAll(),
        CategoryService.getAll(),
      ]);
      const budgetData = Array.isArray(budgetRes.data?.data) ? budgetRes.data.data : [];
      const categoryData = Array.isArray(categoryRes.data.data)
          ? categoryRes.data.data.filter((x: CategoryResponse) => x.transactionType == 1)
          : [];

      setBudgets(budgetData as BudgetRow[]);
      setCategories(categoryData as CategoryResponse[]);
    } catch {
      setError("Unable to load budgets right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const selectedBudget = budgets.find(
    (x) => (x.budgetUID) === selectedBudgetId,
  );

  useEffect(() => {
    if (!selectedBudget) {
      setSelectedCategoryId(null);
      setSpendLimit(null);
      setMonth(new Date().getMonth() + 1);
      setYear(currentYear);
      return;
    }

    setSelectedCategoryId(selectedBudget.categoryId ?? null);
    setSpendLimit(selectedBudget.spendLimit ?? null);
    setMonth(selectedBudget.month ?? null);
    setYear(selectedBudget.year ?? null);
  }, [selectedBudget]);

  const totals = useMemo(() => {
    const totalBudget = budgets.reduce(
      (sum, budget) => sum + Number(budget.spendLimit ?? 0),
      0,
    );
    const totalSpent = budgets.reduce(
      (sum, budget) => sum + getBudgetSpent(budget),
      0,
    );
    const totalRemaining = budgets.reduce(
      (sum, budget) => sum + Number(budget.amountRemaining ?? 0),
      0,
    );

    return {
      totalBudget,
      totalSpent,
      totalRemaining,
      utilization: totalBudget ? Math.min((totalSpent / totalBudget) * 100, 100) : 0,
    };
  }, [budgets]);

  const visibleBudgets = budgets.filter((budget) => {
    const categoryName = budget.categoryName?.toLowerCase() ?? "";
    const query = search.trim().toLowerCase();
    return !query || categoryName.includes(query);
  });

  const handleSave = async () => {
    if (selectedCategoryId == null || spendLimit == null || month == null || year == null) {
      return;
    }

    const payload: BudgetRequest = {
      budgetId: selectedBudgetId,
      categoryId: selectedCategoryId,
      spendLimit,
      month,
      year,
    };

    if (selectedBudgetId != null) {
      await BudgetService.update(payload);
    } else {
      await BudgetService.add(payload);
    }

    await loadData();
    setModalVisible(false);
    setSelectedBudgetId(undefined);
  };

  const handleAddClick = () => {
    setSelectedBudgetId(undefined);
    setSelectedCategoryId(null);
    setSpendLimit(null);
    setMonth(new Date().getMonth() + 1);
    setYear(currentYear);
    setModalVisible(true);
  };

  const monthLabel = (value?: number | null) =>
    monthOptions.find((x) => x.value === value)?.label ?? value ?? "";

  const columnsForTable: customColumn[] = [
    { field: "categoryName", header: "Category" },
    {
      field: "period",
      header: "Period",
      body: (row: BudgetRow) => `${monthLabel(row.month)} ${row.year}`,
    },
    {
      field: "spendLimit",
      header: "Budget",
      body: (row: BudgetRow) => formatCurrency(Number(row.spendLimit ?? 0)),
    },
    {
      field: "amountSpent",
      header: "Spent",
      body: (row: BudgetRow) => formatCurrency(getBudgetSpent(row)),
    },
    {
      field: "amountRemaining",
      header: "Remaining",
      body: (row: BudgetRow) => formatCurrency(Number(row.amountRemaining ?? 0)),
    },
    {
      field: "actions",
      header: "Actions",
      body: (row: BudgetRow) => (
        <Button
          icon="pi pi-pencil"
          severity="secondary"
          text
          onClick={() => {
            const budgetId = row.budgetUID;

            if (budgetId == null) {
              setError(
                "This budget row does not contain an ID, so edit cannot be saved until the API returns BudgetUID or BudgetId.",
              );
              return;
            }

            setError("");
            setSelectedBudgetId(budgetId);
            setSelectedCategoryId(row.categoryId ?? null);
            setSpendLimit(row.spendLimit ?? null);
            setMonth(row.month ?? null);
            setYear(row.year ?? null);
            setModalVisible(true);
          }}
        />
      ),
    },
  ];

  const modalHeader = (
    <div className="flex align-items-center gap-2">
      <i className={selectedBudgetId ? "pi pi-pencil" : "pi pi-plus"}></i>
      <span>{selectedBudgetId ? "Edit Budget" : "Add Budget"}</span>
    </div>
  );

  const modalFooter = (
    <div className="flex align-items-center justify-content-between">
      <Button
        label="Cancel"
        className="p-2"
        icon="pi pi-times"
        severity="secondary"
        text
        onClick={() => setModalVisible(false)}
      />
      <Button label="Save" className="p-2" icon="pi pi-check" onClick={handleSave} />
    </div>
  );

  const content = (
    <div className="flex flex-column gap-3">
      <div className="flex flex-column gap-1">
        <label>Category</label>
        <Dropdown
          value={selectedCategoryId}
          options={categories}
          optionLabel="categoryName"
          optionValue="categoryUID"
          placeholder="Select a category"
          onChange={(e: DropdownChangeEvent) => setSelectedCategoryId(e.value)}
        />
      </div>

      <div className="flex flex-column gap-1">
        <label>Budget Limit</label>
        <InputNumber
          value={spendLimit}
          onValueChange={(e) => setSpendLimit(e.value ?? null)}
          mode="currency"
          currency="INR"
          locale="en-IN"
          placeholder="Enter budget limit"
        />
      </div>

      <div className="grid">
        <div className="col-12 md:col-6 flex flex-column gap-1">
          <label>Month</label>
          <Dropdown
            value={month}
            options={monthOptions}
            optionLabel="label"
            optionValue="value"
            placeholder="Select month"
            onChange={(e: DropdownChangeEvent) => setMonth(e.value)}
          />
        </div>

        <div className="col-12 md:col-6 flex flex-column gap-1">
          <label>Year</label>
          <Dropdown
            value={year}
            options={years}
            optionLabel="label"
            optionValue="value"
            placeholder="Select year"
            onChange={(e: DropdownChangeEvent) => setYear(e.value)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Planning</p>
          <h2 className="dashboard-title">Budgets</h2>
          <p className="dashboard-subtitle">
            Keep category limits, monthly spend, and remaining budget visible in one place.
          </p>
        </div>

        <div className="dashboard-toolbar">
          <InputText
            value={search}
            placeholder="Search categories"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button className="flex align-items-center gap-2 p-2" onClick={handleAddClick}>
            <i className="pi pi-plus"></i>
            <span className="hidden md:block">New Budget</span>
          </Button>
        </div>
      </div>

      {error && <div className="dashboard-alert">{error}</div>}

      <div className="grid dashboard-metrics">
        <div className="col-12 md:col-4">
          <Card className="metric-card-panel metric-balance">
            <div className="metric-card">
              <div>
                <span className="metric-label">Total Budget</span>
                <div className="metric-value">{formatCurrency(totals.totalBudget)}</div>
              </div>
              <span className="metric-icon pi pi-wallet" />
            </div>
          </Card>
        </div>

        <div className="col-12 md:col-4">
          <Card className="metric-card-panel metric-expenses">
            <div className="metric-card">
              <div>
                <span className="metric-label">Spent</span>
                <div className="metric-value">{formatCurrency(totals.totalSpent)}</div>
              </div>
              <span className="metric-icon pi pi-arrow-down" />
            </div>
          </Card>
        </div>

        <div className="col-12 md:col-4">
          <Card className="metric-card-panel metric-income">
            <div className="metric-card">
              <div>
                <span className="metric-label">Remaining</span>
                <div className="metric-value">{formatCurrency(totals.totalRemaining)}</div>
              </div>
              <span className="metric-icon pi pi-chart-line" />
            </div>
          </Card>
        </div>
      </div>

        <div className="col-12 lg:col-5">
          <Card title="Budget Health" className="dashboard-panel">
            <div className="flex flex-column gap-3">
              <div>
                <div className="metric-label">Utilization</div>
                <div className="metric-value" style={{ fontSize: "1.35rem" }}>
                  {totals.utilization.toFixed(0)}%
                </div>
              </div>
              <div className="dashboard-loading" style={{ paddingTop: 0 }}>
                This view helps you spot categories that are running hot before the month ends.
              </div>
              <BudgetCharts data={visibleBudgets.slice(0, 3)} loading={false} />
            </div>
          </Card>
        </div>

      <div className="mt-4">
        <Card title="Budget List" className="dashboard-panel">
          <DynamicTable value={visibleBudgets} columns={columnsForTable} size="small" />
        </Card>
      </div>

      <DynamicModal
        visible={modalVisible}
        setVisible={setModalVisible}
        header={modalHeader}
        footer={modalFooter}
        content={content}
      />
    </div>
  );
};

export default Budgets;
