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
import { UserDropdown } from "./user-dropdown";

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
            <SidebarProvider>
                <AppSidebar
                    items={
                        userRole === "admin"
                            ? ADMIN_SIDEBAR_ITEMS
                            : userRole === "teacher"
                            ? TEACHER_SIDEBAR_ITEMS
                            : []
                    }
                />
                <SidebarInset className="flex flex-col h-screen bg-muted">
                    {/* Sticky header inside inset container */}
                    <header className="sticky top-0 z-30 py-4 flex items-center justify-between px-4 border-b bg-background">
                        <div className="flex items-center space-x-2">
                            <SidebarTrigger className="-ml-1" />
                            <div>
                                <h1 className="font-semibold">
                                    CCIS school management system
                                </h1>
                            </div>
                        </div>
                        <div>
                            <UserDropdown />
                        </div>
                    </header>

                    {/* Scrollable content */}
                    <div className="flex-1 overflow-y-auto px-4 py-4">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
};
