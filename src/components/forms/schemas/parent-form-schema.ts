import { z } from "zod";
import { PreferredContact } from "@prisma/client";

export const parentFormSchema = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    occupation: z.string().min(2, "Occupation must be at least 2 characters"),
    residentialAddress: z
        .string()
        .min(5, "Residential address must be at least 5 characters"),
    contactPhone: z.string().min(10, "Contact phone must be valid"),
    whatsAppNo: z.string().optional(),
    email: z.string().email("Invalid email format"),
    preferredContact: z.nativeEnum(PreferredContact),
    bioPageURL: z.string().url("Invalid URL").optional(),
});
