import { z } from "zod";
import {
    dateSchema,
    genderSchema,
    scannedDocumentSchema,
    phoneNumberSchema,
} from ".";

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

// teaching staff
// resident teaching staff
export const residentTeachingStaffSchema = z.object({
    staffType: z.literal("resident_teaching_staff"),
    // resident teaching staff
    // national id
    nationalIdNo: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    nationalIdAttachment: scannedDocumentSchema,

    // nssf
    nssfNo: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    nssfAttachment: scannedDocumentSchema,

    // tin
    tinNo: z.string().min(1, "Required").max(100, "Cant exceed 100 characters"),
    tinAttachment: scannedDocumentSchema,

    // teaching license no
    teachingLicenseNo: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    teachingLicenseAttachment: scannedDocumentSchema,
});
// international teaching staff
export const internationalTeachingStaffSchema = z.object({
    staffType: z.literal("international_teaching_staff"),
    // international teaching staff
    // tcu
    tcuNo: z.string().min(1, "Required").max(100, "Cant exceed 100 characters"),
    tcuAttachment: scannedDocumentSchema,

    // teaching license
    teachingLicenseNo: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    expirationDate: dateSchema,
    teachingLicenseAttachment: scannedDocumentSchema,

    // work permit
    workPermitNo: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    workPermitExpirationDate: dateSchema,
    workPermitAttachment: scannedDocumentSchema,

    // resident permit
    residentPermitNo: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    residentPermitExpirationDate: dateSchema,
    residentPermitAttachment: scannedDocumentSchema,

    //passport
    passportNo: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    passportExpirationDate: dateSchema,
    passportAttachment: scannedDocumentSchema,
});

// non teaching staff
// resident non teaching staff
export const residentNonTeachingStaffSchema = z.object({
    staffType: z.literal("resident_non_teaching_staff"),
    // resident teaching staff
    // national id
    nationalIdNo: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    nationalIdAttachment: scannedDocumentSchema,

    // nssf
    nssfNo: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    nssfAttachment: scannedDocumentSchema,

    // tin
    tinNo: z.string().min(1, "Required").max(100, "Cant exceed 100 characters"),
    tinAttachment: scannedDocumentSchema,
});
// international non teaching staff
export const internationalNonTeachingStaffSchema = z.object({
    staffType: z.literal("international_non_teaching_staff"),

    // work permit
    workPermitNo: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    workPermitExpirationDate: dateSchema,
    workPermitAttachment: scannedDocumentSchema,

    // resident permit
    residentPermitNo: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    residentPermitExpirationDate: dateSchema,
    residentPermitAttachment: scannedDocumentSchema,

    //passport
    passportNo: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    passportExpirationDate: dateSchema,
    passportAttachment: scannedDocumentSchema,
});

export const baseStaffFormSchema = z.object({
    staffId: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
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
    gender: genderSchema,
    dateOfBirth: dateSchema,
    nationality: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    designation: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    dateOfEmployment: dateSchema,
    // qualification
    highestQualification: z
        .string()
        .min(1, "Required")
        .max(100, "Cant exceed 100 characters"),
    yearsOfWorkExperience: z
        .number()
        .min(0, "Required")
        .max(50, "Max 50 years"),
    noOfYearsAtCCIS: z.number().min(0, "Required").max(50, "Max 50 years"),
    resumeURL: scannedDocumentSchema,

    // emergency contacts
    emergencyContacts: z
        .array(emergencyContactInformationSchema)
        .min(1, "At least one emergency contact is required"),
    comment: z.string().min(1, "Required"),
});

export const staffFormSchema = z.discriminatedUnion("staffType", [
    residentTeachingStaffSchema.merge(baseStaffFormSchema),
    residentNonTeachingStaffSchema.merge(baseStaffFormSchema),
    internationalNonTeachingStaffSchema.merge(baseStaffFormSchema),
    internationalTeachingStaffSchema.merge(baseStaffFormSchema),
]);

// export const residentStaffSchema = z.object({
//     staffType: z.literal("resident"),
//     // resident teaching staff
//     // national id
//     residentNationalIdNo: z
//         .string()
//         .min(1, "Required")
//         .max(100, "Cant exceed 100 characters"),
//     residentNationalIdAttachment: scannedDocumentSchema,
//     // nssf
//     residentNssfNo: z
//         .string()
//         .min(1, "Required")
//         .max(100, "Cant exceed 100 characters"),
//     residentNssfAttachment: scannedDocumentSchema,
//     // tin
//     residentTinNo: z
//         .string()
//         .min(1, "Required")
//         .max(100, "Cant exceed 100 characters"),
//     residentTinAttachment: scannedDocumentSchema,
//     // teaching license no
//     residentTeachingLicenseNo: z
//         .string()
//         .min(1, "Required")
//         .max(100, "Cant exceed 100 characters"),
//     residentTeachingLicenseAttachment: scannedDocumentSchema,
// });
// export const internationalStaffSchema = z.object({
//     staffType: z.literal("international"),
//     // international teaching staff
//     // tcu
//     internationalTcuNo: z
//         .string()
//         .min(1, "Required")
//         .max(100, "Cant exceed 100 characters"),
//     internationalTcuAttachment: scannedDocumentSchema,
//     // teaching license
//     internationalTeachingLicenseNo: z
//         .string()
//         .min(1, "Required")
//         .max(100, "Cant exceed 100 characters"),
//     internationalExpirationDate: dateSchema,
//     internationalTeachingLicenseAttachment: scannedDocumentSchema,
//     // work permit
//     internationalWorkPermitNo: z
//         .string()
//         .min(1, "Required")
//         .max(100, "Cant exceed 100 characters"),
//     internationalWorkPermitExpirationDate: dateSchema,
//     internationalWorkPermitAttachment: scannedDocumentSchema,
//     // resident permit
//     internationalResidentPermitNo: z
//         .string()
//         .min(1, "Required")
//         .max(100, "Cant exceed 100 characters"),
//     internationalResidentPermitExpirationDate: dateSchema,
//     internationalResidentPermitAttachment: scannedDocumentSchema,
//     //passport
//     internationalPassportNo: z
//         .string()
//         .min(1, "Required")
//         .max(100, "Cant exceed 100 characters"),
//     internationalPassportExpirationDate: dateSchema,
//     internationalPassportAttachment: scannedDocumentSchema,
// });

// export const staffFormSchema = z.discriminatedUnion("staffType", [
//     residentStaffSchema.merge(baseStaffFormSchema),
//     internationalStaffSchema.merge(baseStaffFormSchema),
// ]);
