import { ImageContainer } from "@/components/image-container";
import { Button } from "@/components/ui";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getStudent } from "@/lib/actions/student/get-student";
import { format } from "date-fns";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DeleteStudentModal } from "./_components/delete-student-modal";

const ViewSingleStudentPage = async ({
    params,
}: {
    params: Promise<{ studentId: string }>;
}) => {
    const { studentId } = await params;
    const studentResult = await getStudent(studentId);

    if (!studentResult.success) {
        return <div>Student not found</div>;
    }

    const student = studentResult.data;

    const InfoItem = ({
        label,
        value,
    }: {
        label: string;
        value: string | number | boolean | null | undefined;
    }) => (
        <div className="flex space-x-2 py-1">
            <span className="text-muted-foreground">{label}:</span>
            <span className="font-medium">{value ?? "-"}</span>
        </div>
    );

    const formatDate = (dateStr: string | Date) =>
        format(new Date(dateStr), "d MMMM yyyy");

    return (
        <div className="space-y-6 p-4">
            {/* Basic Info */}
            <div className="flex flex-col md:flex-row gap-6">
                <Card className="w-full md:w-64">
                    <ImageContainer
                        src={student.studentPhoto ?? "/logo.png"}
                        alt="Student Photo"
                        aspectRatio="1/1"
                    />
                </Card>
                <Card className="flex-1">
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle className="text-xl">
                                {student.firstName} {student.middleName}{" "}
                                {student.surname}
                            </CardTitle>
                            <div className="flex space-x-2 ">
                                <DeleteStudentModal
                                    studentId={student.id}
                                    registrationNo={student.registrationNo}
                                />

                                <Link href={`/students/edit/${student.id}`}>
                                    <Button size={"icon"}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <CardDescription>
                            {student.registrationNo} - {student.class.name}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoItem label="Gender" value={student.gender} />
                        <InfoItem
                            label="Nationality"
                            value={student.nationality}
                        />
                        <InfoItem
                            label="Date of Birth"
                            value={formatDate(student.dateOfBirth)}
                        />
                        <InfoItem
                            label="Date of Admission"
                            value={formatDate(student.dateOfAdmission)}
                        />
                        <InfoItem label="Religion" value={student.religion} />
                        <InfoItem
                            label="Blood Type"
                            value={student.bloodType}
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Guardians */}
            <Card>
                <CardHeader>
                    <CardTitle>Guardians</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {student.guardians.map((g) => (
                        <div key={g.id} className="border p-2 rounded-md">
                            <InfoItem label="Full Name" value={g.fullName} />
                            <InfoItem
                                label="Relationship"
                                value={g.relationship}
                            />
                            <InfoItem label="Phone" value={g.contactPhone} />
                            <InfoItem label="Email" value={g.emailAddress} />
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
                <CardHeader>
                    <CardTitle>Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {student.emergencyContacts.map((ec) => (
                        <div key={ec.id} className="border p-2 rounded-md">
                            <InfoItem label="Full Name" value={ec.fullNames} />
                            <InfoItem
                                label="Relationship"
                                value={ec.relationship}
                            />
                            <InfoItem label="Phone" value={ec.contactPhone} />
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Doctors */}
            <Card>
                <CardHeader>
                    <CardTitle>Doctors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {student.doctors.map((doc) => (
                        <div key={doc.id} className="border p-2 rounded-md">
                            <InfoItem label="Full Name" value={doc.fullNames} />
                            <InfoItem label="Phone" value={doc.contactPhone} />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default ViewSingleStudentPage;
