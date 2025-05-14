import React from "react";
import { DashboardLayout } from "./_components/dashboard-layout";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface Props {
    children: React.ReactNode;
}

const MainLayout = async ({ children }: Props) => {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    const role = session.user.role;

    return <DashboardLayout userRole={role}>{children}</DashboardLayout>;
};

export default MainLayout;
