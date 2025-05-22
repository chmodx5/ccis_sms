import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Separator,
} from "@/components/ui";
import {
    GetUserResultUser,
    GetUserSuccessResult,
} from "@/lib/actions/user/get-user";
import { getInitials } from "@/utils/get-initials";
import { format } from "date-fns";
import React from "react";

interface Props {
    user: GetUserSuccessResult["data"];
}
const ProfilePageClient = ({ user }: Props) => {
    return (
        <div>
            {" "}
            <Card className="max-w-xl mx-auto mt-10 shadow-md rounded-2xl">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage
                                src={user.image ?? undefined}
                                alt={user.name}
                            />
                            <AvatarFallback>
                                {getInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-xl">
                                {user.name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <Separator />
                <CardContent className="space-y-3 py-4">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-muted-foreground">
                            Username
                        </span>
                        <span>{user.username}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-muted-foreground">
                            Role
                        </span>
                        <span className="capitalize">{user.role}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-muted-foreground">
                            Joined
                        </span>
                        <span>
                            {format(new Date(user.createdAt), "dd MMM yyyy")}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePageClient;
