"use server";

import { prisma } from "@/prisma";
import { Prisma } from "@prisma/client";

export type GetStaffResultData = Prisma.StaffGetPayload<{
    include: {
        designation: true;
        residentTeachingStaffProfile: true;
        residentNonTeachingStaffProfile: true;
        internationalTeachingStaffProfile: true;
        InternationalNonTeachingStaffProfile: true;
        emergencyContacts: true;
    };
}>;

interface GetStaffSuccessResult {
    success: true;
    data: GetStaffResultData;
}

interface GetStaffErrorResult {
    success: false;
    error: string;
}

type GetStaffResult = GetStaffSuccessResult | GetStaffErrorResult;

export async function getStaff(id: string): Promise<GetStaffResult> {
    try {
        const staff = await prisma.staff.findUnique({
            where: { id },
            include: {
                designation: true,
                residentTeachingStaffProfile: true,
                residentNonTeachingStaffProfile: true,
                internationalTeachingStaffProfile: true,
                InternationalNonTeachingStaffProfile: true,
                emergencyContacts: true,
            },
        });

        if (!staff) {
            return {
                success: false,
                error: "Staff not found",
            };
        }

        return {
            success: true,
            data: staff,
        };
    } catch (error) {
        console.error("Failed to fetch staff:", error);
        return {
            success: false,
            error: "Unable to fetch staff",
        };
    }
}
