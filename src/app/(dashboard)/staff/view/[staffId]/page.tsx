import { ImageContainer } from "@/components/image-container";
import { Button } from "@/components/ui";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getStaff } from "@/lib/actions/staff/get-staff";
import { format } from "date-fns";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import ViewStaffClient from "./_components/view-staff-client";

const ViewSingleStaffPage = async ({
    params,
}: {
    params: Promise<{ staffId: string }>;
}) => {
    const { staffId } = await params;
    const staffResult = await getStaff(staffId);

    if (!staffResult.success) {
        return <div>Staff not found</div>;
    }

    const staff = staffResult.data;

    return <ViewStaffClient staff={staff} />;
};

export default ViewSingleStaffPage;
