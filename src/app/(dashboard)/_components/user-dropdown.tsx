"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { LogOut, Settings, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export function UserDropdown() {
    const router = useRouter();

    // get the logged in user from next auth
    const { data: session } = useSession();
    const user = session?.user;

    const name = user?.name;
    const email = user?.email;
    const imageUrl = user?.image;

    function getInitials(name: string = "") {
        const parts = name.trim().split(" ");
        if (parts.length === 1) return parts[0][0]?.toUpperCase();
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage
                        src={imageUrl || undefined}
                        alt={name || "user"}
                    />
                    <AvatarFallback>{name && getInitials(name)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                    <div className="text-sm font-medium">{name}</div>
                    {email && (
                        <div className="text-xs text-muted-foreground">
                            {email}
                        </div>
                    )}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                </DropdownMenuItem>

                {/* <DropdownMenuItem onClick={() => router.push("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                </DropdownMenuItem> */}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-destructive hover:cursor-pointer"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
