import { Sidebar, SidebarRail } from "@/components/ui";
import { AppSidebarHeader } from "./app-sidebar-header";
import {
    AppSidebarContent,
    AppSidebarContentProps,
} from "./app-sidebar-content";
import { AppSidebarFooter } from "./app-sidebar-footer";

interface AppSidebarProps {
    items: AppSidebarContentProps["items"];
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ items, ...props }) => {
    return (
        <Sidebar className="px-2" {...props}>
            <AppSidebarHeader />
            <AppSidebarContent items={items} />
            <SidebarRail />
        </Sidebar>
    );
};
