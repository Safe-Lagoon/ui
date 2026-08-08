"use client";

import * as React from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../brand/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

export type DataTableBorder = "default" | "bordered" | "striped" | "minimal";

export type DataTableColumn<T> = {
  id: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
  className?: string;
};

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  border?: DataTableBorder;
  sortable?: boolean;
  defaultSort?: { columnId: string; direction: "asc" | "desc" };
  className?: string;
  getRowKey: (row: T) => string;
}

const borderClasses: Record<DataTableBorder, string> = {
  default: "",
  bordered: "[&_td]:border [&_th]:border [&_td]:border-border-soft [&_th]:border-border-soft",
  striped: "[&_tbody_tr:nth-child(even)]:bg-muted/30",
  minimal: "[&_tr]:border-0 [&_thead]:border-b-2 [&_thead]:border-brand-blue",
};

export function DataTable<T>({
  columns,
  data,
  border = "default",
  sortable = true,
  defaultSort,
  className,
  getRowKey,
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState(defaultSort);

  const sortedData = React.useMemo(() => {
    if (!sort || !sortable) return data;
    const column = columns.find((c) => c.id === sort.columnId);
    if (!column?.sortValue) return data;
    const copy = [...data];
    copy.sort((a, b) => {
      const av = column.sortValue!(a);
      const bv = column.sortValue!(b);
      if (av < bv) return sort.direction === "asc" ? -1 : 1;
      if (av > bv) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [columns, data, sort, sortable]);

  const toggleSort = (columnId: string) => {
    const column = columns.find((c) => c.id === columnId);
    if (!column?.sortValue || !sortable) return;
    setSort((current) => {
      if (current?.columnId !== columnId) return { columnId, direction: "asc" };
      return { columnId, direction: current.direction === "asc" ? "desc" : "asc" };
    });
  };

  return (
    <Table className={cn(borderClasses[border], className)}>
      <TableHeader>
        <TableRow>
          {columns.map((column) => {
            const isSorted = sort?.columnId === column.id;
            const canSort = sortable && column.sortValue;
            return (
              <TableHead key={column.id} className={column.className}>
                {canSort ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-ms-3 h-8 gap-1 px-2 font-medium"
                    onClick={() => toggleSort(column.id)}
                  >
                    {column.header}
                    {isSorted ? (
                      sort.direction === "asc" ? (
                        <ArrowUp className="size-3.5" />
                      ) : (
                        <ArrowDown className="size-3.5" />
                      )
                    ) : (
                      <ArrowUpDown className="size-3.5 opacity-50" />
                    )}
                  </Button>
                ) : (
                  column.header
                )}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((row) => (
          <TableRow key={getRowKey(row)}>
            {columns.map((column) => (
              <TableCell key={column.id} className={column.className}>
                {column.cell(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
