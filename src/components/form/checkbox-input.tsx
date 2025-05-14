import React from "react";
import { Control, FieldPath, FieldValues, Controller } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "../ui";
import { Checkbox } from "../ui/checkbox";

interface Props<TFieldValues extends FieldValues> {
    name: FieldPath<TFieldValues>;
    label: string;
    control: Control<TFieldValues>;
    formDescription?: React.ReactNode;
}

export const CheckboxInput = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    formDescription,
}: Props<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>{label}</FormLabel>
                        {formDescription && (
                            <FormDescription>{formDescription}</FormDescription>
                        )}
                    </div>
                </FormItem>
            )}
        />
    );
};
