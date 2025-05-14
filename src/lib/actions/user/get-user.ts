"use server";

import { prisma } from "@/prisma";
import { Prisma, User } from "@prisma/client";

export type GetUserResultUser = User;

interface GetUserSuccessResult {
    success: true;
    data: GetUserResultUser;
}

interface GetUserErrorResult {
    success: false;
    error: string;
}

export type GetUserResult = GetUserSuccessResult | GetUserErrorResult;

export async function getUser(email: string): Promise<GetUserResult> {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return {
                success: false,
                error: "User not found",
            };
        }

        return {
            success: true,
            data: user,
        };
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return {
            success: false,
            error: "Unable to fetch user",
        };
    }
}
