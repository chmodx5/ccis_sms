import { z } from "zod";

export const studentYearLevelFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .max(160, {
            message: "Name must not be longer than 30 characters.",
        }),
});
