"use server";

import { StudentFormSchema } from "@/components/forms";
import { prisma } from "@/prisma";
import { Gender, Prisma, Student } from "@prisma/client";
import { z } from "zod";

interface UpdateStudentSuccessResult {
    success: true;
    data: Student;
}

interface UpdateStudentErrorResult {
    success: false;
    error: string;
}

export type UpdateStudentResult =
    | UpdateStudentSuccessResult
    | UpdateStudentErrorResult;

export async function updateStudent(
    id: string,
    formData: z.infer<typeof StudentFormSchema>
): Promise<UpdateStudentResult> {
    const parsed = StudentFormSchema.safeParse(formData);

    if (!parsed.success) {
        const errorMessage = parsed.error.errors
            .map((err) => err.message)
            .join(". ");
        return { success: false, error: `Validation failed: ${errorMessage}` };
    }

    try {
        const existingStudent = await prisma.student.findUnique({
            where: { id },
        });
        if (!existingStudent) {
            return { success: false, error: "Student not found" };
        }

        // Check registration number uniqueness if changed
        if (parsed.data.registrationNo !== existingStudent.registrationNo) {
            const conflict = await prisma.student.findUnique({
                where: { registrationNo: parsed.data.registrationNo },
            });
            if (conflict) {
                return {
                    success: false,
                    error: "Registration number already exists",
                };
            }
        }

        // Update student with relations
        const updatedStudent = await prisma.student.update({
            where: { id },
            data: {
                academicYearId: parsed.data.academicYear,
                classId: parsed.data.class,
                dateOfAdmission: parsed.data.dateOfAdmission,
                registrationNo: parsed.data.registrationNo,
                firstName: parsed.data.firstName,
                middleName: parsed.data.middleName,
                surname: parsed.data.surname,
                preferredName: parsed.data.preferredName,
                nationality: parsed.data.nationality,
                dateOfBirth: parsed.data.dateOfBirth,
                gender: parsed.data.gender as Gender,
                religion: parsed.data.religion,
                studentPhoto: parsed.data.studentPhoto as string,

                // Update relationships by replacing existing entries
                guardians: {
                    deleteMany: {},
                    create: parsed.data.guardians,
                },
                emergencyContacts: {
                    deleteMany: {},
                    create: parsed.data.emergencyContacts,
                },
                doctors: {
                    deleteMany: {},
                    create: parsed.data.doctors,
                },

                // Documents
                birthCertificatNo: parsed.data.birthCertificatNo,
                birthCertificateFile:
                    (parsed.data?.birthCertificateFile as string) ?? "",
                passportNo: parsed.data.passportNo,
                expiryDate: parsed.data.expiryDate,
                passportFile: (parsed.data?.passportFile as string) ?? "",
                studentPassNo: parsed.data.studentPassNo,
                dateOfExpiry: parsed.data.dateOfExpiry,
                studentPassFile: (parsed.data?.studentPassFile as string) ?? "",

                // Former school
                nameOfSchool: parsed.data.nameOfSchool,
                location: parsed.data.location,
                reasonForExit: parsed.data.reasonForExit,
                recentReportFile:
                    (parsed.data?.recentReportFile as string) ?? "",

                // General info
                bloodType: parsed.data.bloodType,
                whoLivesWithStudentAtHome:
                    parsed.data.whoLivesWithStudentAtHome,
                primaryLanguageAtHome: parsed.data.primaryLanguageAtHome,
                otherChildrenAtCCIS: parsed.data.otherChildrenAtCCIS,
                referredByCurrentFamily: parsed.data.referredByCurrentFamily,
                permissionForSocialMediaPhotos:
                    parsed.data.permissionForSocialMediaPhotos,
                specialInformation: parsed.data.specialInformation,
                medicalConditions: parsed.data.medicalConditions,
                feesContribution: parsed.data.feesContribution,
                feesContributionPercentage:
                    parsed.data.feesContributionPercentage ?? 0,
            },
        });

        return {
            success: true,
            data: updatedStudent,
        };
    } catch (error) {
        console.error("Failed to fetch student:", error);
        return {
            success: false,
            error: "Unable to fetch student",
        };
    }
}
