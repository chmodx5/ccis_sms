"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Class, Student } from "@prisma/client";
import {
    Button,
    Card,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { GetStudentsResultStudent } from "@/lib/actions/student/get-students";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const studentsTableColumns: ColumnDef<GetStudentsResultStudent>[] = [
    {
        id: "studentPhoto",
        cell: ({ row }) => (
            <Card className="overflow-hidden aspect-square inline-block">
                <div className="aspect-square relative w-12 overflow-hidden rounded-md bg-gray-100">
                    <Image
                        src={row.original.studentPhoto ?? "/logo.png"}
                        alt={"site logo"}
                        className="h-full w-full object-contain"
                        width={200}
                        height={200}
                        objectFit="contain"
                        loading="lazy"
                    />
                </div>
            </Card>
        ),
        footer: (props) => props.column.id,
    },
    {
        accessorKey: "registrationNo",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Reg No
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div>
                <Link
                    href={`/students/view/${row.original.id}`}
                    className="text-blue-500 hover:underline"
                >
                    {row.getValue("registrationNo")}
                </Link>
            </div>
        ),
        footer: (props) => props.column.id,
    },
    {
        id: "fullName",
        accessorKey: "firstName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Full name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div>
                {`${row.original.firstName} ${row.original.surname} ${row.original.middleName} `}
            </div>
        ),
        footer: (props) => props.column.id,
    },
    {
        accessorKey: "gender",
        header: ({ column }) => {
            return (
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
            );
        },
    },
    {
        accessorKey: "class",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Class
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div>{row.original.class.name}</div>,
    },
];
