import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DataListAction from "./ActionDropdown";
import { DataBlogSchema } from "@/types/BlogType";

type ColumnProps = DataBlogSchema;

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
    accessorKey: "cover_image",
    header: "Foto Sampul",
    cell: ({ row }) => {
      return (
        <>
          {row.original.cover_image ? (
            <img
              src={`/${row.original.cover_image}`}
              alt="foto sampul"
              className="h-12 max-w-16 rounded-sm object-contain"
            />
          ) : (
            "-"
          )}
        </>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Judul Artikel",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <>
          {row.original.status === "DRAFT" ? (
            <p className="w-fit rounded-md bg-neutral-300 px-3 py-1">draft</p>
          ) : (
            <p className="w-fit rounded-md bg-success px-3 py-1 text-success-foreground">
              publish
            </p>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "author",
    header: "Penulis",
    cell: ({ row }) => (row.original.author ? row.original.author : "Admin"),
  },
  {
    accessorKey: "updated_at",
    header: "Tanggal",
    cell: ({ row }) => {
      const formattedDate = row.original.updated_at
        ? new Intl.DateTimeFormat("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(new Date(row.original.updated_at))
        : "-";
      return <>{formattedDate}</>;
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => (
      <DataListAction errorMessage={errorMessage} dataBlog={row.original} />
    ),
  },
];
