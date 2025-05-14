import { z } from "zod";
import {
    bloodGroupsSchema,
    dateSchema,
    genderSchema,
    imageFileSchema,
    phoneNumberSchema,
    religionsSchema,
    scannedDocumentSchema,
} from ".";
import { GuardianRelationship, PreferredContact } from "@prisma/client";

export const guardianInformationSchema = z.object({
    // guardian information
    relationship: z.nativeEnum(GuardianRelationship),
    fullName: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    occupation: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    residentialAddress: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    contactPhone: phoneNumberSchema,
    whatsappNumber: phoneNumberSchema,
    emailAddress: z.string().email().optional(),
    preferredContact: z.nativeEnum(PreferredContact),
});

export const emergencyContactInformationSchema = z.object({
    // emergency contact information
    fullNames: z
        .string()
        .min(1, "Required")
        .max(200, "Cant exceed 200 characters"),
    relationship: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    contactPhone: phoneNumberSchema,
    whatsappNumber: phoneNumberSchema,
});

export const StudentFormSchema = z.object({
    // academic information
    academicYear: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    dateOfAdmission: dateSchema,
    class: z.string().min(1, "Required").max(100, "Cant exceed 100 characters"),
    registrationNo: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),

    // personal information
    firstName: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    middleName: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    surname: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    preferredName: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    nationality: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    dateOfBirth: dateSchema,
    gender: genderSchema.optional(),
    religion: religionsSchema,

    // parent or guardian information
    guardians: z
        .array(guardianInformationSchema)
        .min(1, "At least one guardian is required"),

    // documents
    studentPhoto: imageFileSchema,
    // birth cerfiticate
    birthCertificatNo: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    birthCertificateFile: scannedDocumentSchema,
    // passport
    passportNo: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    expiryDate: dateSchema,
    passportFile: scannedDocumentSchema,
    //student pass
    studentPassNo: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    dateOfExpiry: dateSchema,
    studentPassFile: scannedDocumentSchema,

    //former school:
    nameOfSchool: z
        .string()
        .min(1, "Required")
        .max(200, "Cant exceed 200 characters"),
    location: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    reasonForExit: z
        .string()
        .min(1, "Required")
        .max(400, "Cant exceed 400 characters"),
    recentReportFile: scannedDocumentSchema,

    // general information
    bloodType: bloodGroupsSchema,
    whoLivesWithStudentAtHome: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    primaryLanguageAtHome: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    otherChildrenAtCCIS: z.boolean().optional(),
    referredByCurrentFamily: z.boolean().optional(),
    permissionForSocialMediaPhotos: z.boolean().optional(),
    specialInformation: z
        .string()
        .min(1, "Required")
        .max(400, "Cant exceed 400 characters"),
    medicalConditions: z
        .string()
        .min(1, "Required")
        .max(400, "Cant exceed 400 characters"),
    feesContribution: z.boolean().optional(),
    feesContributionPercentage: z
        .preprocess(
            (val) => Number(val),
            z.number().int().positive().max(100, "Cant exceed 100%")
        )
        .optional(),

    // emergency contacts
    emergencyContacts: z
        .array(emergencyContactInformationSchema)
        .min(1, "At least one emergency contact is required"),

    // doctor
    doctors: z.array(
        z.object({
            fullNames: z
                .string()
                .min(1, "Required")
                .max(200, "Cant exceed 200 characters"),
            contactPhone: phoneNumberSchema,
        })
    ),
});
