import { Column } from "primereact/column";
import { ContextMenu } from "primereact/contextmenu";
import { DataTable } from "primereact/datatable";
import { useRef } from "react";

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
  menuModel?: any;
  selectedRow?: any;
  setSelectedRow?: (value: any) => void;
};

const DynamicTable = ({
  value,
  header,
  footer,
  size,
  columns,
  menuModel,
  selectedRow,
  setSelectedRow,
}: dynamicTableProps) => {

  const cm = useRef<any>(null)

  return (
    <div>

      {menuModel && (
        <ContextMenu
          model={menuModel}
          ref={cm}
        />
      )}

      <DataTable
        value={value}
        header={header}
        footer={footer}
        selectionMode="single"
        size={size}
        onContextMenu={(e) => {
          setSelectedRow?.(e.data)
          cm.current.show(e.originalEvent)
        }}
        contextMenuSelection={selectedRow}
        onContextMenuSelectionChange={(e) => setSelectedRow?.(e.value)}
      >

        {columns.map((col: customColumn) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            body={col.body}
          />
        ))}

      </DataTable>

    </div>
  )
}

export default DynamicTable;
