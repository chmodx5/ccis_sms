"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button, Card } from "@/components/ui";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GetStaffsResultStaff } from "@/lib/actions/staff/get-staffs";

export const staffTableColumns: ColumnDef<GetStaffsResultStaff>[] = [
    {
        accessorKey: "staffId",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="px-0"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Staff ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <Link
                href={`/staff/view/${row.original.id}`}
                className="text-blue-500 hover:underline"
            >
                {row.getValue("staffId")}
            </Link>
        ),
        footer: (props) => props.column.id,
    },
    {
        id: "fullName",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="px-0"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Full Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const { firstName, surname, middleName } = row.original;
            return <div>{`${firstName} ${surname} ${middleName || ""}`}</div>;
        },
        footer: (props) => props.column.id,
    },
    {
        accessorKey: "gender",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="px-0"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Gender
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "designation.name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="px-0"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Designation
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.original.designation?.name ?? "—"}</div>,
    },
    {
        accessorKey: "staffType",
        header: ({ column }) => (
            <Button
                variant="ghost"
                className="px-0"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Staff Type
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="capitalize">
                {row.original.staffType.replaceAll("_", " ")}
            </div>
        ),
    },
];
