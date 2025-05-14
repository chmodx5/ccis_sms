import React from "react";
import { Control, FieldPath, FieldValues, Controller } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "../ui";
import { format } from "date-fns";

interface Props<TFieldValues extends FieldValues>
    extends React.InputHTMLAttributes<HTMLInputElement> {
    name: FieldPath<TFieldValues>;
    label: string;
    placeholder: string;
    formDescription?: string;
    control: Control<TFieldValues>;
}

export const DateInput = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    formDescription,
    ...inputProps
}: Props<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const formattedDate = field.value
                    ? format(new Date(field.value), "yyyy-MM-dd")
                    : "";
                // const formattedDate =
                // field.value instanceof Date
                //     ? format(field.value, "yyyy-MM-dd")
                //     : typeof field.value === "string"
                //     ? field.value
                //     : "";

                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                type="date"
                                value={formattedDate}
                                onChange={(e) =>
                                    field.onChange(new Date(e.target.value))
                                }
                                // {...field}
                                {...inputProps}
                            />
                        </FormControl>
                        {formDescription && (
                            <FormDescription>{formDescription}</FormDescription>
                        )}
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};
