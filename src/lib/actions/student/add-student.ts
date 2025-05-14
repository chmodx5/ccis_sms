"use server";

import { z } from "zod";
import { prisma } from "@/prisma";
import { StudentFormSchema } from "@/components/forms";
import { Gender } from "@prisma/client";

const validationSchema = StudentFormSchema.extend({
    studentPhoto: z.string().min(1, "Photo url is required"),
    birthCertificateFile: z.string().min(1, "File url is required"),
    passportFile: z.string().optional(),
    studentPassFile: z.string().optional(),
    recentReportFile: z.string().optional(),
});

export async function addStudent(formData: z.infer<typeof validationSchema>) {
    const parsed = validationSchema.safeParse(formData);

    if (!parsed.success) {
        return {
            success: false,
            data: null,
            error: parsed.error.flatten(),
        };
    }

    try {
        // check if a student with the same registration number already exists
        const existingStudent = await prisma.student.findUnique({
            where: {
                registrationNo: parsed.data.registrationNo,
            },
        });

        if (existingStudent) {
            return {
                success: false,
                data: null,
                error: "Student with this registration number already exists",
            };
        }

        const student = await prisma.student.create({
            data: {
                academicYearId: parsed.data.academicYear, // assuming it's an ID from a dropdown
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
                studentPhoto: parsed.data.studentPhoto,

                guardians: {
                    create: parsed.data.guardians,
                },

                emergencyContacts: {
                    create: parsed.data.emergencyContacts,
                },

                doctors: {
                    create: parsed.data.doctors,
                },

                // documents
                birthCertificatNo: parsed.data.birthCertificatNo,
                birthCertificateFile: parsed.data.birthCertificateFile,
                passportNo: parsed.data.passportNo,
                expiryDate: parsed.data.expiryDate,
                passportFile: parsed.data.passportFile,
                studentPassNo: parsed.data.studentPassNo,
                dateOfExpiry: parsed.data.dateOfExpiry,
                studentPassFile: parsed.data.studentPassFile,

                // former school
                nameOfSchool: parsed.data.nameOfSchool,
                location: parsed.data.location,
                reasonForExit: parsed.data.reasonForExit,
                recentReportFile: parsed.data.recentReportFile,

                // general info
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

        console.log(student);
        return {
            success: true,
            data: student,
            error: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            error:
                error instanceof Error ? error.message : "Something went wrong",
        };
    }
}
