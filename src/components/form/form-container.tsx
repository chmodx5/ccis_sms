import { cn } from "@/lib/utils";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui";

interface Props {
    title?: string;
    subTitle?: string;
    children: React.ReactNode;
    action?: React.ReactNode;
}

const FormContainer: React.FC<Props> = ({
    title,
    subTitle,
    children,
    action,
}) => {
    const showCardHeader = title || subTitle;

    return (
        <Card>
            {showCardHeader && (
                <CardHeader className="pb-0">
                    {title && (
                        <div
                            className={cn(
                                "flex items-center",
                                action ? "justify-between" : "justify-start"
                            )}
                        >
                            <CardTitle>{title}</CardTitle>
                            {action && action}
                        </div>
                    )}
                    {subTitle && <CardDescription>{subTitle}</CardDescription>}
                </CardHeader>
            )}
            <CardContent className="pt-4">{children}</CardContent>
        </Card>
    );
};

export default FormContainer;
