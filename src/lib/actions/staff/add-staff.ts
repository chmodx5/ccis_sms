"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Gender, StaffType } from "@prisma/client"; // adjust this to your enums if needed
import { staffFormSchema } from "@/components/forms/schemas/staff-form-schema";
import { prisma } from "@/prisma";

export async function addStaff(rawData: z.infer<typeof staffFormSchema>) {
    const parsed = staffFormSchema.safeParse(rawData);

    if (!parsed.success) {
        return {
            success: false,
            parsed: null,
            error: parsed.error.flatten(),
        };
    }
    const data = parsed.data;

    try {
        // check if that staff id exist
        const checkStaffId = await prisma.staff.findUnique({
            where: {
                staffId: data.staffId,
            },
        });

        console.log(checkStaffId);

        if (checkStaffId) {
            return {
                success: false,
                error: "A staff member with that staff id exists",
            };
        }

        // Insert general staff data
        const staff = await prisma.staff.create({
            data: {
                staffType: data.staffType as StaffType,
                staffId: data.staffId,
                firstName: data.firstName,
                middleName: data.middleName,
                surname: data.surname,
                gender: data.gender as Gender,
                dateOfBirth: data.dateOfBirth,
                nationality: data.nationality,
                designationId: data.designation,
                dateOfEmployment: data.dateOfEmployment,
                highestQualification: data.highestQualification,
                yearsOfWorkExperience: data.yearsOfWorkExperience,
                noOfYearsAtCCIS: data.noOfYearsAtCCIS,
                resumeURL: data.resumeURL as string,
                comment: data.comment,
            },
        });

        let res;
        if (data.staffType === "resident_teaching_staff") {
            res = await prisma.residentTeachingStaffProfile.create({
                data: {
                    staffId: staff.id,
                    nationalIdNo: data.nationalIdNo,
                    nationalIdAttachment: data.nationalIdAttachment as string,
                    nssfNo: data.nssfNo,
                    nssfAttachment: data.nationalIdAttachment as string,
                    tinNo: data.tinNo,
                    tinAttachment: data.tinAttachment as string,
                    teachingLicenseNo: data.teachingLicenseNo,
                    teachingLicenseAttachment:
                        data.teachingLicenseAttachment as string,
                },
            });
        } else if (data.staffType === "resident_non_teaching_staff") {
            res = await prisma.residentNonTeachingStaffProfile.create({
                data: {
                    staffId: staff.id,
                    nationalIdNo: data.nationalIdNo,
                    nationalIdAttachment: data.nationalIdAttachment as string,
                    nssfNo: data.nssfNo,
                    nssfAttachment: data.nssfAttachment as string,
                    tinNo: data.tinNo,
                    tinAttachment: data.tinAttachment as string,
                },
            });
        } else if (data.staffType === "international_teaching_staff") {
            res = await prisma.internationalTeachingStaffProfile.create({
                data: {
                    staffId: staff.id,
                    // TCU
                    tcuNo: data.tcuNo,
                    tcuAttachment: data.tcuAttachment as string,

                    // Teaching License
                    teachingLicenseNo: data.teachingLicenseNo,
                    expirationDate: data.expirationDate,
                    teachingLicenseAttachment:
                        data.teachingLicenseAttachment as string,

                    // Work Permit
                    workPermitNo: data.workPermitNo,
                    workPermitExpirationDate: data.workPermitExpirationDate,
                    workPermitAttachment: data.workPermitAttachment as string,

                    // Resident Permit
                    residentPermitNo: data.residentPermitNo,
                    residentPermitExpirationDate:
                        data.residentPermitExpirationDate,
                    residentPermitAttachment:
                        data.residentPermitAttachment as string,

                    // Passport
                    passportNo: data.passportNo,
                    passportExpirationDate: data.passportExpirationDate,
                    passportAttachment: data.passportAttachment as string,
                },
            });
        } else if (data.staffType === "international_non_teaching_staff") {
            res = await prisma.internationalNonTeachingStaffProfile.create({
                data: {
                    staffId: staff.id,
                    // Work Permit
                    workPermitNo: data.workPermitNo,
                    workPermitExpirationDate: data.workPermitExpirationDate,
                    workPermitAttachment: data.workPermitAttachment as string,

                    // Resident Permit
                    residentPermitNo: data.residentPermitNo,
                    residentPermitExpirationDate:
                        data.residentPermitExpirationDate,
                    residentPermitAttachment:
                        data.residentPermitAttachment as string,

                    // Passport
                    passportNo: data.passportNo,
                    passportExpirationDate: data.passportExpirationDate,
                    passportAttachment: data.passportAttachment as string,
                },
            });
        }

        if (!res) {
            return {
                success: false,
                error: "Internal server error",
            };
        }

        return { success: true };
    } catch (error) {
        // console.log(error);
        return {
            success: false,
            error:
                error instanceof Error ? error.message : "Something went wrong",
        };
    }
}
