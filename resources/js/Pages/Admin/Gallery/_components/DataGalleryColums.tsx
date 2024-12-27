import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DataListAction from "./ActionDropdown";
import { DataGallerySchema } from "@/types/GalleryType";

type ColumnProps = DataGallerySchema;

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
    accessorKey: "url_name",
    header: "Gambar",
    cell: ({ row }) => {
      return (
        <>
          {row.original.name_url ? (
            <img
              src={`/${row.original.name_url}`}
              alt="foto"
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
    header: "Judul Galeri",
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
  },
  {
    accessorKey: "event_date",
    header: "Tanggal Galeri",
    cell: ({ row }) => {
      const formattedDate = row.original.event_date
        ? new Intl.DateTimeFormat("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(row.original.event_date))
        : "-";
      return <>{formattedDate}</>;
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => (
      <DataListAction errorMessage={errorMessage} dataGallery={row.original} />
    ),
  },
];
