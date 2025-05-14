/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { staffFormSchema } from "./schemas/staff-form-schema";
import {
    Alert,
    AlertDescription,
    AlertTitle,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Form,
} from "../ui";
import { AlertCircle, Trash } from "lucide-react";
import { TextInput } from "../form/text-input";
import { SelectInput } from "../form/select-input";
import { Gender, StaffDesignation } from "@prisma/client";
import { DateInput } from "../form/date-input";
import { STAFF_QUALIFICATIONS, UPLOAD_FOLDER } from "@/site-config";
import { FileInput } from "../form/file-input";
import { TextareaInput } from "../form/textarea-input";
import { uploadAndExtractUrl } from "@/utils/handle-file-upload";
import { toast } from "sonner";
import { addStaff } from "@/lib/actions/staff/add-staff";
import { GetStaffResultData } from "@/lib/actions/staff/get-staff";
import { updateStaff } from "@/lib/actions/staff/update-staff";

interface Props {
    formType: "add" | "update";
    staffDesignations: StaffDesignation[];
    initialData?: GetStaffResultData;
}

const RESIDENT_FIELDS = {
    residentNationalIdNo: "",
    residentNationalIdAttachment: undefined,
    residentNssfNo: "",
    residentNssfAttachment: undefined,
    residentTinNo: "",
    residentTinAttachment: undefined,
    residentTeachingLicenseNo: "",
    residentTeachingLicenseAttachment: undefined,
};

const INTERNATIONAL_FIELDS = {
    internationalTcuNo: "",
    internationalTcuAttachment: undefined,
    internationalTeachingLicenseNo: "",
    internationalTeachingLicenseAttachment: undefined,
    internationalExpirationDate: undefined,
    internationalWorkPermitNo: "",
    internationalWorkPermitExpirationDate: undefined,
    internationalWorkPermitAttachment: undefined,
    internationalResidentPermitNo: "",
    internationalResidentPermitExpirationDate: undefined,
    internationalResidentPermitAttachment: undefined,
    internationalPassportNo: "",
    internationalPassportExpirationDate: undefined,
    internationalPassportAttachment: undefined,
};

const RESIDENT_TEACHING_STAFF_FIELDS = {
    nationalIdNo: "",
    nationalIdAttachment: "",
    nssfNo: "",
    nssfAttachment: "",
    tinNo: "",
    tinAttachment: "",
    teachingLicenseNo: "",
    teachingLicenseAttachment: "",
};
const RESIDENT_NON_TEACHING_STAFF_FIELDS = {
    nationalIdNo: "",
    nationalIdAttachment: "",
    nssfNo: "",
    nssfAttachment: "",
    tinNo: "",
    tinAttachment: "",
};
const INTERNATIONAL_TEACHING_STAFF_FIELDS = {
    tcuNo: "",
    tcuAttachment: "",
    teachingLicenseNo: "",
    expirationDate: undefined,
    teachingLicenseAttachment: "",
    workPermitNo: "",
    workPermitExpirationDate: undefined,
    workPermitAttachment: "",
    residentPermitNo: "",
    residentPermitExpirationDate: undefined,
    residentPermitAttachment: "",
    passportNo: "",
    passportExpirationDate: undefined,
    passportAttachment: "",
};
const INTERNATIONAL_NON_TEACHING_STAFF_FIELDS = {
    workPermitNo: "",
    workPermitExpirationDate: undefined,
    workPermitAttachment: "",
    residentPermitNo: "",
    residentPermitExpirationDate: undefined,
    residentPermitAttachment: "",
    passportNo: "",
    passportExpirationDate: undefined,
    passportAttachment: "",
};

export const StaffForm: React.FC<Props> = ({
    formType,
    initialData,
    staffDesignations,
}) => {
    const [submissionErrors, setSubmissionErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const COMMON_FIELDS = {
        staffType: initialData?.staffType ?? "resident_teaching_staff",
        staffId: initialData?.staffId ?? "",
        firstName: initialData?.firstName ?? "",
        middleName: initialData?.middleName ?? "",
        surname: initialData?.surname ?? "",
        gender: initialData?.gender ?? "male",
        dateOfBirth: initialData?.dateOfBirth ?? undefined,
        nationality: initialData?.nationality ?? "",
        designation: initialData?.designationId ?? "",
        dateOfEmployment: initialData?.dateOfEmployment ?? undefined,
        highestQualification: initialData?.highestQualification ?? "",
        yearsOfWorkExperience: initialData?.yearsOfWorkExperience ?? undefined,
        noOfYearsAtCCIS: initialData?.noOfYearsAtCCIS ?? undefined,
        resumeURL: initialData?.resumeURL ?? undefined,
        comment: initialData?.comment ?? "",
        emergencyContacts: initialData?.emergencyContacts?.length
            ? initialData.emergencyContacts.map((c: any) => ({
                  fullNames: c.fullNames ?? "",
                  relationship: c.relationship ?? "",
                  contactPhone: c.contactPhone ?? "",
                  whatsappNumber: c.whatsappNumber ?? "",
              }))
            : [
                  {
                      fullNames: "",
                      relationship: "",
                      contactPhone: "",
                      whatsappNumber: "",
                  },
              ],
    };
    const INTERNATIONAL_TEACHING_STAFF_FIELDS = {
        tcuNo: initialData?.internationalTeachingStaffProfile?.tcuNo ?? "",
        tcuAttachment:
            initialData?.internationalTeachingStaffProfile?.tcuAttachment ??
            undefined,
        teachingLicenseNo:
            initialData?.internationalTeachingStaffProfile?.teachingLicenseNo ??
            "",
        expirationDate:
            initialData?.internationalTeachingStaffProfile?.expirationDate ??
            undefined,
        teachingLicenseAttachment:
            initialData?.internationalTeachingStaffProfile
                ?.teachingLicenseAttachment ?? undefined,
        workPermitNo:
            initialData?.internationalTeachingStaffProfile?.workPermitNo ?? "",
        workPermitExpirationDate:
            initialData?.internationalTeachingStaffProfile
                ?.workPermitExpirationDate ?? undefined,
        workPermitAttachment:
            initialData?.internationalTeachingStaffProfile
                ?.workPermitAttachment ?? undefined,
        residentPermitNo:
            initialData?.internationalTeachingStaffProfile?.residentPermitNo ??
            "",
        residentPermitExpirationDate:
            initialData?.internationalTeachingStaffProfile
                ?.residentPermitExpirationDate ?? undefined,
        residentPermitAttachment:
            initialData?.internationalTeachingStaffProfile
                ?.residentPermitAttachment ?? undefined,
        passportNo:
            initialData?.internationalTeachingStaffProfile?.passportNo ?? "",
        passportExpirationDate:
            initialData?.internationalTeachingStaffProfile
                ?.passportExpirationDate ?? undefined,
        passportAttachment:
            initialData?.internationalTeachingStaffProfile
                ?.passportAttachment ?? undefined,
    };
    const INTERNATIONAL_NON_TEACHING_STAFF_FIELDS = {
        workPermitNo:
            initialData?.InternationalNonTeachingStaffProfile?.workPermitNo ??
            "",
        workPermitExpirationDate:
            initialData?.InternationalNonTeachingStaffProfile
                ?.workPermitExpirationDate ?? undefined,
        workPermitAttachment:
            initialData?.InternationalNonTeachingStaffProfile
                ?.workPermitAttachment ?? undefined,
        residentPermitNo:
            initialData?.InternationalNonTeachingStaffProfile
                ?.residentPermitNo ?? "",
        residentPermitExpirationDate:
            initialData?.InternationalNonTeachingStaffProfile
                ?.residentPermitExpirationDate ?? undefined,
        residentPermitAttachment:
            initialData?.InternationalNonTeachingStaffProfile
                ?.residentPermitAttachment ?? undefined,
        passportNo:
            initialData?.InternationalNonTeachingStaffProfile?.passportNo ?? "",
        passportExpirationDate:
            initialData?.InternationalNonTeachingStaffProfile
                ?.passportExpirationDate ?? undefined,
        passportAttachment:
            initialData?.InternationalNonTeachingStaffProfile
                ?.passportAttachment ?? undefined,
    };
    const RESIDENT_TEACHING_STAFF_FIELDS = {
        nationalIdNo:
            initialData?.residentTeachingStaffProfile?.nationalIdNo ?? "",
        nationalIdAttachment:
            initialData?.residentTeachingStaffProfile?.nationalIdAttachment ??
            undefined,
        nssfNo: initialData?.residentTeachingStaffProfile?.nssfNo ?? "",
        nssfAttachment:
            initialData?.residentTeachingStaffProfile?.nssfAttachment ?? "",
        tinNo: initialData?.residentTeachingStaffProfile?.tinNo ?? "",
        tinAttachment:
            initialData?.residentTeachingStaffProfile?.tinAttachment ??
            undefined,
        teachingLicenseNo:
            initialData?.residentTeachingStaffProfile?.teachingLicenseNo ?? "",
        teachingLicenseAttachment:
            initialData?.residentTeachingStaffProfile
                ?.teachingLicenseAttachment ?? undefined,
    };
    const RESIDENT_NON_TEACHING_STAFF_FIELDS = {
        nationalIdNo:
            initialData?.residentNonTeachingStaffProfile?.nationalIdNo ?? "",
        nationalIdAttachment:
            initialData?.residentNonTeachingStaffProfile
                ?.nationalIdAttachment ?? undefined,
        nssfNo: initialData?.residentNonTeachingStaffProfile?.nssfNo ?? "",
        nssfAttachment:
            initialData?.residentNonTeachingStaffProfile?.nssfAttachment ??
            undefined,
        tinNo: initialData?.residentNonTeachingStaffProfile?.tinNo ?? "",
        tinAttachment:
            initialData?.residentNonTeachingStaffProfile?.tinAttachment ??
            undefined,
    };

    const getDefaultStaffFields = (staffType: string, data?: any) => {
        const common = {
            staffType,
            staffId: data?.staffId ?? "",
            firstName: data?.firstName ?? "",
            middleName: data?.middleName ?? "",
            surname: data?.surname ?? "",
            gender: data?.gender ?? "male",
            dateOfBirth: data?.dateOfBirth ?? undefined,
            nationality: data?.nationality ?? "",
            designation: data?.designationId ?? "",
            dateOfEmployment: data?.dateOfEmployment ?? undefined,
            highestQualification: data?.highestQualification ?? "",
            yearsOfWorkExperience: data?.yearsOfWorkExperience ?? undefined,
            noOfYearsAtCCIS: data?.noOfYearsAtCCIS ?? undefined,
            resumeURL: data?.resumeURL ?? undefined,
            comment: data?.comment ?? "",
            emergencyContacts: data?.emergencyContacts?.length
                ? data.emergencyContacts.map((c: any) => ({
                      fullNames: c.fullNames ?? "",
                      relationship: c.relationship ?? "",
                      contactPhone: c.contactPhone ?? "",
                      whatsappNumber: c.whatsappNumber ?? "",
                  }))
                : [
                      {
                          fullNames: "",
                          relationship: "",
                          contactPhone: "",
                          whatsappNumber: "",
                      },
                  ],
        };

        const byType: Record<string, any> = {
            resident_teaching_staff: {
                nationalIdNo: data?.nationalIdNo ?? "",
                nationalIdAttachment: data?.nationalIdAttachment ?? undefined,
                nssfNo: data?.nssfNo ?? "",
                nssfAttachment: data?.nssfAttachment ?? "",
                tinNo: data?.tinNo ?? "",
                tinAttachment: data?.tinAttachment ?? undefined,
                teachingLicenseNo: data?.teachingLicenseNo ?? "",
                teachingLicenseAttachment:
                    data?.teachingLicenseAttachment ?? undefined,
            },
            resident_non_teaching_staff: {
                nationalIdNo: data?.nationalIdNo ?? "",
                nationalIdAttachment: data?.nationalIdAttachment ?? undefined,
                nssfNo: data?.nssfNo ?? "",
                nssfAttachment: data?.nssfAttachment ?? undefined,
                tinNo: data?.tinNo ?? "",
                tinAttachment: data?.tinAttachment ?? undefined,
            },
            international_teaching_staff: {
                tcuNo: data?.tcuNo ?? "",
                tcuAttachment: data?.tcuAttachment ?? undefined,
                teachingLicenseNo: data?.teachingLicenseNo ?? "",
                expirationDate: data?.expirationDate ?? undefined,
                teachingLicenseAttachment:
                    data?.teachingLicenseAttachment ?? undefined,
                workPermitNo: data?.workPermitNo ?? "",
                workPermitExpirationDate:
                    data?.workPermitExpirationDate ?? undefined,
                workPermitAttachment: data?.workPermitAttachment ?? undefined,
                residentPermitNo: data?.residentPermitNo ?? "",
                residentPermitExpirationDate:
                    data?.residentPermitExpirationDate ?? undefined,
                residentPermitAttachment:
                    data?.residentPermitAttachment ?? undefined,
                passportNo: data?.passportNo ?? "",
                passportExpirationDate:
                    data?.passportExpirationDate ?? undefined,
                passportAttachment: data?.passportAttachment ?? undefined,
            },
            international_non_teaching_staff: {
                workPermitNo: data?.workPermitNo ?? "",
                workPermitExpirationDate:
                    data?.workPermitExpirationDate ?? undefined,
                workPermitAttachment: data?.workPermitAttachment ?? undefined,
                residentPermitNo: data?.residentPermitNo ?? "",
                residentPermitExpirationDate:
                    data?.residentPermitExpirationDate ?? undefined,
                residentPermitAttachment:
                    data?.residentPermitAttachment ?? undefined,
                passportNo: data?.passportNo ?? "",
                passportExpirationDate:
                    data?.passportExpirationDate ?? undefined,
                passportAttachment: data?.passportAttachment ?? undefined,
            },
        };

        return {
            ...common,
            ...(byType[staffType] ?? {}),
        };
    };

    const router = useRouter();
    const form = useForm<z.infer<typeof staffFormSchema>>({
        resolver: zodResolver(staffFormSchema),
        defaultValues: {
            ...COMMON_FIELDS,
            ...RESIDENT_TEACHING_STAFF_FIELDS,
        },
    });

    const { watch, reset, getValues } = form;
    const staffType = watch("staffType");

    useEffect(() => {
        const currentValues = getValues();
        if (staffType === "resident_teaching_staff") {
            reset({
                ...currentValues,
                ...RESIDENT_TEACHING_STAFF_FIELDS,
            });
        } else if (staffType === "resident_non_teaching_staff") {
            reset({
                ...currentValues,
                ...RESIDENT_NON_TEACHING_STAFF_FIELDS,
            });
        } else if (staffType === "international_non_teaching_staff") {
            reset({
                ...currentValues,
                ...INTERNATIONAL_NON_TEACHING_STAFF_FIELDS,
            });
        } else if (staffType === "international_teaching_staff") {
            reset({
                ...currentValues,
                ...INTERNATIONAL_TEACHING_STAFF_FIELDS,
            });
        }
    }, [staffType]);

    const {
        fields: emergencyContactFields,
        append: appendEmergencyContact,
        remove: removeEmergencyContact,
    } = useFieldArray({
        control: form.control,
        name: "emergencyContacts",
    });

    const onSubmit = async (data: z.infer<typeof staffFormSchema>) => {
        setIsLoading(true);

        if (formType === "update") {
            if (!initialData) {
                return toast.error("Initial data is required");
            }

            const resumeURL =
                data.resumeURL &&
                (typeof data.resumeURL === "string"
                    ? data.resumeURL
                    : await uploadAndExtractUrl({
                          file: data.resumeURL,
                          fieldName: "resumeURL",
                          uploadFolder: UPLOAD_FOLDER.STAFF_RESUME,
                          form,
                          setSubmissionErrors,
                          setIsLoading,
                      }));

            let nationalIdAttachmentURL = "";
            let nssfAttachmentURL = "";
            let tinAttachmentURL = "";
            let teachingLicenseAttachmentURL = "";
            let workPermitAttachmentURL = "";
            let residentPermitAttachmentURL = "";
            let passportAttachmentURL = "";
            let tcuAttachmentURL = "";

            if (data.staffType === "resident_teaching_staff") {
                nationalIdAttachmentURL =
                    typeof data.nationalIdAttachment === "string"
                        ? data.nationalIdAttachment
                        : "";
                nationalIdAttachmentURL =
                    typeof data.nationalIdAttachment === "string"
                        ? data.nationalIdAttachment
                        : (data.nationalIdAttachment &&
                              (await uploadAndExtractUrl({
                                  file: data.nationalIdAttachment,
                                  fieldName: "nationalIdAttachment",
                                  uploadFolder: UPLOAD_FOLDER.STAFF_ID,
                                  form,
                                  setSubmissionErrors,
                                  setIsLoading,
                              }))) ??
                          "";
                nssfAttachmentURL =
                    typeof data.nssfAttachment === "string"
                        ? data.nssfAttachment
                        : "";
                nssfAttachmentURL =
                    typeof data.nssfAttachment === "string"
                        ? data.nssfAttachment
                        : (data.nssfAttachment &&
                              (await uploadAndExtractUrl({
                                  file: data.nssfAttachment,
                                  fieldName: "nssfAttachment",
                                  uploadFolder: UPLOAD_FOLDER.STAFF_NSSF,
                                  form,
                                  setSubmissionErrors,
                                  setIsLoading,
                              }))) ??
                          "";
                tinAttachmentURL =
                    typeof data.tinAttachment === "string"
                        ? data.tinAttachment
                        : "";
                tinAttachmentURL =
                    typeof data.tinAttachment === "string"
                        ? data.tinAttachment
                        : (data.tinAttachment &&
                              (await uploadAndExtractUrl({
                                  file: data.tinAttachment,
                                  fieldName: "tinAttachment",
                                  uploadFolder: UPLOAD_FOLDER.STAFF_TIN,
                                  form,
                                  setSubmissionErrors,
                                  setIsLoading,
                              }))) ??
                          "";
                teachingLicenseAttachmentURL =
                    typeof data.teachingLicenseAttachment === "string"
                        ? data.teachingLicenseAttachment
                        : "";
                teachingLicenseAttachmentURL =
                    typeof data.teachingLicenseAttachment === "string"
                        ? data.teachingLicenseAttachment
                        : (data.teachingLicenseAttachment &&
                              (await uploadAndExtractUrl({
                                  file: data.teachingLicenseAttachment,
                                  fieldName: "teachingLicenseAttachment",
                                  uploadFolder:
                                      UPLOAD_FOLDER.STAFF_TEACHING_LICENSE,
                                  form,
                                  setSubmissionErrors,
                                  setIsLoading,
                              }))) ??
                          "";
            } else if (data.staffType === "resident_non_teaching_staff") {
                nationalIdAttachmentURL =
                    typeof data.nationalIdAttachment === "string"
                        ? data.nationalIdAttachment
                        : "";
                nationalIdAttachmentURL =
                    typeof data.nationalIdAttachment === "string"
                        ? data.nationalIdAttachment
                        : (data.nationalIdAttachment &&
                              (await uploadAndExtractUrl({
                                  file: data.nationalIdAttachment,
                                  fieldName: "nationalIdAttachment",
                                  uploadFolder: UPLOAD_FOLDER.STAFF_ID,
                                  form,
                                  setSubmissionErrors,
                                  setIsLoading,
                              }))) ??
                          "";
                nssfAttachmentURL =
                    typeof data.nssfAttachment === "string"
                        ? data.nssfAttachment
                        : "";
                nssfAttachmentURL =
                    typeof data.nssfAttachment === "string"
                        ? data.nssfAttachment
                        : (data.nssfAttachment &&
                              (await uploadAndExtractUrl({
                                  file: data.nssfAttachment,
                                  fieldName: "nssfAttachment",
                                  uploadFolder: UPLOAD_FOLDER.STAFF_NSSF,
                                  form,
                                  setSubmissionErrors,
                                  setIsLoading,
                              }))) ??
                          "";
                tinAttachmentURL =
                    typeof data.tinAttachment === "string"
                        ? data.tinAttachment
                        : "";
                tinAttachmentURL =
                    typeof data.tinAttachment === "string"
                        ? data.tinAttachment
                        : (data.tinAttachment &&
                              (await uploadAndExtractUrl({
                                  file: data.tinAttachment,
                                  fieldName: "tinAttachment",
                                  uploadFolder: UPLOAD_FOLDER.STAFF_TIN,
                                  form,
                                  setSubmissionErrors,
                                  setIsLoading,
                              }))) ??
                          "";
            } else if (data.staffType === "international_teaching_staff") {
                tcuAttachmentURL =
                    typeof data.tcuAttachment === "string"
                        ? data.tcuAttachment
                        : "";
                tcuAttachmentURL =
                    typeof data.tcuAttachment === "string"
                        ? data.tcuAttachment
                        : (data.tcuAttachment &&
                              (await uploadAndExtractUrl({
                                  file: data.tcuAttachment,
                                  fieldName: "tcuAttachment",
                                  uploadFolder: UPLOAD_FOLDER.STAFF_TCU,
                                  form,
                                  setSubmissionErrors,
                                  setIsLoading,
                              }))) ??
                          "";
                teachingLicenseAttachmentURL =
                    typeof data.teachingLicenseAttachment === "string"
                        ? data.teachingLicenseAttachment
                        : "";
                teachingLicenseAttachmentURL =
                    typeof data.teachingLicenseAttachment === "string"
                        ? data.teachingLicenseAttachment
                        : (data.teachingLicenseAttachment &&
                              (await uploadAndExtractUrl({
                                  file: data.teachingLicenseAttachment,
                                  fieldName: "teachingLicenseAttachment",
                                  uploadFolder:
                                      UPLOAD_FOLDER.STAFF_TEACHING_LICENSE,
                                  form,
                                  setSubmissionErrors,
                                  setIsLoading,
                              }))) ??
                          "";
                workPermitAttachmentURL =
                    typeof data.workPermitAttachment === "string"
                        ? data.workPermitAttachment
                        : "";
                workPermitAttachmentURL =
                    typeof data.workPermitAttachment === "string"
                        ? data.workPermitAttachment
                        : (data.workPermitAttachment &&
                              (await uploadAndExtractUrl({
                                  file: data.workPermitAttachment,
                                  fieldName: "workPermitAttachment",
                                  uploadFolder: UPLOAD_FOLDER.STAFF_WORK_PERMIT,
                                  form,
                                  setSubmissionErrors,
                                  setIsLoading,
                              }))) ??
                          "";
                residentPermitAttachmentURL =
                    typeof data.residentPermitAttachment === "string"
                        ? data.residentPermitAttachment
                        : "";
                residentPermitAttachmentURL =
                    typeof data.residentPermitAttachment === "string"
                        ? data.residentPermitAttachment
                        : (data.residentPermitAttachment &&
                              (await uploadAndExtractUrl({
                                  file: data.residentPermitAttachment,
                                  fieldName: "residentPermitAttachment",
                                  uploadFolder:
                                      UPLOAD_FOLDER.STAFF_RESIDENT_PERMIT,
                                  form,
                                  setSubmissionErrors,
                                  setIsLoading,
                              }))) ??
                          "";
                passportAttachmentURL =
                    typeof data.passportAttachment === "string"
                        ? data.passportAttachment
                        : "";
                passportAttachmentURL =
                    typeof data.passportAttachment === "string"
                        ? data.passportAttachment
                        : (data.passportAttachment &&
                              (await uploadAndExtractUrl({
                                  file: data.passportAttachment,
                                  fieldName: "passportAttachment",
                                  uploadFolder: UPLOAD_FOLDER.STAFF_PASSPORT,
                                  form,
                                  setSubmissionErrors,
                                  setIsLoading,
                              }))) ??
                          "";
            } else if (data.staffType === "international_non_teaching_staff") {
                workPermitAttachmentURL =
                    typeof data.workPermitAttachment === "string"
                        ? data.workPermitAttachment
                        : "";
                workPermitAttachmentURL =
                    typeof data.workPermitAttachment === "string"
                        ? data.workPermitAttachment
                        : (data.workPermitAttachment &&
                              (await uploadAndExtractUrl({
                                  file: data.workPermitAttachment,
                                  fieldName: "workPermitAttachment",
                                  uploadFolder: UPLOAD_FOLDER.STAFF_WORK_PERMIT,
                                  form,
                                  setSubmissionErrors,
                                  setIsLoading,
                              }))) ??
                          "";
                residentPermitAttachmentURL =
                    typeof data.residentPermitAttachment === "string"
                        ? data.residentPermitAttachment
                        : "";
                residentPermitAttachmentURL =
                    typeof data.residentPermitAttachment === "string"
                        ? data.residentPermitAttachment
                        : (data.residentPermitAttachment &&
                              (await uploadAndExtractUrl({
                                  file: data.residentPermitAttachment,
                                  fieldName: "residentPermitAttachment",
                                  uploadFolder:
                                      UPLOAD_FOLDER.STAFF_RESIDENT_PERMIT,
                                  form,
                                  setSubmissionErrors,
                                  setIsLoading,
                              }))) ??
                          "";
                passportAttachmentURL =
                    typeof data.passportAttachment === "string"
                        ? data.passportAttachment
                        : "";
                passportAttachmentURL =
                    typeof data.passportAttachment === "string"
                        ? data.passportAttachment
                        : (data.passportAttachment &&
                              (await uploadAndExtractUrl({
                                  file: data.passportAttachment,
                                  fieldName: "passportAttachment",
                                  uploadFolder: UPLOAD_FOLDER.STAFF_PASSPORT,
                                  form,
                                  setSubmissionErrors,
                                  setIsLoading,
                              }))) ??
                          "";
            }

            const submittedData = {
                ...data,
                resumeURL,
                nationalIdAttachment: nationalIdAttachmentURL,
                nssfAttachment: nssfAttachmentURL,
                tinAttachment: tinAttachmentURL,
                teachingLicenseAttachment: teachingLicenseAttachmentURL,
                workPermitAttachment: workPermitAttachmentURL,
                residentPermitAttachment: residentPermitAttachmentURL,
                passportAttachment: passportAttachmentURL,
                tcuAttachment: tcuAttachmentURL,
            };

            const updateRes = await updateStaff(initialData.id, submittedData);
            if (updateRes.success) {
                toast.success("Staff updated successfully");
                router.push("/staff/list");
                router.push(`/staff/view/${initialData.id}`);
            } else {
                setSubmissionErrors((prev) => [updateRes.error as string]);
                toast.error("Error updating staff");
            }

            setIsLoading(false);
        } else if (formType === "add") {
            const resumeURL =
                data.resumeURL &&
                (await uploadAndExtractUrl({
                    file: data.resumeURL,
                    fieldName: "resumeURL",
                    uploadFolder: UPLOAD_FOLDER.STAFF_RESUME,
                    form,
                    setSubmissionErrors,
                    setIsLoading,
                }));
            let nationalIdAttachmentURL = "";
            let nssfAttachmentURL = "";
            let tinAttachmentURL = "";
            let teachingLicenseAttachmentURL = "";
            let workPermitAttachmentURL = "";
            let residentPermitAttachmentURL = "";
            let passportAttachmentURL = "";
            let tcuAttachmentURL = "";

            if (data.staffType === "resident_teaching_staff") {
                nationalIdAttachmentURL =
                    (data.nationalIdAttachment &&
                        (await uploadAndExtractUrl({
                            file: data.nationalIdAttachment,
                            fieldName: "nationalIdAttachment",
                            uploadFolder: UPLOAD_FOLDER.STAFF_ID,
                            form,
                            setSubmissionErrors,
                            setIsLoading,
                        }))) ??
                    "";
                nssfAttachmentURL =
                    (data.nssfAttachment &&
                        (await uploadAndExtractUrl({
                            file: data.nssfAttachment,
                            fieldName: "nssfAttachment",
                            uploadFolder: UPLOAD_FOLDER.STAFF_NSSF,
                            form,
                            setSubmissionErrors,
                            setIsLoading,
                        }))) ??
                    "";
                tinAttachmentURL =
                    (data.tinAttachment &&
                        (await uploadAndExtractUrl({
                            file: data.tinAttachment,
                            fieldName: "tinAttachment",
                            uploadFolder: UPLOAD_FOLDER.STAFF_TIN,
                            form,
                            setSubmissionErrors,
                            setIsLoading,
                        }))) ??
                    "";
                teachingLicenseAttachmentURL =
                    (data.teachingLicenseAttachment &&
                        (await uploadAndExtractUrl({
                            file: data.teachingLicenseAttachment,
                            fieldName: "teachingLicenseAttachment",
                            uploadFolder: UPLOAD_FOLDER.STAFF_TEACHING_LICENSE,
                            form,
                            setSubmissionErrors,
                            setIsLoading,
                        }))) ??
                    "";
            } else if (data.staffType === "resident_non_teaching_staff") {
                nationalIdAttachmentURL =
                    (data.nationalIdAttachment &&
                        (await uploadAndExtractUrl({
                            file: data.nationalIdAttachment,
                            fieldName: "nationalIdAttachment",
                            uploadFolder: UPLOAD_FOLDER.STAFF_ID,
                            form,
                            setSubmissionErrors,
                            setIsLoading,
                        }))) ??
                    "";
                nssfAttachmentURL =
                    (data.nssfAttachment &&
                        (await uploadAndExtractUrl({
                            file: data.nssfAttachment,
                            fieldName: "nssfAttachment",
                            uploadFolder: UPLOAD_FOLDER.STAFF_NSSF,
                            form,
                            setSubmissionErrors,
                            setIsLoading,
                        }))) ??
                    "";
                tinAttachmentURL =
                    (data.tinAttachment &&
                        (await uploadAndExtractUrl({
                            file: data.tinAttachment,
                            fieldName: "tinAttachment",
                            uploadFolder: UPLOAD_FOLDER.STAFF_TIN,
                            form,
                            setSubmissionErrors,
                            setIsLoading,
                        }))) ??
                    "";
            } else if (data.staffType === "international_teaching_staff") {
                tcuAttachmentURL =
                    (data.tcuAttachment &&
                        (await uploadAndExtractUrl({
                            file: data.tcuAttachment,
                            fieldName: "tcuAttachment",
                            uploadFolder: UPLOAD_FOLDER.STAFF_TCU,
                            form,
                            setSubmissionErrors,
                            setIsLoading,
                        }))) ??
                    "";
                teachingLicenseAttachmentURL =
                    (data.teachingLicenseAttachment &&
                        (await uploadAndExtractUrl({
                            file: data.teachingLicenseAttachment,
                            fieldName: "teachingLicenseAttachment",
                            uploadFolder: UPLOAD_FOLDER.STAFF_TEACHING_LICENSE,
                            form,
                            setSubmissionErrors,
                            setIsLoading,
                        }))) ??
                    "";
                workPermitAttachmentURL =
                    (data.workPermitAttachment &&
                        (await uploadAndExtractUrl({
                            file: data.workPermitAttachment,
                            fieldName: "workPermitAttachment",
                            uploadFolder: UPLOAD_FOLDER.STAFF_WORK_PERMIT,
                            form,
                            setSubmissionErrors,
                            setIsLoading,
                        }))) ??
                    "";
                residentPermitAttachmentURL =
                    (data.residentPermitAttachment &&
                        (await uploadAndExtractUrl({
                            file: data.residentPermitAttachment,
                            fieldName: "residentPermitAttachment",
                            uploadFolder: UPLOAD_FOLDER.STAFF_RESIDENT_PERMIT,
                            form,
                            setSubmissionErrors,
                            setIsLoading,
                        }))) ??
                    "";
                passportAttachmentURL =
                    (data.passportAttachment &&
                        (await uploadAndExtractUrl({
                            file: data.passportAttachment,
                            fieldName: "passportAttachment",
                            uploadFolder: UPLOAD_FOLDER.STAFF_PASSPORT,
                            form,
                            setSubmissionErrors,
                            setIsLoading,
                        }))) ??
                    "";
            } else if (data.staffType === "international_non_teaching_staff") {
                workPermitAttachmentURL =
                    (data.workPermitAttachment &&
                        (await uploadAndExtractUrl({
                            file: data.workPermitAttachment,
                            fieldName: "workPermitAttachment",
                            uploadFolder: UPLOAD_FOLDER.STAFF_WORK_PERMIT,
                            form,
                            setSubmissionErrors,
                            setIsLoading,
                        }))) ??
                    "";
                residentPermitAttachmentURL =
                    (data.residentPermitAttachment &&
                        (await uploadAndExtractUrl({
                            file: data.residentPermitAttachment,
                            fieldName: "residentPermitAttachment",
                            uploadFolder: UPLOAD_FOLDER.STAFF_RESIDENT_PERMIT,
                            form,
                            setSubmissionErrors,
                            setIsLoading,
                        }))) ??
                    "";
                passportAttachmentURL =
                    (data.passportAttachment &&
                        (await uploadAndExtractUrl({
                            file: data.passportAttachment,
                            fieldName: "passportAttachment",
                            uploadFolder: UPLOAD_FOLDER.STAFF_PASSPORT,
                            form,
                            setSubmissionErrors,
                            setIsLoading,
                        }))) ??
                    "";
            }

            const submittedData = {
                ...data,
                resumeURL,
                nationalIdAttachment: nationalIdAttachmentURL,
                nssfAttachment: nssfAttachmentURL,
                tinAttachment: tinAttachmentURL,
                teachingLicenseAttachment: teachingLicenseAttachmentURL,
                workPermitAttachment: workPermitAttachmentURL,
                residentPermitAttachment: residentPermitAttachmentURL,
                passportAttachment: passportAttachmentURL,
                tcuAttachment: tcuAttachmentURL,
            };

            const addStaffRes = await addStaff(submittedData);
            if (addStaffRes.success) {
                toast.success("Staff added successfully");
                setIsLoading(false);
                form.reset();
                router.push("/staff/list");
            } else {
                setIsLoading(false);
                setSubmissionErrors((prev) => [addStaffRes.error as string]);
                toast.error("Error adding staff");
            }
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="">
                <CardTitle className="text-xl">Staff Registration</CardTitle>
                <CardDescription>
                    Fill in the staff details below
                </CardDescription>
            </div>
            {submissionErrors.length > 0 && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error Adding Student</AlertTitle>
                    <AlertDescription>
                        <ul className="list-disc list-inside text-red-600">
                            {submissionErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            )}
            <div className="mt-4">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className=" space-y-6"
                    >
                        {/* ------General staff information section----- */}
                        <Card>
                            <CardHeader>
                                <CardTitle>General staff information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* staff id  */}
                                    <TextInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="staffId"
                                        label="Staff Id*"
                                        placeholder="Enter registration number"
                                        type="text"
                                    />
                                    {/* first name  */}
                                    <TextInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="firstName"
                                        label="First Name*"
                                        placeholder="Enter first name"
                                        type="text"
                                    />
                                    {/* middle name  */}
                                    <TextInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="middleName"
                                        label="Middle Name*"
                                        placeholder="Enter middle name"
                                        type="text"
                                    />
                                    {/* surname */}
                                    <TextInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="surname"
                                        label="Surname*"
                                        placeholder="Enter surname"
                                        type="text"
                                    />
                                    {/* gender  */}
                                    <SelectInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="gender"
                                        label="Gender*"
                                        placeholder="Select Gender"
                                        options={Object.values(Gender).map(
                                            (item) => {
                                                return {
                                                    label: item,
                                                    value: item,
                                                };
                                            }
                                        )}
                                    />
                                    {/* date of birth */}
                                    <DateInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="dateOfBirth"
                                        label="Date of Birth*"
                                        placeholder="Select date of birth"
                                    />
                                    {/* nationality */}
                                    <TextInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="nationality"
                                        label="Nationality"
                                        placeholder="Nationality"
                                    />

                                    {/* designation */}
                                    <SelectInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="designation"
                                        label="Designation"
                                        placeholder="Select designation"
                                        options={
                                            // check if the array of academicYears is empty first then loop
                                            staffDesignations.length > 0
                                                ? staffDesignations.map(
                                                      (item) => ({
                                                          label: item.name,
                                                          value: item.id,
                                                      })
                                                  )
                                                : []
                                        }
                                    />
                                    {/* date of employment */}
                                    <DateInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="dateOfEmployment"
                                        label="Date of employment*"
                                        placeholder="Select date of employment"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        {/* ------qualification section----- */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Qualification</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* highest qualification  */}
                                    <SelectInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="highestQualification"
                                        label="Highest Qualification*"
                                        placeholder="Select qualification"
                                        options={STAFF_QUALIFICATIONS.map(
                                            (item) => {
                                                return {
                                                    label: item,
                                                    value: item,
                                                };
                                            }
                                        )}
                                    />

                                    {/* work experience years   */}
                                    <TextInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="yearsOfWorkExperience"
                                        label="Work experience years*"
                                        placeholder=""
                                        type="number"
                                    />
                                    {/* number of years at CCIS */}
                                    <TextInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="noOfYearsAtCCIS"
                                        label="Number of years at CCIS*"
                                        placeholder=""
                                        type="number"
                                    />
                                    {/* resume attachment  */}
                                    <FileInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name={"resumeURL"}
                                        label="Resume (attachment)*"
                                        placeholder="Upload resume file"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        {/* button to select the staff type */}
                        <Card className="p-4">
                            {/* staffType */}
                            <SelectInput
                                disabled={isLoading}
                                control={form.control}
                                name="staffType"
                                label="Staff Type*"
                                formDescription="Select the type of staff international or resident"
                                placeholder="Select staff type"
                                options={[
                                    {
                                        label: "Resident teaching staff",
                                        value: "resident_teaching_staff",
                                    },
                                    {
                                        label: "International teaching staff",
                                        value: "international_teaching_staff",
                                    },
                                    {
                                        label: "Resident non-teaching staff",
                                        value: "resident_non_teaching_staff",
                                    },
                                    {
                                        label: "International non-teaching staff",
                                        value: "international_non_teaching_staff",
                                    },
                                ]}
                            />
                        </Card>
                        {/* watch stafftype */}
                        {staffType === "resident_teaching_staff" && (
                            <>
                                {/* ------resident teaching staff section----- */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Resident Teaching staff
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* national id no */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="nationalIdNo"
                                                label="National ID No*"
                                                placeholder="Enter national id no"
                                                type="text"
                                            />
                                            {/* national id attachment */}
                                            <FileInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="nationalIdAttachment"
                                                label="National ID Attachment*"
                                                placeholder="Upload national id attachment"
                                            />
                                            {/* nssf no */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="nssfNo"
                                                label="NSSF No*"
                                                placeholder="Enter nssf no"
                                                type="text"
                                            />
                                            {/* nssf attachment */}
                                            <FileInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="nssfAttachment"
                                                label="NSSF Attachment*"
                                                placeholder="Upload nssf attachment"
                                            />
                                            {/* tin no */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="tinNo"
                                                label="TIN No*"
                                                placeholder="Enter tin no"
                                                type="text"
                                            />
                                            {/* tin attachment */}
                                            <FileInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="tinAttachment"
                                                label="TIN Attachment*"
                                                placeholder="Upload tin attachment"
                                            />
                                            {/* teaching license no */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="teachingLicenseNo"
                                                label="Teaching License No*"
                                                placeholder="Enter teaching license no"
                                                type="text"
                                            />
                                            {/* teaching license attachment */}
                                            <FileInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="teachingLicenseAttachment"
                                                label="Teaching License Attachment*"
                                                placeholder="Upload teaching license attachment"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        )}

                        {staffType === "resident_non_teaching_staff" && (
                            <>
                                {/* ------resident non-teaching staff section----- */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Resident Non-Teaching Staff
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {/* National ID No */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="nationalIdNo"
                                                label="National ID No*"
                                                placeholder="Enter National ID No"
                                                type="text"
                                            />
                                            {/* National ID Attachment */}
                                            <FileInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="nationalIdAttachment"
                                                label="National ID Attachment*"
                                                placeholder="Upload National ID Attachment"
                                            />
                                            {/* NSSF No */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="nssfNo"
                                                label="NSSF No*"
                                                placeholder="Enter NSSF No"
                                                type="text"
                                            />
                                            {/* NSSF Attachment */}
                                            <FileInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="nssfAttachment"
                                                label="NSSF Attachment*"
                                                placeholder="Upload NSSF Attachment"
                                            />
                                            {/* TIN No */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="tinNo"
                                                label="TIN No*"
                                                placeholder="Enter TIN No"
                                                type="text"
                                            />
                                            {/* TIN Attachment */}
                                            <FileInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="tinAttachment"
                                                label="TIN Attachment*"
                                                placeholder="Upload TIN Attachment"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        )}

                        {staffType === "international_non_teaching_staff" && (
                            <>
                                {/* ------international non-teaching staff section----- */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            International Non-Teaching Staff
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {/* Work Permit No */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="workPermitNo"
                                                label="Work Permit No*"
                                                placeholder="Enter work permit no"
                                                type="text"
                                            />
                                            {/* Work Permit Expiration Date */}
                                            <DateInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="workPermitExpirationDate"
                                                label="Work Permit Expiration Date*"
                                                placeholder="Select work permit expiration date"
                                            />
                                            {/* Work Permit Attachment */}
                                            <FileInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="workPermitAttachment"
                                                label="Work Permit Attachment*"
                                                placeholder="Upload work permit attachment"
                                            />

                                            {/* Resident Permit No */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="residentPermitNo"
                                                label="Resident Permit No*"
                                                placeholder="Enter resident permit no"
                                                type="text"
                                            />
                                            {/* Resident Permit Expiration Date */}
                                            <DateInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="residentPermitExpirationDate"
                                                label="Resident Permit Expiration Date*"
                                                placeholder="Select resident permit expiration date"
                                            />
                                            {/* Resident Permit Attachment */}
                                            <FileInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="residentPermitAttachment"
                                                label="Resident Permit Attachment*"
                                                placeholder="Upload resident permit attachment"
                                            />

                                            {/* Passport No */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="passportNo"
                                                label="Passport No*"
                                                placeholder="Enter passport no"
                                                type="text"
                                            />
                                            {/* Passport Expiration Date */}
                                            <DateInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="passportExpirationDate"
                                                label="Passport Expiration Date*"
                                                placeholder="Select passport expiration date"
                                            />
                                            {/* Passport Attachment */}
                                            <FileInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="passportAttachment"
                                                label="Passport Attachment*"
                                                placeholder="Upload passport attachment"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        )}

                        {staffType === "international_teaching_staff" && (
                            <>
                                {/* ------international teaching staff section----- */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            International Teaching staff
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            {/* tcu no */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="tcuNo"
                                                label="TCU No*"
                                                placeholder="Enter tcu no"
                                                type="text"
                                            />
                                            {/* tcu attachment */}
                                            <FileInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="tcuAttachment"
                                                label="TCU Attachment*"
                                                placeholder="Upload tcu attachment"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {/* teaching license */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="teachingLicenseNo"
                                                label="Teaching License No*"
                                                placeholder="Enter teaching license no"
                                                type="text"
                                            />
                                            {/* teaching license attachment */}
                                            <FileInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="teachingLicenseAttachment"
                                                label="Teaching License Attachment*"
                                                placeholder="Upload teaching license attachment"
                                            />
                                            {/* expiration date */}
                                            <DateInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="expirationDate"
                                                label="Expiration Date*"
                                                placeholder="Select expiration date"
                                            />
                                            {/* work permit */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="workPermitNo"
                                                label="Work Permit No*"
                                                placeholder="Enter work permit no"
                                                type="text"
                                            />
                                            {/* work permit expiration date */}
                                            <DateInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="workPermitExpirationDate"
                                                label="Work Permit Expiration Date*"
                                                placeholder="Select work permit expiration date"
                                            />
                                            {/* work permit attachment */}
                                            <FileInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="workPermitAttachment"
                                                label="Work Permit Attachment*"
                                                placeholder="Upload work permit attachment"
                                            />
                                            {/* resident permit */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="residentPermitNo"
                                                label="Resident Permit No*"
                                                placeholder="Enter resident permit no"
                                                type="text"
                                            />
                                            {/* resident permit expiration date */}
                                            <DateInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="residentPermitExpirationDate"
                                                label="Resident Permit Expiration Date*"
                                                placeholder="Select resident permit expiration date"
                                            />
                                            {/* resident permit attachment */}
                                            <FileInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="residentPermitAttachment"
                                                label="Resident Permit Attachment*"
                                                placeholder="Upload resident permit attachment"
                                            />
                                            {/* passport */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="passportNo"
                                                label="Passport No*"
                                                placeholder="Enter passport no"
                                            />
                                            {/* passport expiration date */}
                                            <DateInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="passportExpirationDate"
                                                label="Passport Expiration Date*"
                                                placeholder="Select passport expiration date"
                                            />
                                            {/* passport attachment */}
                                            <FileInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name="passportAttachment"
                                                label="Passport Attachment*"
                                                placeholder="Upload passport attachment"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        )}

                        {/* ------emergency contacts information section----- */}
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Emergency Contact Information
                                </CardTitle>
                                <CardDescription>
                                    You can add more by clicking the{" "}
                                    <span className="italic">
                                        Add Emergency Contact
                                    </span>{" "}
                                    button.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {emergencyContactFields.map(
                                    (contact, index) => (
                                        <Card key={contact.id} className="mb-4">
                                            <CardHeader className="flex justify-between">
                                                <div className="flex items-center justify-between">
                                                    <CardTitle>
                                                        Emergency Contact #
                                                        {index + 1}
                                                    </CardTitle>
                                                    <div>
                                                        {emergencyContactFields.length >
                                                            1 && (
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                onClick={() =>
                                                                    removeEmergencyContact(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <Trash className="mr-2 h-4 w-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* full names */}
                                                <TextInput
                                                    disabled={isLoading}
                                                    control={form.control}
                                                    name={`emergencyContacts.${index}.fullNames`}
                                                    label="Full Names*"
                                                    placeholder="Enter full names"
                                                    type="text"
                                                />
                                                {/* relationship */}
                                                <TextInput
                                                    disabled={isLoading}
                                                    control={form.control}
                                                    name={`emergencyContacts.${index}.relationship`}
                                                    label="Relationship*"
                                                    placeholder="Enter relationship"
                                                    type="text"
                                                />
                                                {/* contact phone */}
                                                <TextInput
                                                    disabled={isLoading}
                                                    control={form.control}
                                                    name={`emergencyContacts.${index}.contactPhone`}
                                                    label="Contact Phone*"
                                                    placeholder="Enter contact phone"
                                                    // type="number"
                                                />
                                                {/* whatsapp number */}
                                                <TextInput
                                                    disabled={isLoading}
                                                    control={form.control}
                                                    name={`emergencyContacts.${index}.whatsappNumber`}
                                                    label="Whatsapp Number"
                                                    placeholder="Enter whatsapp number"
                                                    // type="number"
                                                />
                                            </CardContent>
                                        </Card>
                                    )
                                )}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        appendEmergencyContact({
                                            fullNames: "",
                                            relationship: "",
                                            contactPhone: "",
                                            whatsappNumber: "",
                                        })
                                    }
                                >
                                    Add Emergency Contact
                                </Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Comment</CardTitle>
                                <CardDescription>
                                    <TextareaInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="comment"
                                        label="Comment"
                                        placeholder="Enter comment"
                                        rows={3}
                                    />
                                </CardDescription>
                            </CardHeader>
                            <CardContent></CardContent>
                        </Card>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            onClick={() => {
                                console.log(form.formState.errors);
                            }}
                        >
                            {formType === "update" ? (
                                <>{isLoading ? "Updating..." : "Update"}</>
                            ) : (
                                <>
                                    {isLoading
                                        ? "Submitting..."
                                        : "Submit Registration"}
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};
