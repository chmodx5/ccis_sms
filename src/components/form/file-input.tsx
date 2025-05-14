import React, { useRef, useEffect, useState } from "react";
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
    Button,
} from "../ui";
import { Input } from "../ui/input";
import { Trash, X } from "lucide-react";

interface FileInputProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    label: string;
    placeholder?: string;
    formDescription?: string;
    accept?: string;
    disabled?: boolean;
}

export const FileInput = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    formDescription,
    accept,
    disabled,
}: FileInputProps<TFieldValues>) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {
        field,
        fieldState: { error },
    } = useController({ control, name });

    const [fileName, setFileName] = useState<string | null>(null);
    const [initialUrl, setInitialUrl] = useState<string | null>(null);

    function isFile(value: unknown): value is File {
        return typeof value === "object" && value instanceof File;
    }

    useEffect(() => {
        if (typeof field.value === "string") {
            setInitialUrl(field.value);
            setFileName(field.value.split("/").pop() || "Existing File");
        } else if (isFile(field.value)) {
            setFileName(field.value.name);
            setInitialUrl(null);
        } else {
            setFileName(null);
            setInitialUrl(null);
        }
    }, [field.value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        field.onChange(file);
    };

    const clearFile = () => {
        field.onChange(null);
        setFileName(null);
        setInitialUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <div>
                    <Input
                        type="file"
                        ref={fileInputRef}
                        accept={accept}
                        placeholder={placeholder}
                        disabled={disabled}
                        onChange={handleFileChange}
                    />

                    {fileName && (initialUrl || isFile(field.value)) && (
                        <div className="mt-2 text-sm text-gray-700 flex items-center gap-2">
                            {initialUrl ? (
                                <a
                                    href={initialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-blue-600"
                                >
                                    {fileName}
                                </a>
                            ) : (
                                <span>{fileName}</span>
                            )}
                            <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                onClick={clearFile}
                                className="rounded-full w-5 h-5"
                            >
                                <X className="w-3 h-3" />
                            </Button>
                        </div>
                    )}
                </div>
            </FormControl>
            {formDescription && (
                <FormDescription>{formDescription}</FormDescription>
            )}
            {error && <FormMessage>{error.message}</FormMessage>}
        </FormItem>
    );
};
