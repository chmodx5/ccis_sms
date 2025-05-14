"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "../ui";
import { TextInput } from "../form/text-input";
import { SelectInput } from "../form/select-input"; // Import SelectInput
import { updateClass } from "@/actions/class/update-class"; // Import your actions
import { createClass } from "@/actions/class/create-class";
import { Class, YearLevel } from "@prisma/client"; // Import necessary types
import { toast } from "sonner";
import { studentClassFormSchema } from "./schemas";

interface StudentClassFormProps {
    onSubmit: (status: "error" | "success") => void;
    initialData?: Class & { yearLevel: YearLevel }; // Include YearLevel in initialData
    yearLevelOptions: { label: string; value: string }[]; // Options for the YearLevel select
}

export const StudentClassForm: React.FC<StudentClassFormProps> = ({
    onSubmit,
    initialData,
    yearLevelOptions,
}) => {
    const form = useForm<z.infer<typeof studentClassFormSchema>>({
        resolver: zodResolver(studentClassFormSchema),
        defaultValues: {
            name: initialData?.name || "",
            yearLevelId: initialData?.yearLevelId || "", // Important: Initialize yearLevelId
        },
    });

    async function onFormSubmit(data: z.infer<typeof studentClassFormSchema>) {
        if (initialData) {
            // Update
            const res = await updateClass({
                id: initialData.id,
                name: data.name,
                yearLevelId: data.yearLevelId
            }); // Pass the whole data object

            if (res.status === "success") {
                onSubmit(res.status);
                toast("Class updated successfully");
            } else {
                onSubmit(res.status);
                toast("Error updating class", { description: res.message });
            }
        } else {
            // Create
            const res = await createClass(data); // Pass the whole data object

            if (res.status === "success") {
                onSubmit(res.status);
                toast("Class created successfully");
            } else {
                onSubmit(res.status);
                toast("Error creating class", { description: res.message });
            }
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
                    <TextInput
                        control={form.control}
                        name="name"
                        label="Class Name"
                        placeholder="Enter name"
                        type="text"
                    />

                    <SelectInput
                        control={form.control}
                        name="yearLevelId" // Match the schema
                        label="Year Level"
                        placeholder="Select year level"
                        options={yearLevelOptions} // Use the passed options
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};