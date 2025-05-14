"use server";

import { prisma } from "@/prisma";
import { Class, Prisma, Student } from "@prisma/client";

type OrderByField = "name" | "createdAt";
type OrderDirection = "asc" | "desc";

interface GetStudentsOptions {
    orderBy?: {
        field: string;
        direction: OrderDirection;
    };
    page?: number;
    pageSize?: number;
}

export type GetStudentsResultStudent = Prisma.StudentGetPayload<{
    include: { class: true };
}>;

// interface GetStudentsResult {
//     success: boolean;
//     data?: GetStudentsResultStudent[];
//     totalCount?: number;s
//     totalPages?: number;
//     error?: string;
// }

interface GetStudentsSuccessResult {
    success: true;
    data: GetStudentsResultStudent[];
    totalCount: number;
    totalPages: number;
}

interface GetStudentsErrorResult {
    success: false;
    error: string;
}

type GetStudentsResult = GetStudentsSuccessResult | GetStudentsErrorResult;

export async function getStudents(
    options: GetStudentsOptions = {}
): Promise<GetStudentsResult> {
    const {
        orderBy = { field: "name", direction: "asc" },
        page = 1,
        pageSize = 10,
    } = options;

    const skip = (page - 1) * pageSize;

    try {
        const [students, totalCount] = await prisma.$transaction([
            prisma.student.findMany({
                include: {
                    class: true,
                },
                orderBy: {
                    [orderBy.field]: orderBy.direction,
                },
                skip,
                take: pageSize,
            }),
            prisma.student.count(),
        ]);

        const totalPages = Math.ceil(totalCount / pageSize);

        return {
            success: true,
            data: students,
            totalCount,
            totalPages,
        };
    } catch (error) {
        console.error("Failed to fetch students:", error);
        return {
            success: false,
            error: "Unable to fetch students",
        };
    }
}
