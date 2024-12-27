import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DataListAction from "./ActionDropdown";
import { DataFAQSchema } from "@/types/FAQType";

type ColumnProps = DataFAQSchema;

export const columns = (errorMessage?: string): ColumnDef<ColumnProps>[] => [
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
    accessorKey: "question",
    header: "Pertanyaan",
  },
  {
    accessorKey: "answer",
    header: "Jawaban",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => (
      <DataListAction errorMessage={errorMessage} dataFAQ={row.original} />
    ),
  },
];
