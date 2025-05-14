import { StudentForm } from "@/components/forms/student-form";
import { getAcademicYears } from "@/lib/actions/academic-year/get-academic-years";
import { getClasses } from "@/lib/actions/class/get-classes";
import React from "react";
import { toast } from "sonner";

const AddStudentPage = async () => {
    //  get classes
    const { data: classes, error: classesError } = await getClasses({
        orderBy: {
            field: "name",
            direction: "asc",
        },
    });

    if (classesError) {
        toast.error("Error fetching classes. Please reload page");
    }

    // get academic years
    const { data: AcademicYears, error: academicYearError } =
        await getAcademicYears({
            orderBy: {
                field: "name",
                direction: "asc",
            },
        });

    if (academicYearError) {
        toast.error("Error fetching academic years. Please reload page");
    }

    return (
        <div>
            <StudentForm
                classes={classes ?? []}
                academicYears={AcademicYears ?? []}
                formType="add"
            />
        </div>
    );
};

export default AddStudentPage;
