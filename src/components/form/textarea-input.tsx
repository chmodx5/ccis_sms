"use client";

import React from "react";
import { Control, FieldPath, FieldValues, Controller } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui";
import { Textarea } from "../ui/textarea";

interface Props<TFieldValues extends FieldValues> {
    name: FieldPath<TFieldValues>;
    label: string;
    control: Control<TFieldValues>;
    placeholder?: string;
    formDescription?: string;
    disabled?: boolean;
    rows?: number;
}

export const TextareaInput = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    formDescription,
    disabled,
    rows,
    ...inputProps
}: Props<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder={placeholder}
                            className="resize-none"
                            disabled={disabled}
                            rows={rows}
                            {...field}
                            {...inputProps}
                        />
                    </FormControl>
                    {formDescription && (
                        <FormDescription>{formDescription}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
