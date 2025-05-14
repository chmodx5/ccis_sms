import {
    ACCEPTED_FILE_TYPES,
    ACCEPTED_IMAGE_TYPES,
    BLOOD_GROUPS,
    GENDERS,
    MAX_FILE_SIZE_MB,
    MAX_IMAGE_SIZE_MB,
    RELIGIONS,
} from "@/site-config";
import { Gender } from "@prisma/client";
import { z } from "zod";

export * from "./parent-form-schema";
export * from "./student-class-form-schema";
export * from "./student-form-schema";
export * from "./student-year-level-schema";

// export const genderSchema = z.nativeEnum(Gender);
export const genderSchema = z.string();
// export const religionsSchema = z.enum(RELIGIONS);
export const religionsSchema = z.string();
// export const bloodGroupsSchema = z.enum(BLOOD_GROUPS);
export const bloodGroupsSchema = z.string();
export const phoneNumberSchema = z
    .string()
    .trim()
    .regex(
        /^(\+?\d{1,4}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?[\d\s-]{6,}$/,
        "Invalid phone number format"
    );
export const dateSchema = z.date({
    required_error: "A date of birth is required.",
});
// .union([z.string(), z.date()]);
// .transform((val) => (typeof val === "string" ? new Date(val) : val))
// .refine((date) => !isNaN(date.getTime()), {
//     message: "Invalid date",
// });
export const futureDateSchema = dateSchema.refine((date) => date > new Date(), {
    message: "Date must be in the future",
});
export const pastDateSchema = dateSchema.refine((date) => date < new Date(), {
    message: "Date must be in the past",
});
export const imageFileSchema = z.union([
    z
        .instanceof(File)
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: "Unsupported image format",
        })
        .refine((file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024, {
            message: `Image must be less than ${MAX_IMAGE_SIZE_MB}MB`,
        }),
    z.string().optional(),
]);
export const scannedDocumentSchema = z.union([
    z
        .instanceof(File)
        .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
            message: "Unsupported file format",
        })
        .refine((file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024, {
            message: `File must be less than ${MAX_FILE_SIZE_MB}MB`,
        }),
    z.string().optional(),
    z.null(),
]);
