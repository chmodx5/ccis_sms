"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    Control,
    FieldPath,
    FieldValues,
    useController,
} from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Image from "next/image";

interface Props<TFieldValues extends FieldValues>
    extends React.InputHTMLAttributes<HTMLInputElement> {
    name: FieldPath<TFieldValues>;
    label: string;
    placeholder: string;
    formDescription?: string;
    control: Control<TFieldValues>;
}

export const ImageInput = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    formDescription,
    ...inputProps
}: Props<TFieldValues>) => {
    const {
        field,
        fieldState: { error },
    } = useController({ control, name });

    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    function isFile(value: unknown): value is File {
        return typeof value === "object" && value instanceof File;
    }

    useEffect(() => {
        if (typeof field.value === "string") {
            setPreview(field.value); // from DB
        } else if (isFile(field.value)) {
            const objectUrl = URL.createObjectURL(field.value);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreview(null);
        }
    }, [field.value]);

    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <div
                    className={cn(
                        "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 aspect-square",
                        preview ? "border-gray-300" : "border-red-500",
                        inputProps.disabled
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                    )}
                    onClick={() => {
                        if (!inputProps.disabled) fileInputRef.current?.click();
                    }}
                >
                    {preview ? (
                        <div className="aspect-square relative w-full overflow-hidden rounded-md bg-gray-100">
                            <Image
                                src={preview}
                                alt="Image preview"
                                className="h-full w-full object-contain"
                                width={200}
                                height={200}
                            />
                        </div>
                    ) : (
                        <p className="text-gray-500">{placeholder}</p>
                    )}
                </div>
            </FormControl>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (file) {
                        const objectUrl = URL.createObjectURL(file);
                        setPreview(objectUrl);
                        field.onChange(file);
                    }
                }}
                {...inputProps}
            />

            {preview && (
                <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                        setPreview(null);
                        field.onChange(null);
                    }}
                    className="mt-2"
                >
                    Remove Image
                </Button>
            )}

            {formDescription && (
                <FormDescription>{formDescription}</FormDescription>
            )}
            <FormMessage>{error?.message}</FormMessage>
        </FormItem>
    );
};
