"use client";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui";
import { usePathname } from "next/navigation";
import React from "react";

export const AppBreadCrumbs = () => {
    const pathname = usePathname();

    const generateBreadcrumbs = () => {
        const pathSegments = pathname.split("/").filter(Boolean);

        if (pathSegments.length <= 4) {
            return pathSegments.map((segment, index) => (
                <React.Fragment key={segment}>
                    <BreadcrumbItem>
                        {index < pathSegments.length - 1 ? (
                            <BreadcrumbLink
                                href={`/${pathSegments
                                    .slice(0, index + 1)
                                    .join("/")}`}
                            >
                                {segment.charAt(0).toUpperCase() +
                                    segment.slice(1)}
                            </BreadcrumbLink>
                        ) : (
                            <BreadcrumbPage>
                                {segment.charAt(0).toUpperCase() +
                                    segment.slice(1)}
                            </BreadcrumbPage>
                        )}
                    </BreadcrumbItem>
                    {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
            ));
        }

        return (
            <>
                <BreadcrumbItem>
                    <BreadcrumbLink href={`/${pathSegments[0]}`}>
                        {pathSegments[0].charAt(0).toUpperCase() +
                            pathSegments[0].slice(1)}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink
                        href={`/${pathSegments
                            .slice(0, pathSegments.length - 1)
                            .join("/")}`}
                    >
                        {pathSegments[pathSegments.length - 2]
                            .charAt(0)
                            .toUpperCase() +
                            pathSegments[pathSegments.length - 2].slice(1)}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {pathSegments[pathSegments.length - 1]
                            .charAt(0)
                            .toUpperCase() +
                            pathSegments[pathSegments.length - 1].slice(1)}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </>
        );
    };
    return (
        <Breadcrumb>
            <BreadcrumbList>{generateBreadcrumbs()}</BreadcrumbList>
        </Breadcrumb>
    );
};
