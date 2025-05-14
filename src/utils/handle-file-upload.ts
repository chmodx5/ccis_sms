import { uploadFile } from "@/lib/actions/upload-file";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { toast } from "sonner";

type UploadAndExtractOptions<TFieldValues extends FieldValues> = {
    file: string | File | undefined;
    fieldName: Path<TFieldValues>;
    uploadFolder: string;
    form: UseFormReturn<TFieldValues>;
    setSubmissionErrors: React.Dispatch<React.SetStateAction<string[]>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export async function uploadAndExtractUrl<TFieldValues extends FieldValues>({
    file,
    fieldName,
    uploadFolder,
    form,
    setSubmissionErrors,
    setIsLoading,
}: UploadAndExtractOptions<TFieldValues>): Promise<string | undefined> {
    if (!file || typeof file === "string") return file;

    const res = await uploadFile(file, uploadFolder);
    const url = res?.success ? res.data?.url : undefined;

    if (!res?.success) {
        setSubmissionErrors((prev) => [
            ...prev,
            `${String(fieldName)} upload failed.`,
        ]);
        form.resetField(fieldName);
        toast.error(`${String(fieldName)} upload failed.`);
        setIsLoading(false);
        return;
    }

    return url;
}
