import { z } from "zod";
export const studentClassFormSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Class name is required.",
        })
        .max(160, {
            message: "Name must not be longer than 30 characters.",
        }),
    yearLevelId: z.string().min(1, {
        message: "Year level is required.",
    }),
});
