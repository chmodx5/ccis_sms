"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type DeleteEntityModalProps = {
    entityId: string;
    entityLabel: string; // human-readable type: "student", "teacher", "class"
    confirmValue: string; // value the user must type to confirm, e.g., registrationNo
    onDelete: (
        id: string
    ) => Promise<{ success: boolean; message?: string; error?: string }>;
    redirectTo?: string;
};

export const DeleteEntityModal = ({
    entityId,
    entityLabel,
    confirmValue,
    onDelete,
    redirectTo,
}: DeleteEntityModalProps) => {
    const [open, setOpen] = useState(false);
    const [confirmInput, setConfirmInput] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const result = await onDelete(entityId);

            if (result.success) {
                setOpen(false);
                toast.success(`${entityLabel} deleted successfully`);
                toast.info(`Redirecting to staff list`);
                if (redirectTo) {
                    router.push(redirectTo);
                }
            } else {
                toast.error(result.error || `Failed to delete ${entityLabel}`);
            }
        } catch (error) {
            console.log("error", error);
            toast.error(`An error occurred while deleting the ${entityLabel}`);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="destructive">
                    <Trash className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Please enter the
                        confirmation value (<strong>{confirmValue}</strong>) to
                        delete this {entityLabel}.
                    </DialogDescription>
                </DialogHeader>
                <Input
                    placeholder={`Enter ${entityLabel}'s confirmation value`}
                    value={confirmInput}
                    onChange={(e) => setConfirmInput(e.target.value)}
                    disabled={isDeleting}
                />
                <DialogFooter>
                    <Button
                        variant="destructive"
                        disabled={confirmInput !== confirmValue || isDeleting}
                        onClick={handleDelete}
                    >
                        {isDeleting ? "Deleting..." : "Confirm Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
