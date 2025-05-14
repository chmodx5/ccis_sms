/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Control, FieldPath, FieldValues, Controller } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui";

interface Props<TFieldValues extends FieldValues> {
    name: FieldPath<TFieldValues>;
    label: string;
    placeholder: string;
    control: Control<TFieldValues>;
    options: { label: string; value: string }[];
    formDescription?: string;
    mapValue?: (value: string) => any;
    mapToString?: (value: any) => string;
    disabled?: boolean;
}

export const SelectInput = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    options,
    formDescription,
    mapValue,
    mapToString,
    disabled = false,
}: Props<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select
                        // onValueChange={field.onChange}
                        onValueChange={(val) =>
                            field.onChange(mapValue ? mapValue(val) : val)
                        }
                        value={
                            mapToString ? mapToString(field.value) : field.value
                        }
                        defaultValue={field.value}
                        disabled={disabled}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {formDescription && (
                        <FormDescription>{formDescription}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
