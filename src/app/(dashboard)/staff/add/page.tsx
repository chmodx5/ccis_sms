import { StaffForm } from "@/components/forms/staff-form";
import { getStaffDesignations } from "@/lib/actions/staff-designation/get-staff-designations";
import React from "react";
import { toast } from "sonner";

const AddStaffPage = async () => {
    //get staff designations
    const { data: staffDesignations, error: staffDesignationsError } =
        await getStaffDesignations({
            orderBy: {
                field: "name",
                direction: "asc",
            },
        });

    if (staffDesignationsError) {
        toast.error("Error fetching staff designations. Please reload page");
    }

    return (
        <div>
            <StaffForm
                formType="add"
                staffDesignations={staffDesignations ?? []}
            />
        </div>
    );
};

export default AddStaffPage;
