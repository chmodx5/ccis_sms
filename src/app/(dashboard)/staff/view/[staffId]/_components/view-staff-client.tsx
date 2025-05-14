import { DeleteEntityModal } from "@/components/delete-entity-modal";
import { ImageContainer } from "@/components/image-container";
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui";
import { deleteStaff } from "@/lib/actions/staff/delete-staff";
import { GetStaffResultData } from "@/lib/actions/staff/get-staff";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";

const ViewStaffClient = ({ staff }: { staff: GetStaffResultData }) => {
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
                <div className="w-full md:w-64">
                    <Card className="w-full md:w-64">
                        <ImageContainer
                            src={staff.resumeURL || "/logo.png"}
                            alt="Staff Photo"
                            aspectRatio="1/1"
                            objectFit="contain"
                        />
                    </Card>
                </div>
                <Card className="flex-1">
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle className="text-xl">
                                {staff.firstName} {staff.middleName}{" "}
                                {staff.surname}
                            </CardTitle>
                            <div className="flex space-x-2">
                                <DeleteEntityModal
                                    entityId={staff.id}
                                    entityLabel="teacher"
                                    confirmValue={staff.staffId}
                                    onDelete={deleteStaff}
                                    redirectTo="/staff/view/list"
                                />
                                {/* You can create a DeleteStaffModal if needed */}
                                <Link href={`/staff/edit/${staff.id}`}>
                                    <Button size={"icon"}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <CardDescription>
                            {staff.staffId} - {staff.designation.name}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoItem label="Gender" value={staff.gender} />
                        <InfoItem
                            label="Nationality"
                            value={staff.nationality}
                        />
                        <InfoItem
                            label="Date of Birth"
                            value={formatDate(staff.dateOfBirth)}
                        />
                        <InfoItem
                            label="Date of Employment"
                            value={formatDate(staff.dateOfEmployment)}
                        />
                        <InfoItem
                            label="Qualification"
                            value={staff.highestQualification}
                        />
                        <InfoItem
                            label="Years of Experience"
                            value={staff.yearsOfWorkExperience}
                        />
                        <InfoItem
                            label="Years at CCIS"
                            value={staff.noOfYearsAtCCIS}
                        />
                        <InfoItem label="Staff Type" value={staff.staffType} />
                        <InfoItem label="Comment" value={staff.comment} />
                    </CardContent>
                </Card>
            </div>

            {/* Emergency Contacts */}
            {staff.emergencyContacts.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Emergency Contacts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {staff.emergencyContacts.map((ec) => (
                            <div key={ec.id} className="border p-2 rounded-md">
                                <InfoItem
                                    label="Full Name"
                                    value={ec.fullNames}
                                />
                                <InfoItem
                                    label="Relationship"
                                    value={ec.relationship}
                                />
                                <InfoItem
                                    label="Phone"
                                    value={ec.contactPhone}
                                />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Profile Details Based on Type */}
            {staff.residentTeachingStaffProfile && (
                <Card>
                    <CardHeader>
                        <CardTitle>Resident Teaching Staff Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoItem
                            label="National ID"
                            value={
                                staff.residentTeachingStaffProfile.nationalIdNo
                            }
                        />
                        <InfoItem
                            label="NSSF No"
                            value={staff.residentTeachingStaffProfile.nssfNo}
                        />
                        <InfoItem
                            label="TIN No"
                            value={staff.residentTeachingStaffProfile.tinNo}
                        />
                        <InfoItem
                            label="Teaching License"
                            value={
                                staff.residentTeachingStaffProfile
                                    .teachingLicenseNo
                            }
                        />
                    </CardContent>
                </Card>
            )}

            {staff.residentNonTeachingStaffProfile && (
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Resident Non-Teaching Staff Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoItem
                            label="National ID"
                            value={
                                staff.residentNonTeachingStaffProfile
                                    .nationalIdNo
                            }
                        />
                        <InfoItem
                            label="NSSF No"
                            value={staff.residentNonTeachingStaffProfile.nssfNo}
                        />
                        <InfoItem
                            label="TIN No"
                            value={staff.residentNonTeachingStaffProfile.tinNo}
                        />
                    </CardContent>
                </Card>
            )}

            {staff.internationalTeachingStaffProfile && (
                <Card>
                    <CardHeader>
                        <CardTitle>
                            International Teaching Staff Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoItem
                            label="TCU No"
                            value={
                                staff.internationalTeachingStaffProfile.tcuNo
                            }
                        />
                        <InfoItem
                            label="Teaching License No"
                            value={
                                staff.internationalTeachingStaffProfile
                                    .teachingLicenseNo
                            }
                        />
                        <InfoItem
                            label="Work Permit No"
                            value={
                                staff.internationalTeachingStaffProfile
                                    .workPermitNo
                            }
                        />
                        <InfoItem
                            label="Resident Permit No"
                            value={
                                staff.internationalTeachingStaffProfile
                                    .residentPermitNo
                            }
                        />
                        <InfoItem
                            label="Passport No"
                            value={
                                staff.internationalTeachingStaffProfile
                                    .passportNo
                            }
                        />
                    </CardContent>
                </Card>
            )}

            {staff.InternationalNonTeachingStaffProfile && (
                <Card>
                    <CardHeader>
                        <CardTitle>
                            International Non-Teaching Staff Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoItem
                            label="Work Permit No"
                            value={
                                staff.InternationalNonTeachingStaffProfile
                                    .workPermitNo
                            }
                        />
                        <InfoItem
                            label="Resident Permit No"
                            value={
                                staff.InternationalNonTeachingStaffProfile
                                    .residentPermitNo
                            }
                        />
                        <InfoItem
                            label="Passport No"
                            value={
                                staff.InternationalNonTeachingStaffProfile
                                    .passportNo
                            }
                        />
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default ViewStaffClient;
