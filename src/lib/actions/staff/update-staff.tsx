"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Gender, StaffType } from "@prisma/client"; // adjust this to your enums if needed
import { staffFormSchema } from "@/components/forms/schemas/staff-form-schema";
import { prisma } from "@/prisma";

export async function updateStaff(
    staffRecordId: string, // The unique database ID of the staff record to update
    rawData: z.infer<typeof staffFormSchema>
) {
    const parsed = staffFormSchema.safeParse(rawData);

    if (!parsed.success) {
        return {
            success: false,
            parsed: null,
            error: parsed.error.flatten(),
        };
    }
    // data is the successfully parsed data, which is a discriminated union
    const data = parsed.data;

    try {
        // 1. Fetch the existing staff record
        const existingStaff = await prisma.staff.findUnique({
            where: {
                id: staffRecordId,
            },
        });

        if (!existingStaff) {
            return {
                success: false,
                error: "Staff member not found.",
            };
        }

        // 2. If staffId (business ID) is being changed, check for uniqueness
        if (data.staffId && data.staffId !== existingStaff.staffId) {
            const checkStaffId = await prisma.staff.findUnique({
                where: {
                    staffId: data.staffId,
                },
            });

            if (checkStaffId) {
                return {
                    success: false,
                    error: "A staff member with that new staff ID already exists.",
                };
            }
        }

        // 3. Update general staff data
        const updatedStaff = await prisma.staff.update({
            where: {
                id: staffRecordId,
            },
            data: {
                // Common properties accessible directly from 'data'
                staffType: data.staffType, // No 'as StaffType' needed if schema aligns with Prisma enum
                staffId: data.staffId,
                firstName: data.firstName,
                middleName: data.middleName,
                surname: data.surname,
                gender: data.gender as Gender, // Assuming Gender in schema aligns with Prisma Gender
                dateOfBirth: data.dateOfBirth,
                nationality: data.nationality,
                designationId: data.designation,
                dateOfEmployment: data.dateOfEmployment,
                highestQualification: data.highestQualification,
                yearsOfWorkExperience: data.yearsOfWorkExperience,
                noOfYearsAtCCIS: data.noOfYearsAtCCIS,
                resumeURL: data.resumeURL as string, // Assuming schema types this as string | undefined
                comment: data.comment,
            },
        });

        // 4. Handle staff type-specific data
        const oldStaffType = existingStaff.staffType;
        // The new staff type is directly from data.staffType
        // const newStaffType = data.staffType; // Not strictly needed as a separate variable if using data.staffType in conditions

        // Helper function to delete old profile
        const deleteOldProfile = async (type: StaffType, staffDbId: string) => {
            try {
                if (type === StaffType.resident_teaching_staff) {
                    // Use Enum members for comparison
                    await prisma.residentTeachingStaffProfile.delete({
                        where: { staffId: staffDbId },
                    });
                } else if (type === StaffType.resident_non_teaching_staff) {
                    await prisma.residentNonTeachingStaffProfile.delete({
                        where: { staffId: staffDbId },
                    });
                } else if (type === StaffType.international_teaching_staff) {
                    await prisma.internationalTeachingStaffProfile.delete({
                        where: { staffId: staffDbId },
                    });
                } else if (
                    type === StaffType.international_non_teaching_staff
                ) {
                    await prisma.internationalNonTeachingStaffProfile.delete({
                        where: { staffId: staffDbId },
                    });
                }
            } catch (error) {
                console.warn(
                    `Could not delete old profile of type ${type} for staff ID ${staffDbId}. It might not have existed:`,
                    error instanceof Error ? error.message : error
                );
            }
        };

        let profileUpdateResult;

        if (oldStaffType !== data.staffType) {
            // Staff type changed: Delete old profile and create new one
            await deleteOldProfile(oldStaffType, updatedStaff.id);

            // Create new profile based on data.staffType
            // TypeScript will narrow 'data' within these blocks due to the check on 'data.staffType'
            if (data.staffType === StaffType.resident_teaching_staff) {
                profileUpdateResult =
                    await prisma.residentTeachingStaffProfile.create({
                        data: {
                            staffId: updatedStaff.id,
                            nationalIdNo: data.nationalIdNo,
                            nationalIdAttachment:
                                data.nationalIdAttachment as string,
                            nssfNo: data.nssfNo,
                            nssfAttachment: data.nssfAttachment as string, // Corrected from potential typo
                            tinNo: data.tinNo,
                            tinAttachment: data.tinAttachment as string,
                            teachingLicenseNo: data.teachingLicenseNo,
                            teachingLicenseAttachment:
                                data.teachingLicenseAttachment as string,
                        },
                    });
            } else if (
                data.staffType === StaffType.resident_non_teaching_staff
            ) {
                profileUpdateResult =
                    await prisma.residentNonTeachingStaffProfile.create({
                        data: {
                            staffId: updatedStaff.id,
                            nationalIdNo: data.nationalIdNo,
                            nationalIdAttachment:
                                data.nationalIdAttachment as string,
                            nssfNo: data.nssfNo,
                            nssfAttachment: data.nssfAttachment as string,
                            tinNo: data.tinNo,
                            tinAttachment: data.tinAttachment as string,
                        },
                    });
            } else if (
                data.staffType === StaffType.international_teaching_staff
            ) {
                profileUpdateResult =
                    await prisma.internationalTeachingStaffProfile.create({
                        data: {
                            staffId: updatedStaff.id,
                            tcuNo: data.tcuNo,
                            tcuAttachment: data.tcuAttachment as string,
                            teachingLicenseNo: data.teachingLicenseNo,
                            expirationDate: data.expirationDate,
                            teachingLicenseAttachment:
                                data.teachingLicenseAttachment as string,
                            workPermitNo: data.workPermitNo,
                            workPermitExpirationDate:
                                data.workPermitExpirationDate,
                            workPermitAttachment:
                                data.workPermitAttachment as string,
                            residentPermitNo: data.residentPermitNo,
                            residentPermitExpirationDate:
                                data.residentPermitExpirationDate,
                            residentPermitAttachment:
                                data.residentPermitAttachment as string,
                            passportNo: data.passportNo,
                            passportExpirationDate: data.passportExpirationDate,
                            passportAttachment:
                                data.passportAttachment as string,
                        },
                    });
            } else if (
                data.staffType === StaffType.international_non_teaching_staff
            ) {
                profileUpdateResult =
                    await prisma.internationalNonTeachingStaffProfile.create({
                        data: {
                            staffId: updatedStaff.id,
                            workPermitNo: data.workPermitNo,
                            workPermitExpirationDate:
                                data.workPermitExpirationDate,
                            workPermitAttachment:
                                data.workPermitAttachment as string,
                            residentPermitNo: data.residentPermitNo,
                            residentPermitExpirationDate:
                                data.residentPermitExpirationDate,
                            residentPermitAttachment:
                                data.residentPermitAttachment as string,
                            passportNo: data.passportNo,
                            passportExpirationDate: data.passportExpirationDate,
                            passportAttachment:
                                data.passportAttachment as string,
                        },
                    });
            }
        } else {
            // Staff type is the same: Update existing profile
            // TypeScript will narrow 'data' within these blocks
            if (data.staffType === StaffType.resident_teaching_staff) {
                profileUpdateResult =
                    await prisma.residentTeachingStaffProfile.update({
                        where: { staffId: updatedStaff.id },
                        data: {
                            // Only include fields relevant to this staff type
                            nationalIdNo: data.nationalIdNo,
                            nationalIdAttachment:
                                data.nationalIdAttachment as string,
                            nssfNo: data.nssfNo,
                            nssfAttachment: data.nssfAttachment as string, // Corrected
                            tinNo: data.tinNo,
                            tinAttachment: data.tinAttachment as string,
                            teachingLicenseNo: data.teachingLicenseNo,
                            teachingLicenseAttachment:
                                data.teachingLicenseAttachment as string,
                        },
                    });
            } else if (
                data.staffType === StaffType.resident_non_teaching_staff
            ) {
                profileUpdateResult =
                    await prisma.residentNonTeachingStaffProfile.update({
                        where: { staffId: updatedStaff.id },
                        data: {
                            nationalIdNo: data.nationalIdNo,
                            nationalIdAttachment:
                                data.nationalIdAttachment as string,
                            nssfNo: data.nssfNo,
                            nssfAttachment: data.nssfAttachment as string,
                            tinNo: data.tinNo,
                            tinAttachment: data.tinAttachment as string,
                        },
                    });
            } else if (
                data.staffType === StaffType.international_teaching_staff
            ) {
                profileUpdateResult =
                    await prisma.internationalTeachingStaffProfile.update({
                        where: { staffId: updatedStaff.id },
                        data: {
                            tcuNo: data.tcuNo,
                            tcuAttachment: data.tcuAttachment as string,
                            teachingLicenseNo: data.teachingLicenseNo,
                            expirationDate: data.expirationDate,
                            teachingLicenseAttachment:
                                data.teachingLicenseAttachment as string,
                            workPermitNo: data.workPermitNo,
                            workPermitExpirationDate:
                                data.workPermitExpirationDate,
                            workPermitAttachment:
                                data.workPermitAttachment as string,
                            residentPermitNo: data.residentPermitNo,
                            residentPermitExpirationDate:
                                data.residentPermitExpirationDate,
                            residentPermitAttachment:
                                data.residentPermitAttachment as string,
                            passportNo: data.passportNo,
                            passportExpirationDate: data.passportExpirationDate,
                            passportAttachment:
                                data.passportAttachment as string,
                        },
                    });
            } else if (
                data.staffType === StaffType.international_non_teaching_staff
            ) {
                profileUpdateResult =
                    await prisma.internationalNonTeachingStaffProfile.update({
                        where: { staffId: updatedStaff.id },
                        data: {
                            workPermitNo: data.workPermitNo,
                            workPermitExpirationDate:
                                data.workPermitExpirationDate,
                            workPermitAttachment:
                                data.workPermitAttachment as string,
                            residentPermitNo: data.residentPermitNo,
                            residentPermitExpirationDate:
                                data.residentPermitExpirationDate,
                            residentPermitAttachment:
                                data.residentPermitAttachment as string,
                            passportNo: data.passportNo,
                            passportExpirationDate: data.passportExpirationDate,
                            passportAttachment:
                                data.passportAttachment as string,
                        },
                    });
            }
        }

        // Consider if a profile update was expected but didn't happen (e.g., an unhandled staffType)
        // This check might need refinement based on whether all staff types must have a profile.
        // If a StaffType exists that doesn't have a specific profile table, this check needs adjustment.
        const staffTypesWithProfiles = [
            StaffType.resident_teaching_staff,
            StaffType.resident_non_teaching_staff,
            StaffType.international_teaching_staff,
            StaffType.international_non_teaching_staff,
        ];
        if (
            staffTypesWithProfiles.includes(data.staffType) &&
            !profileUpdateResult
        ) {
            // This indicates an issue if a profile operation was expected but didn't complete.
            // It could happen if a profile record didn't exist for an update and upsert isn't used,
            // or if a new staffType was added and not handled in the conditionals.
            console.warn(
                `Profile update/creation might have been expected for staff type ${data.staffType} but did not seem to occur.`
            );
            // Depending on strictness, you might return an error here.
            // For now, we'll assume the logic above correctly handles existing cases.
        }

        revalidatePath("/admin/staff"); // Adjust this path
        revalidatePath(`/admin/staff/${staffRecordId}`); // Adjust this path

        return { success: true, data: updatedStaff };
    } catch (error) {
        // console.error("Update Staff Error:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Something went wrong during staff update.",
        };
    }
}
