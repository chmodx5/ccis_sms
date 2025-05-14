"use client";

import React from "react";
import { Control, FieldPath, FieldValues, Controller } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";

interface Option {
    label: string;
    value: string;
}

interface Props<TFieldValues extends FieldValues> {
    name: FieldPath<TFieldValues>;
    label: string;
    control: Control<TFieldValues>;
    options: Option[];
    placeholder?: string;
    formDescription?: string;
}

export const ComboboxInput = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    options,
    placeholder = "Select an option",
    formDescription,
}: Props<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-[200px] justify-between",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value
                                        ? options.find(
                                              (opt) => opt.value === field.value
                                          )?.label
                                        : placeholder}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput
                                    placeholder="Search..."
                                    className="h-9"
                                />
                                <CommandList>
                                    <CommandEmpty>
                                        No options found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {options.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                value={option.label}
                                                onSelect={() =>
                                                    field.onChange(option.value)
                                                }
                                            >
                                                {option.label}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        option.value ===
                                                            field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {formDescription && (
                        <FormDescription>{formDescription}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
