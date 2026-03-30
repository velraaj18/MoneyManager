import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export type customColumn = {
  field: string;
  header: string;
  body?: any;
};

type dynamicTableProps = {
  value: any;
  header?: any;
  footer?: any;
  size: "small" | "normal" | "large";
  columns: customColumn[];
};

const DynamicTable = ({
  value,
  header,
  footer,
  size,
  columns,
}: dynamicTableProps) => {
  return (
    <div>
      <DataTable value={value} header={header} footer={footer} size={size}>
        {columns.map((col: customColumn) => (
          <Column key={col.field} field={col.field} header={col.header} body={col.body} />
        ))}
      </DataTable>
    </div>
  );
};

export default DynamicTable;
