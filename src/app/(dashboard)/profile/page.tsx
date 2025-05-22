import { auth } from "@/auth";
import { getUser } from "@/lib/actions/user/get-user";
import React from "react";
import ProfilePageClient from "./_components/profile-page-client";

const ProfilePage = async () => {
    // get the user from the database
    const session = await auth();
    if (!session) return <div>User not found</div>;
    const userEmail = session.user.email;
    const user = await getUser(userEmail);
    if (!user.success) return <div>User not found</div>;

    return (
        <div>
            <ProfilePageClient user={user.data} />
        </div>
    );
};

export default ProfilePage;
