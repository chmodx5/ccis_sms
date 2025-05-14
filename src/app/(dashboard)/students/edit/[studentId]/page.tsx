import { getAcademicYears } from "@/lib/actions/academic-year/get-academic-years";
import { getClasses } from "@/lib/actions/class/get-classes";
import React from "react";
import { toast } from "sonner";
import { StudentForm } from "@/components/forms/student-form";
import { getStudent } from "@/lib/actions/student/get-student";

const EditStudentPage = async ({
    params,
}: {
    params: Promise<{ studentId: string }>;
}) => {
    const { studentId } = await params;

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

    // get academic years
    const getStudentRes = await getStudent(studentId);

    if (getStudentRes.success === false) {
        toast.error("Error fetching academic years. Please reload page");
        return (
            <div>
                <h1 className="text-2xl font-bold">Error fetching student</h1>
                <p>{getStudentRes.error}</p>
            </div>
        );
    }

    console.log("getStudentRes", getStudentRes);
    return (
        <div>
            <StudentForm
                classes={classes ?? []}
                academicYears={AcademicYears ?? []}
                formType="update"
                initialData={getStudentRes.data}
            />
        </div>
    );
};

export default EditStudentPage;
