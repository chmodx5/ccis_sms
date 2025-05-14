"use server";

import { prisma } from "@/prisma";

type DeleteStudentResult =
    | { success: true }
    | { success: false; error: string };

export async function deleteStudent(
    studentId: string
): Promise<DeleteStudentResult> {
    try {
        const getStudent = await prisma.student.findUnique({
            where: { id: studentId },
        });
        if (!getStudent) {
            return { success: false, error: "Student not found" };
        }
        await prisma.student.delete({ where: { id: studentId } });
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete student" };
    }
}
