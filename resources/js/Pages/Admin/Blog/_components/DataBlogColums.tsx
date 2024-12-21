import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DataListAction from "./ActionDropdown";
import { User } from "@/types";

type ColumnProps = User;

export const columns: ColumnDef<ColumnProps>[] = [
  {
    accessorKey: "id",
    cell: (info) => info.row.index + 1,
    header: ({ column }) => {
      return (
        <button
          className="flex w-fit items-center justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No. <ArrowUpDown className="ml-1 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nama Lengkap",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (row.original.email === "" ? "-" : row.original.email),
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => <DataListAction dataUser={row.original} />,
  },
];
