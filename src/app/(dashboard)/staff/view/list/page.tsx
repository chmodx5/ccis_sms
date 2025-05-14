import { getStaffs } from "@/lib/actions/staff/get-staffs";
import React from "react";
import { toast } from "sonner";
import { staffTableColumns } from "./_components/staff-table-columns";
import { DataTable } from "@/components/data-table";

const StaffListPage = async (props: {
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

    const staffsResult = await getStaffs({
        orderBy: {
            field: sortField,
            direction: sort,
        },
        page,
        pageSize,
    });

    if (!staffsResult.success) {
        toast.error("Error fetching students. Please reload page");
        return null;
    }

    const { data: staffs, totalCount, totalPages } = staffsResult;

    return (
        <div>
            <DataTable
                columns={staffTableColumns}
                data={staffs || []}
                paginationControls={{
                    currentPage: page,
                    totalPages: totalPages,
                    baseUrl: "/staff/view/list",
                    pageParamName: "page",
                }}
            />
        </div>
    );
};

export default StaffListPage;
