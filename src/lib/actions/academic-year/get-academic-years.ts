"use server";

import { prisma } from "@/prisma";
import { AcademicYear, Class } from "@prisma/client";

type OrderByField = "name" | "createdAt";
type OrderDirection = "asc" | "desc";

interface GetAcademicYearsOptions {
    orderBy?: {
        field: OrderByField;
        direction: OrderDirection;
    };
}

interface GetAcademicYearsResult {
    success: boolean;
    data?: AcademicYear[];
    error?: string;
}

export async function getAcademicYears(
    options: GetAcademicYearsOptions = {}
): Promise<GetAcademicYearsResult> {
    const { orderBy = { field: "name", direction: "asc" } } = options;

    try {
        const academicYears = await prisma.academicYear.findMany({
            orderBy: {
                [orderBy.field]: orderBy.direction,
            },
        });

        return { success: true, data: academicYears };
    } catch (error) {
        console.error("Failed to fetch academic years:", error);
        return { success: false, error: "Unable to fetch academic years" };
    }
}
