"use client";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export interface AppSidebarContentProps {
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
}

export const AppSidebarContent: React.FC<AppSidebarContentProps> = ({
    items,
}) => {
    const currentUrl = usePathname();

    const isActive = (itemUrl: string) => {
        return currentUrl.includes(itemUrl);
    };

    const linkIsActive = (itemUrl: string, parentUrl: string): boolean => {
        if (itemUrl === currentUrl) {
            return true;
        }

        if (currentUrl.startsWith(`${parentUrl}/`) && parentUrl === itemUrl) {
            return false;
        }

        return isActive(itemUrl);
    };

    const hasActiveChild = (subItems?: { url: string }[]) =>
        subItems?.some((subItem) => isActive(subItem.url));

    return (
        <SidebarContent className="mt-2">
            <SidebarMenu>
                {items.map((item) => {
                    const shouldBeOpen =
                        isActive(item.url) || hasActiveChild(item.items);

                    if (!item.items) {
                        return (
                            <SidebarMenuButton
                                key={item.title}
                                isActive={currentUrl == item.url}
                            >
                                <a href={item.url}>
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        );
                    } else
                        return (
                            <Collapsible
                                key={item.title}
                                asChild
                                defaultOpen={shouldBeOpen}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem
                                                    key={subItem.title}
                                                >
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        isActive={linkIsActive(
                                                            subItem.url,
                                                            item.url
                                                        )}
                                                    >
                                                        <a href={subItem.url}>
                                                            <span>
                                                                {subItem.title}
                                                            </span>
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        );
                })}
            </SidebarMenu>
        </SidebarContent>
    );
};
