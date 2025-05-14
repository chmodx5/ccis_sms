"use server";

import { prisma } from "@/prisma";
import { StaffDesignation } from "@prisma/client";

type OrderByField = "name" | "createdAt";
type OrderDirection = "asc" | "desc";

interface GetStaffDesignationsOptions {
    orderBy?: {
        field: OrderByField;
        direction: OrderDirection;
    };
}

interface GetStaffDesignationsResult {
    success: boolean;
    data?: StaffDesignation[];
    error?: string;
}

export async function getStaffDesignations(
    options: GetStaffDesignationsOptions = {}
): Promise<GetStaffDesignationsResult> {
    const { orderBy = { field: "name", direction: "asc" } } = options;

    try {
        const designations = await prisma.staffDesignation.findMany({
            orderBy: {
                [orderBy.field]: orderBy.direction,
            },
        });

        return { success: true, data: designations };
    } catch (error) {
        console.error("Failed to fetch staff designations:", error);
        return { success: false, error: "Unable to fetch staff designations" };
    }
}
