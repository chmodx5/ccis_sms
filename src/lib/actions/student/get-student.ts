"use server";

import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

export type GetStudentResultStudent = Prisma.StudentGetPayload<{
    include: {
        class: true;
        academicYear: true;
        guardians: true;
        emergencyContacts: true;
        doctors: true;
    };
}>;

interface GetStudentSuccessResult {
    success: true;
    data: GetStudentResultStudent;
}

interface GetStudentErrorResult {
    success: false;
    error: string;
}

export type GetStudentResult = GetStudentSuccessResult | GetStudentErrorResult;

export async function getStudent(id: string): Promise<GetStudentResult> {
    try {
        const student = await prisma.student.findUnique({
            where: { id },
            include: {
                class: true,
                academicYear: true,
                guardians: true,
                emergencyContacts: true,
                doctors: true,
            },
        });

        if (!student) {
            return {
                success: false,
                error: "Student not found",
            };
        }

        return {
            success: true,
            data: student,
        };
    } catch (error) {
        console.error("Failed to fetch student:", error);
        return {
            success: false,
            error: "Unable to fetch student",
        };
    }
}
