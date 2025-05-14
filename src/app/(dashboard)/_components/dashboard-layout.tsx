import {
    Separator,
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui";
import React from "react";
import { AppSidebar } from "./app-sidebar";
import { ADMIN_SIDEBAR_ITEMS, TEACHER_SIDEBAR_ITEMS } from "@/site-config";
import { AppBreadCrumbs } from "@/components/app-breadcrumbs";

interface DashboardLayoutProps {
    children: React.ReactNode;
    userRole: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    userRole,
    children,
}) => {
    return (
        <>
            <SidebarProvider className="">
                <AppSidebar
                    items={
                        userRole == "admin"
                            ? ADMIN_SIDEBAR_ITEMS
                            : userRole == "teacher"
                            ? TEACHER_SIDEBAR_ITEMS
                            : []
                    }
                />
                {/* <SidebarInset> */}
                <SidebarInset className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-muted relative">
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background border-b fixed top-0 w-full z-10">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 h-4"
                            />
                            <h1 className="text-lg font-semibold">
                                CCIS School Management System
                            </h1>
                            {/* <AppBreadCrumbs /> */}
                        </div>
                    </header>
                    <div className="px-4 py-4 mt-16">{children}</div>{" "}
                    {/* Added mt-16 */}
                </SidebarInset>
            </SidebarProvider>
        </>
    );
};
