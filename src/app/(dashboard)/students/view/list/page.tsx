import { DataTable } from "@/components/data-table";
import { getStudents } from "@/lib/actions/student/get-students";
import React from "react";
import { toast } from "sonner";
import { studentsTableColumns } from "./_components/students-table-columns";

const ViewStudentsListPage = async (props: {
    searchParams?: {
        page?: string;
        sort?: string;
        pageSize?: string;
        sortField?: string;
    };
}) => {
    const searchParams = (await props.searchParams) ?? {};

    const page = parseInt(searchParams.page ?? "1");
    const sort = searchParams.sort === "desc" ? "desc" : "asc";
    const pageSize = parseInt(searchParams.pageSize ?? "10");
    const sortField = searchParams.sortField ?? "createdAt";

    const studentsResult = await getStudents({
        orderBy: {
            field: sortField,
            direction: sort,
        },
        page,
        pageSize,
    });

    if (!studentsResult.success) {
        toast.error("Error fetching students. Please reload page");
        return null;
    }

    const { data: students, totalCount, totalPages } = studentsResult;

    return (
        <div>
            <DataTable
                columns={studentsTableColumns}
                data={students || []}
                paginationControls={{
                    currentPage: page,
                    totalPages: totalPages, // Replace with actual total if available
                    baseUrl: "/students/view/list",
                    pageParamName: "page",
                }}
            />
        </div>
    );
};

export default ViewStudentsListPage;
