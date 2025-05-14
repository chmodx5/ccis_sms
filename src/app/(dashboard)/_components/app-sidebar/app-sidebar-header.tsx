import React from "react";
import { SidebarHeader } from "@/components/ui";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const AppSidebarHeader: React.FC = async () => {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    const user = session
        ? {
              name: session?.user?.name,
              role: session.role,
          }
        : null;

    return (
        <SidebarHeader className="border-b">
            <div className="">
                <Image
                    src={"/logo.png"}
                    alt={"site logo"}
                    width={150}
                    height={150}
                    className={cn("object-center", "mx-auto")}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                />
            </div>
        </SidebarHeader>
    );
};
