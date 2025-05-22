/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { Control, FieldPath, FieldValues, Controller } from "react-hook-form";
// import {
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
//     Input,
// } from "../ui";

// interface Props<TFieldValues extends FieldValues>
//     extends React.InputHTMLAttributes<HTMLInputElement> {
//     name: FieldPath<TFieldValues>;
//     label: string;
//     placeholder: string;
//     formDescription?: string;
//     control: Control<TFieldValues>;
//     type?: "text" | "email" | "password" | "number";
// }

// export const TextInput = <TFieldValues extends FieldValues>({
//     control,
//     name,
//     label,
//     placeholder,
//     formDescription,
//     type = "text",
//     ...inputProps
// }: Props<TFieldValues>) => {
//     return (
//         <FormField
//             control={control}
//             name={name}
//             render={({ field }) => (
//                 <FormItem>
//                     <FormLabel>{label}</FormLabel>
//                     <FormControl>
//                         <Input
//                             placeholder={placeholder}
//                             name={field.name}
//                             ref={field.ref}
//                             onBlur={field.onBlur}
//                             value={field.value ?? ""}
//                             type={type}
//                             onChange={(e) => {
//                                 const value =
//                                     type === "number"
//                                         ? e.target.value === ""
//                                             ? undefined
//                                             : Number(e.target.value)
//                                         : e.target.value;
//                                 field.onChange(value);
//                             }}
//                             // {...field}
//                             {...inputProps}
//                         />
//                     </FormControl>
//                     {formDescription && (
//                         <FormDescription>{formDescription}</FormDescription>
//                     )}
//                     <FormMessage />
//                 </FormItem>
//             )}
//         />
//     );
// };

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

interface Props<TFieldValues extends FieldValues>
    extends React.InputHTMLAttributes<HTMLInputElement> {
    name: FieldPath<TFieldValues>;
    label: string;
    placeholder: string;
    formDescription?: string;
    control: Control<TFieldValues>;
    type?: "text" | "email" | "password" | "number";
}

export const TextInput = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    formDescription,
    type = "text",
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
                        <Input
                            placeholder={placeholder}
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            type={type}
                            value={
                                /^(phone|contactphone|whatsapp|whatsappno|whatsappnumber)$/i.test(
                                    name.toString()
                                )
                                    ? (field.value ?? "")?.toString()
                                    : field.value ?? ""
                            }
                            onChange={(e) => {
                                let value: any = e.target.value;
                                // Only treat as string if name matches phone/contactPhone/whatsapp/whatsappNo/whatsappNumber
                                if (
                                    /^(phone|contactphone|whatsapp|whatsappno|whatsappnumber)$/i.test(
                                        name.toString()
                                    )
                                ) {
                                    value = value.toString();
                                } else if (type === "number") {
                                    value =
                                        value === ""
                                            ? undefined
                                            : Number(value);
                                }
                                field.onChange(value);
                            }}
                            // {...field}
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
