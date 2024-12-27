import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DataListAction from "./ActionDropdown";
import { DataTestimonySchema } from "@/types/TestimonyType";
import RenderStars from "@/Components/RenderStarts";

type ColumnProps = DataTestimonySchema;

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
    accessorKey: "testimoni_name",
    header: "Nama Testimoni",
  },
  {
    accessorKey: "satisfaction",
    header: "Tingkat Kepuasan",
    cell: ({ row }) => {
      const { satisfaction } = row.original;
      return (
        <>
          <RenderStars count={satisfaction} />
        </>
      );
    },
  },
  {
    accessorKey: "expression",
    header: "Ungkapan",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => (
      <DataListAction
        errorMessage={errorMessage}
        dataTestimony={row.original}
      />
    ),
  },
];
