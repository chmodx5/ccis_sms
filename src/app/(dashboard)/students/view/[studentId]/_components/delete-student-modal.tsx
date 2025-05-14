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
import { useRouter } from "next/navigation";
import { deleteStudent } from "@/lib/actions/student/delete-student"; // replace with your path
import { toast } from "sonner";

type DeleteStudentModalProps = {
    studentId: string;
    registrationNo: string;
};

export const DeleteStudentModal = ({
    studentId,
    registrationNo,
}: DeleteStudentModalProps) => {
    const [open, setOpen] = useState(false);
    const [confirmInput, setConfirmInput] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const result = await deleteStudent(studentId);

            console.log("result", result);
            if (result.success) {
                setOpen(false);
                toast.success("Student deleted successfully");
                router.push("/students/view/list"); // or wherever you want to redirect
            } else {
                // optionally show error message
                toast.error("Failed to delete student");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the student");
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
                        This action cannot be undone. Please enter the student’s
                        registration number (<strong>{registrationNo}</strong>)
                        to confirm.
                    </DialogDescription>
                </DialogHeader>
                <Input
                    placeholder="Enter registration number"
                    value={confirmInput}
                    onChange={(e) => setConfirmInput(e.target.value)}
                    disabled={isDeleting}
                />
                <DialogFooter>
                    <Button
                        variant="destructive"
                        disabled={confirmInput !== registrationNo || isDeleting}
                        onClick={handleDelete}
                    >
                        {isDeleting ? "Deleting..." : "Confirm Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
