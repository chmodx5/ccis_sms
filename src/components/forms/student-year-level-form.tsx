"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { studentYearLevelFormSchema } from "./schemas/student-year-level-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "../ui";
import { TextInput } from "../form/text-input";
import { updateYearLevel } from "@/actions/year-level/update-year-level";
import { YearLevel } from "@prisma/client";
import { toast } from "sonner";
import { createYearLevel } from "@/actions/year-level/create-year-level";

interface StudentYearLevelFormProps {
    onSubmit: (status: "error" | "success") => void;
    initialData?: YearLevel;
}

export const StudentYearLevelForm: React.FC<StudentYearLevelFormProps> = ({
    onSubmit,
    initialData,
}) => {
    const form = useForm<z.infer<typeof studentYearLevelFormSchema>>({
        resolver: zodResolver(studentYearLevelFormSchema),
        defaultValues: {
            name: initialData?.name || "",
        },
    });

    async function onFormSubmit(
        data: z.infer<typeof studentYearLevelFormSchema>
    ) {
        if (initialData) {
            // update
            const res = await updateYearLevel(initialData.id, {
                requestBody: {
                    name: data.name,
                },
            });

            if (res.status == "success") {
                onSubmit(res.status);
                toast("Year level updated successfully");
            } else {
                onSubmit(res.status);
                toast("Error updating year level", {
                    description: res.message,
                });
            }
        } else {
            // create
            const res = await createYearLevel(data);

            if (res.status == "success") {
                onSubmit(res.status);
                toast("Year level created successfully");
            } else {
                onSubmit(res.status);
                toast("Error creating year level", {
                    description: res.message,
                });
            }
        }
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onFormSubmit)}
                    className="space-y-6"
                >
                    <TextInput
                        control={form.control}
                        name="name"
                        label="Year Level Name"
                        placeholder="Enter name"
                        type="text"
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};
