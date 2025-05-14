"use server";

import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

type OrderByField = "firstName" | "createdAt";
type OrderDirection = "asc" | "desc";

interface GetStaffsOptions {
    orderBy?: {
        field: string;
        direction: string;
    };
    page?: number;
    pageSize?: number;
}

export type GetStaffsResultStaff = Prisma.StaffGetPayload<{
    include: {
        designation: true;
    };
}>;

interface GetStaffsSuccessResult {
    success: true;
    data: GetStaffsResultStaff[];
    totalCount: number;
    totalPages: number;
}

interface GetStaffsErrorResult {
    success: false;
    error: string;
}

type GetStaffsResult = GetStaffsSuccessResult | GetStaffsErrorResult;

export async function getStaffs(
    options: GetStaffsOptions = {}
): Promise<GetStaffsResult> {
    const {
        orderBy = { field: "firstName", direction: "asc" },
        page = 1,
        pageSize = 10,
    } = options;

    const skip = (page - 1) * pageSize;

    try {
        const [staffs, totalCount] = await prisma.$transaction([
            prisma.staff.findMany({
                include: {
                    designation: true,
                },
                orderBy: {
                    [orderBy.field]: orderBy.direction,
                },
                skip,
                take: pageSize,
            }),
            prisma.staff.count(),
        ]);

        const totalPages = Math.ceil(totalCount / pageSize);

        return {
            success: true,
            data: staffs,
            totalCount,
            totalPages,
        };
    } catch (error) {
        console.error("Failed to fetch staff:", error);
        return {
            success: false,
            error: "Unable to fetch staff",
        };
    }
}
