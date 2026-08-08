"use client";

import { DataTable } from "@safelagoon/ui";

type Row = { app: string; time: string; status: string };

const rows: Row[] = [
  { app: "YouTube", time: "2h 14m", status: "Limited" },
  { app: "Chrome", time: "45m", status: "Allowed" },
  { app: "TikTok", time: "1h 02m", status: "Blocked" },
  { app: "Spotify", time: "32m", status: "Allowed" },
];

const columns = [
  {
    id: "app",
    header: "App",
    cell: (row: Row) => row.app,
    sortValue: (row: Row) => row.app,
  },
  {
    id: "time",
    header: "Time",
    cell: (row: Row) => row.time,
    sortValue: (row: Row) => row.time,
  },
  {
    id: "status",
    header: "Status",
    cell: (row: Row) => row.status,
    sortValue: (row: Row) => row.status,
    className: "text-end",
  },
];

export default function DataTableDemo() {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-body-14 text-muted-foreground">Default with sorting</p>
        <DataTable columns={columns} data={rows} getRowKey={(row) => row.app} />
      </div>
      <div>
        <p className="mb-2 text-body-14 text-muted-foreground">Bordered</p>
        <DataTable columns={columns} data={rows} border="bordered" sortable={false} getRowKey={(row) => row.app} />
      </div>
      <div>
        <p className="mb-2 text-body-14 text-muted-foreground">Striped</p>
        <DataTable columns={columns} data={rows} border="striped" sortable={false} getRowKey={(row) => row.app} />
      </div>
      <div>
        <p className="mb-2 text-body-14 text-muted-foreground">Minimal</p>
        <DataTable columns={columns} data={rows} border="minimal" sortable={false} getRowKey={(row) => row.app} />
      </div>
    </div>
  );
}
