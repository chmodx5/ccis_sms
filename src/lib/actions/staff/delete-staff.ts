"use server";

import { prisma } from "@/prisma";

interface DeleteStaffResultSuccess {
    success: true;
}

interface DeleteStaffResultError {
    success: false;
    error: string;
}

type DeleteStaffResult = DeleteStaffResultSuccess | DeleteStaffResultError;

export async function deleteStaff(staffId: string): Promise<DeleteStaffResult> {
    try {
        console.log("staff id ", staffId);
        // Check if the staff member exists
        const staff = await prisma.staff.findUnique({
            where: { id: staffId },
        });

        if (!staff) {
            return {
                success: false,
                error: "Staff member not found",
            };
        }
        console.log("staff", staff);

        console.log("staff id ", staffId);

        if (!staffId)
            return { success: false, error: "please provide staff Id" };

        const deleteStaffRes = await prisma.staff.delete({
            where: { id: staffId.toString() },
        });

        console.log("deleteStaffRes", deleteStaffRes);

        if (!deleteStaffRes) {
            return {
                success: false,
                error: "Unable to delete staff member 1",
            };
        }

        return {
            success: true,
        };
    } catch (error) {
        console.log("error", error);
        return {
            success: false,
            error: "Unable to delete staff member",
        };
    }
}
