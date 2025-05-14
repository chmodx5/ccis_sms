"use server";

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

export async function uploadFile(
    file: File,
    folder: string
): Promise<{ success: boolean; data?: { url?: string }; error?: string }> {
    try {
        if (!file) {
            return { success: false, error: "No file provided" };
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const cleanFolder = folder.replace(/[^a-zA-Z0-9-_]/g, "");
        const uploadsPath = path.join(
            process.cwd(),
            "public",
            "uploads",
            cleanFolder
        );

        // Ensure directory exists
        await mkdir(uploadsPath, { recursive: true });

        const originalName = file.name;
        const extension = originalName.substring(originalName.lastIndexOf("."));

        const fileName = `${randomUUID()}${extension}`;
        const filePath = path.join(uploadsPath, fileName);

        await writeFile(filePath, buffer);

        const fileUrl = `/uploads/${cleanFolder}/${fileName}`;
        return { success: true, data: { url: fileUrl } };
    } catch (error) {
        console.error("Upload error:", error);
        return { success: false, error: "Failed to upload file." };
    }
}
