"use server";

import { prisma } from "@/prisma";
import { Class } from "@prisma/client";

type OrderByField = "name" | "createdAt";
type OrderDirection = "asc" | "desc";

interface GetClassesOptions {
    orderBy?: {
        field: OrderByField;
        direction: OrderDirection;
    };
}

interface GetClassesResult {
    success: boolean;
    data?: Class[];
    error?: string;
}

export async function getClasses(
    options: GetClassesOptions = {}
): Promise<GetClassesResult> {
    const { orderBy = { field: "name", direction: "asc" } } = options;

    try {
        const classes = await prisma.class.findMany({
            orderBy: {
                [orderBy.field]: orderBy.direction,
            },
        });

        return { success: true, data: classes };
    } catch (error) {
        console.error("Failed to fetch classes:", error);
        return { success: false, error: "Unable to fetch classes" };
    }
}
