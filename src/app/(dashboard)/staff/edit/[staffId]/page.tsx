// app/(your-path)/staff/edit/[staffId]/page.tsx

import { getStaff } from "@/lib/actions/staff/get-staff";
import React from "react";
import { toast } from "sonner";
import { StaffForm } from "@/components/forms/staff-form";
import { getStaffDesignations } from "@/lib/actions/staff-designation/get-staff-designations";

const EditStaffPage = async ({
    params,
}: {
    params: Promise<{ staffId: string }>;
}) => {
    const { staffId } = await params;

    //get staff designations
    const { data: designations, error: designationError } =
        await getStaffDesignations({
            orderBy: {
                field: "name",
                direction: "asc",
            },
        });

    if (designationError) {
        toast.error("Error fetching designations. Please reload the page.");
    }

    // Fetch staff
    const getStaffRes = await getStaff(staffId);

    if (getStaffRes.success === false) {
        toast.error("Error fetching staff. Please reload the page.");
        return (
            <div>
                <h1 className="text-2xl font-bold">Error fetching staff</h1>
                <p>{getStaffRes.error}</p>
            </div>
        );
    }

    console.log(getStaffRes.data);

    return (
        <div>
            <StaffForm
                staffDesignations={designations ?? []}
                formType="update"
                initialData={getStaffRes.data}
            />
        </div>
    );
};

export default EditStaffPage;
