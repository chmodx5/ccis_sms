"use client";

import { z } from "zod";
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
import {
    bloodGroupsSchema,
    dateSchema,
    genderSchema,
    imageFileSchema,
    phoneNumberSchema,
    religionsSchema,
    scannedDocumentSchema,
    StudentFormSchema,
} from "./schemas";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "../form/text-input";
import { SelectInput } from "../form/select-input";
import { DateInput } from "../form/date-input";
import {
    ACADEMIC_YEARS,
    BLOOD_GROUPS,
    CLASSES,
    GENDERS,
    PREFERRED_CONTACT_METHODS,
    RELATIONSHIPS,
    RELIGIONS,
    UPLOAD_FOLDER,
} from "@/site-config";
import { TextareaInput } from "../form/textarea-input";
import { CheckboxInput } from "../form/checkbox-input";
import { AlertCircle, Trash } from "lucide-react";
import { FileInput } from "../form/file-input";
import { ImageInput } from "../form/image-input";
import { uploadFile } from "@/lib/actions/upload-file";
import {
    AcademicYear,
    Class,
    Gender,
    GuardianRelationship,
    PreferredContact,
} from "@prisma/client";
import { addStudent } from "@/lib/actions/student/add-student";
import { toast } from "sonner";
import { useState } from "react";
import { format, isSunday, set } from "date-fns";
import { GetStudentResultStudent } from "@/lib/actions/student/get-student";
import { uploadAndExtractUrl } from "@/utils/handle-file-upload";
import { updateStudent } from "@/lib/actions/student/update-student";
import { useRouter } from "next/navigation";

interface Props {
    formType: "add" | "update";
    classes: Class[];
    academicYears: AcademicYear[];
    initialData?: GetStudentResultStudent;
}

export const StudentForm: React.FC<Props> = ({
    classes,
    academicYears,
    formType,
    initialData,
}) => {
    const [submissionErrors, setSubmissionErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof StudentFormSchema>>({
        resolver: zodResolver(StudentFormSchema),
        defaultValues:
            initialData == undefined
                ? {
                      // academic information
                      academicYear: "",
                      dateOfAdmission: new Date(),
                      class: "",
                      registrationNo: "",
                      // personal information
                      firstName: "",
                      middleName: "",
                      surname: "",
                      preferredName: "",
                      nationality: "",
                      dateOfBirth: new Date(),
                      gender: undefined,
                      religion: undefined,
                      // parent or guardian information
                      guardians: [
                          {
                              relationship: undefined,
                              fullName: "",
                              occupation: "",
                              residentialAddress: "",
                              contactPhone: "",
                              whatsappNumber: "",
                              emailAddress: undefined,
                              preferredContact: undefined,
                          },
                      ],
                      // documents
                      studentPhoto: undefined,
                      // birth certificate
                      birthCertificatNo: "",
                      birthCertificateFile: undefined,
                      // passport
                      passportNo: "",
                      expiryDate: new Date(),
                      passportFile: undefined,
                      // student pass
                      studentPassNo: "",
                      dateOfExpiry: new Date(),
                      studentPassFile: undefined,
                      // former school:
                      nameOfSchool: "",
                      location: "",
                      reasonForExit: "",
                      recentReportFile: undefined,
                      // general information
                      bloodType: undefined,
                      whoLivesWithStudentAtHome: "",
                      primaryLanguageAtHome: "",
                      otherChildrenAtCCIS: undefined,
                      referredByCurrentFamily: undefined,
                      permissionForSocialMediaPhotos: undefined,
                      specialInformation: "",
                      medicalConditions: "",
                      feesContribution: undefined,
                      feesContributionPercentage: 0,
                      // emergency contacts
                      emergencyContacts: [
                          {
                              fullNames: "",
                              relationship: "",
                              contactPhone: "",
                              whatsappNumber: "",
                          },
                      ],
                      // doctor
                      doctors: [
                          {
                              fullNames: "",
                              contactPhone: "",
                          },
                      ],
                  }
                : {
                      // academic information
                      academicYear: initialData?.academicYearId,
                      dateOfAdmission:
                          initialData?.dateOfAdmission &&
                          initialData?.dateOfAdmission,
                      class: initialData?.classId,
                      registrationNo: initialData?.registrationNo,
                      // personal information
                      firstName: initialData?.firstName,
                      middleName: initialData?.middleName,
                      surname: initialData?.surname,
                      preferredName: initialData?.preferredName ?? "",
                      nationality: initialData?.nationality,
                      dateOfBirth:
                          initialData?.dateOfBirth && initialData?.dateOfBirth,
                      gender: initialData?.gender ?? "",
                      religion: initialData?.religion ?? "",
                      // parent or guardian information
                      guardians:
                          initialData?.guardians &&
                          initialData?.guardians.length > 0
                              ? initialData.guardians.map((item) => ({
                                    relationship: item.relationship,
                                    fullName: item.fullName,
                                    occupation: item.occupation,
                                    residentialAddress: item.residentialAddress,
                                    contactPhone: item.contactPhone,
                                    whatsappNumber: item.whatsappNumber ?? "",
                                    emailAddress:
                                        item.emailAddress ?? undefined,
                                    preferredContact:
                                        item.preferredContact ?? undefined,
                                }))
                              : [
                                    {
                                        relationship: undefined,
                                        fullName: "",
                                        occupation: "",
                                        residentialAddress: "",
                                        contactPhone: "",
                                        whatsappNumber: "",
                                        emailAddress: undefined,
                                        preferredContact: undefined,
                                    },
                                ],
                      // documents
                      studentPhoto: initialData?.studentPhoto
                          ? initialData.studentPhoto
                          : undefined,
                      // birth certificate
                      birthCertificatNo: initialData?.birthCertificatNo,
                      birthCertificateFile:
                          initialData?.birthCertificateFile ?? undefined,
                      // passport
                      passportNo: initialData?.passportNo ?? "",
                      expiryDate: initialData?.expiryDate
                          ? initialData?.expiryDate
                          : new Date(),
                      passportFile: initialData?.passportFile ?? undefined,
                      // student pass
                      studentPassNo: initialData?.studentPassNo ?? "",
                      dateOfExpiry: initialData?.dateOfExpiry
                          ? initialData?.dateOfExpiry
                          : new Date(),
                      studentPassFile:
                          initialData?.studentPassFile ?? undefined,
                      // former school:
                      nameOfSchool: initialData?.nameOfSchool ?? "",
                      location: initialData?.location ?? "",
                      reasonForExit: initialData?.reasonForExit ?? "",
                      recentReportFile:
                          initialData?.recentReportFile ?? undefined,
                      // general information
                      bloodType: initialData?.bloodType ?? undefined,
                      whoLivesWithStudentAtHome:
                          initialData?.whoLivesWithStudentAtHome ?? "",
                      primaryLanguageAtHome:
                          initialData?.primaryLanguageAtHome ?? "",
                      otherChildrenAtCCIS:
                          initialData?.otherChildrenAtCCIS ?? undefined,
                      referredByCurrentFamily:
                          initialData?.referredByCurrentFamily ?? undefined,
                      permissionForSocialMediaPhotos:
                          initialData?.permissionForSocialMediaPhotos ??
                          undefined,
                      specialInformation: initialData?.specialInformation ?? "",
                      medicalConditions: initialData?.medicalConditions ?? "",
                      feesContribution:
                          initialData?.feesContribution ?? undefined,
                      feesContributionPercentage:
                          initialData?.feesContributionPercentage ?? 0,
                      // emergency contacts
                      emergencyContacts:
                          initialData?.emergencyContacts &&
                          initialData?.emergencyContacts.length > 0
                              ? initialData.emergencyContacts.map((item) => ({
                                    fullNames: item?.fullNames ?? "",
                                    relationship:
                                        item?.relationship ?? undefined,
                                    contactPhone: item?.contactPhone ?? "",
                                    whatsappNumber: item?.whatsappNumber ?? "",
                                }))
                              : [
                                    {
                                        fullNames: "",
                                        relationship: "",
                                        contactPhone: "",
                                        whatsappNumber: "",
                                    },
                                ],
                      doctors:
                          initialData?.doctors &&
                          initialData?.doctors.length > 0
                              ? initialData.doctors.map((item) => ({
                                    fullNames: item?.fullNames ?? "",
                                    contactPhone: item?.contactPhone ?? "",
                                }))
                              : [
                                    {
                                        fullNames: "",
                                        contactPhone: "",
                                    },
                                ],
                  },
    });

    const {
        fields: guardianFields,
        append: appendGuardian,
        remove: removeGuardian,
    } = useFieldArray({
        control: form.control,
        name: "guardians",
    });
    const {
        fields: emergencyContactFields,
        append: appendEmergencyContact,
        remove: removeEmergencyContact,
    } = useFieldArray({
        control: form.control,
        name: "emergencyContacts",
    });
    const {
        fields: doctorFields,
        append: appendDoctor,
        remove: removeDoctor,
    } = useFieldArray({
        control: form.control,
        name: "doctors",
    });

    const onSubmit = async (data: z.infer<typeof StudentFormSchema>) => {
        setSubmissionErrors([]);
        setIsLoading(true);

        // if there is initial data then we update else we create
        if (formType === "update") {
            const studentId = initialData?.id;
            if (!studentId) {
                toast.error("Student ID is required");
                setIsLoading(false);
                return;
            }
            // upload student photo
            const studentPhotoUrl =
                data.studentPhoto instanceof File
                    ? await uploadAndExtractUrl({
                          file: data.studentPhoto,
                          fieldName: "studentPhoto",
                          uploadFolder: UPLOAD_FOLDER.STUDENT_PHOTO,
                          form,
                          setSubmissionErrors,
                          setIsLoading,
                      })
                    : data.studentPhoto;

            //  upload birth certifivate
            const birthCertificateUrl =
                data.birthCertificateFile instanceof File
                    ? await uploadAndExtractUrl({
                          file: data.birthCertificateFile,
                          fieldName: "birthCertificateFile",
                          uploadFolder: UPLOAD_FOLDER.STUDENT_BIRTH_CERTIFICATE,
                          form,
                          setSubmissionErrors,
                          setIsLoading,
                      })
                    : data.birthCertificateFile;
            // upload passport file
            const passportUrl =
                data.passportFile instanceof File
                    ? await uploadAndExtractUrl({
                          file: data.passportFile,
                          fieldName: "passportFile",
                          uploadFolder: UPLOAD_FOLDER.STUDENT_PASSPORT,
                          form,
                          setSubmissionErrors,
                          setIsLoading,
                      })
                    : data.passportFile;
            // upload student pass file
            const studentPassFileUrl =
                data.studentPassFile instanceof File
                    ? await uploadAndExtractUrl({
                          file: data.studentPassFile,
                          fieldName: "studentPassFile",
                          uploadFolder: UPLOAD_FOLDER.STUDENT_PASS,
                          form,
                          setSubmissionErrors,
                          setIsLoading,
                      })
                    : data.studentPassFile;
            // upload recent report file
            const reportUrl =
                data.recentReportFile instanceof File
                    ? await uploadAndExtractUrl({
                          file: data.recentReportFile,
                          fieldName: "recentReportFile",
                          uploadFolder:
                              UPLOAD_FOLDER.STUDENT_FORMER_SCHOOOL_REPORT_CARD,
                          form,
                          setSubmissionErrors,
                          setIsLoading,
                      })
                    : data.recentReportFile;

            const submittedData = {
                ...data,
                studentPhoto: studentPhotoUrl ?? "",
                birthCertificateFile: birthCertificateUrl ?? "",
                passportFile: passportUrl ?? "",
                studentPassFile: studentPassFileUrl ?? "",
                recentReportFile: reportUrl ?? "",
            };

            const updateStudentRes = await updateStudent(
                studentId,
                submittedData as z.infer<typeof StudentFormSchema>
            );
            if (!updateStudentRes.success) {
                toast.error("Error updating student");
                setSubmissionErrors((prev) => [
                    ...prev,
                    updateStudentRes.error as string,
                ]);
            } else {
                toast.success("Student updated successfully");
                setIsLoading(false);
                router.push(`/students/view/${studentId}`);
            }
        } else if (formType === "add") {
            // upload student photo
            const studentPhotoUrl = await uploadAndExtractUrl({
                file: data.studentPhoto,
                fieldName: "studentPhoto",
                uploadFolder: UPLOAD_FOLDER.STUDENT_PHOTO,
                form,
                setSubmissionErrors,
                setIsLoading,
            });
            //  upload birth certifivate
            const birthCertificateUrl = await uploadAndExtractUrl({
                file: data.birthCertificateFile,
                fieldName: "birthCertificateFile",
                uploadFolder: UPLOAD_FOLDER.STUDENT_BIRTH_CERTIFICATE,
                form,
                setSubmissionErrors,
                setIsLoading,
            });
            // upload passport file
            const passportUrl = await uploadAndExtractUrl({
                file: data.passportFile,
                fieldName: "passportFile",
                uploadFolder: UPLOAD_FOLDER.STUDENT_PASSPORT,
                form,
                setSubmissionErrors,
                setIsLoading,
            });
            // upload student pass file
            const studentPassFileUrl = await uploadAndExtractUrl({
                file: data.studentPassFile,
                fieldName: "studentPassFile",
                uploadFolder: UPLOAD_FOLDER.STUDENT_PASS,
                form,
                setSubmissionErrors,
                setIsLoading,
            });
            // upload recent report file
            const reportUrl = await uploadAndExtractUrl({
                file: data.recentReportFile,
                fieldName: "recentReportFile",
                uploadFolder: UPLOAD_FOLDER.STUDENT_FORMER_SCHOOOL_REPORT_CARD,
                form,
                setSubmissionErrors,
                setIsLoading,
            });

            const submittedData = {
                ...data,
                studentPhoto: studentPhotoUrl ?? "",
                birthCertificateFile: birthCertificateUrl ?? "",
                passportFile: passportUrl,
                studentPassFile: studentPassFileUrl,
                recentReportFile: reportUrl,
            };

            const addStudentRes = await addStudent(submittedData);
            if (!addStudentRes.success) {
                toast.error("Error adding student");
                setSubmissionErrors((prev) => [
                    ...prev,
                    addStudentRes.error as string,
                ]);
                setIsLoading(false);
            } else {
                toast.success("Student added successfully");
                setIsLoading(false);
                form.reset();
            }
        }
    };

    return (
        <div>
            <div className="">
                <CardTitle className="text-xl">Student Registration</CardTitle>
                <CardDescription>
                    Complete the form to register a new student
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
                        {/* ------academic information section----- */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Academic information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* academic year  */}
                                    <SelectInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="academicYear"
                                        label="Academic Year*"
                                        placeholder="Select academic year"
                                        options={
                                            // check if the array of academicYears is empty first then loop
                                            academicYears.length > 0
                                                ? academicYears.map((item) => ({
                                                      label: item.name,
                                                      value: item.id,
                                                  }))
                                                : []
                                        }
                                    />
                                    {/* date of admission */}
                                    <DateInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="dateOfAdmission"
                                        label="Date of Admission*"
                                        placeholder="Select date of admission"
                                    />

                                    {/* class  */}
                                    <SelectInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="class"
                                        label="Class *"
                                        placeholder="Select class"
                                        options={
                                            classes.length > 0
                                                ? classes.map((item) => ({
                                                      label: item.name,
                                                      value: item.id,
                                                  }))
                                                : []
                                        }
                                    />
                                    {/* registration no */}
                                    <TextInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="registrationNo"
                                        label="Registration No*"
                                        placeholder="Enter registration number"
                                        type="text"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* ------personal information section----- */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* first name  */}
                                    <TextInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="firstName"
                                        label="First Name*"
                                        placeholder="Enter first name"
                                        type="text"
                                    />
                                    {/* middle name */}
                                    <TextInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="middleName"
                                        label="Middle Name*"
                                        placeholder="Enter middle name"
                                        type="text"
                                    />
                                    {/* surname  */}
                                    <TextInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="surname"
                                        label="Surname*"
                                        placeholder="Enter surname"
                                        type="text"
                                    />
                                    {/* prefeered name */}
                                    <TextInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="preferredName"
                                        label="Preferred Name"
                                        placeholder="Enter preferred name"
                                        type="text"
                                    />
                                    {/* nationality */}
                                    <TextInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="nationality"
                                        label="Nationality*"
                                        placeholder="Nationality"
                                        type="text"
                                    />
                                    {/* date of birth */}
                                    <DateInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="dateOfBirth"
                                        label="Date of Birth*"
                                        placeholder="Select date of birth"
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
                                    {/* religion */}
                                    <SelectInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="religion"
                                        label="Religion*"
                                        placeholder="Select Religion"
                                        options={RELIGIONS.map((item) => {
                                            return {
                                                label: item,
                                                value: item,
                                            };
                                        })}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* ------guardian information section----- */}
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Parent or Guardian Information
                                </CardTitle>
                                <CardDescription>
                                    At least one guardian is required. You can
                                    add more by clicking the
                                    <span className="italics">
                                        Add guardian button
                                    </span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {guardianFields.map((guardian, index) => (
                                    <Card key={guardian.id} className="mb-4">
                                        <CardHeader className="flex justify-between">
                                            <div className="flex items-center justify-between">
                                                <CardTitle>
                                                    Guardian #{index + 1}
                                                </CardTitle>

                                                <div>
                                                    {guardianFields.length >
                                                        1 && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                removeGuardian(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <Trash className="mr-2 h-4 w-4" />
                                                            Remove
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {/* relationship */}
                                            <SelectInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name={`guardians.${index}.relationship`}
                                                label="Relationship*"
                                                placeholder="Enter relationship"
                                                options={Object.values(
                                                    GuardianRelationship
                                                ).map((item) => ({
                                                    label: item,
                                                    value: item,
                                                }))}
                                            />
                                            {/* full name */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name={`guardians.${index}.fullName`}
                                                label="Full Name*"
                                                placeholder="Enter full name"
                                                type="text"
                                            />
                                            {/* occupation  */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name={`guardians.${index}.occupation`}
                                                label="Occupation*"
                                                placeholder="Enter occupation"
                                                type="text"
                                            />
                                            {/* residential address  */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name={`guardians.${index}.residentialAddress`}
                                                label="Residential Address*"
                                                placeholder="Enter residential address"
                                                type="text"
                                            />
                                            {/* contact phone  */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name={`guardians.${index}.contactPhone`}
                                                label="Contact Phone*"
                                                placeholder="Enter contact phone"
                                                type="number"
                                            />
                                            {/* whatsapp number  */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name={`guardians.${index}.whatsappNumber`}
                                                label="Whatsapp Number"
                                                placeholder="Enter whatsapp number"
                                                type="number"
                                            />
                                            {/* email address  */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name={`guardians.${index}.emailAddress`}
                                                label="Email Address"
                                                placeholder="Enter email address"
                                                type="email"
                                            />
                                            {/* preferred contact */}
                                            <SelectInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name={`guardians.${index}.preferredContact`}
                                                label="Preferred Contact*"
                                                placeholder="Enter preferred contact"
                                                options={Object.values(
                                                    PreferredContact
                                                ).map((item) => ({
                                                    label: item,
                                                    value: item,
                                                }))}
                                            />
                                        </CardContent>
                                    </Card>
                                ))}

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        appendGuardian({
                                            relationship: "guardian",
                                            fullName: "",
                                            occupation: "",
                                            residentialAddress: "",
                                            contactPhone: "",
                                            whatsappNumber: "",
                                            preferredContact: "phone",
                                            emailAddress: "",
                                        })
                                    }
                                >
                                    Add Guardian
                                </Button>
                            </CardContent>
                        </Card>

                        {/* ------documents section----- */}
                        <CardTitle>Documents</CardTitle>
                        <Card className="inline-block">
                            <CardHeader>
                                <CardTitle>Student Photo</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* student photo */}
                                <div className="w-64">
                                    <ImageInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="studentPhoto"
                                        label="Upload Photo*"
                                        placeholder="CLick here to select photo"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        {/* --Birth certificate subsection-- */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Birth Certificate</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* birth certificate no */}
                                <TextInput
                                    disabled={isLoading}
                                    control={form.control}
                                    name={"birthCertificatNo"}
                                    label="Birth certificate No*"
                                    type="text"
                                    placeholder="Enter birth certificate no"
                                />
                                {/* birth certificate file */}
                                <FileInput
                                    disabled={isLoading}
                                    control={form.control}
                                    name={"birthCertificateFile"}
                                    label="Birth Certificate File*"
                                    placeholder="Upload birth certificate file"
                                />
                            </CardContent>
                        </Card>

                        {/* --passport subsection-- */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Passport</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* pasport no  */}
                                <TextInput
                                    disabled={isLoading}
                                    control={form.control}
                                    name={"passportNo"}
                                    label="Passport No"
                                    type="text"
                                    placeholder="Enter passport no"
                                />
                                {/* date of expiry */}
                                <DateInput
                                    disabled={isLoading}
                                    control={form.control}
                                    name={"expiryDate"}
                                    label="Date of Expiry"
                                    placeholder="Select date of expiry"
                                />
                                {/* upload passport file */}
                                <FileInput
                                    disabled={isLoading}
                                    control={form.control}
                                    name={"passportFile"}
                                    label="Passport File"
                                    placeholder="Upload passport file"
                                />
                            </CardContent>
                        </Card>

                        {/* --student pass subsection-- */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Student Pass</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* student pass no */}
                                <TextInput
                                    disabled={isLoading}
                                    control={form.control}
                                    name={"studentPassNo"}
                                    label="Student Pass No"
                                    type="text"
                                    placeholder="Enter student pass no"
                                />
                                {/* date of expiry */}
                                <DateInput
                                    disabled={isLoading}
                                    control={form.control}
                                    name={"dateOfExpiry"}
                                    label="Date of Expiry"
                                    placeholder="Select date of expiry"
                                />
                                {/* upload student pass file */}
                                <FileInput
                                    disabled={isLoading}
                                    control={form.control}
                                    name={"studentPassFile"}
                                    label="Student Pass File"
                                    placeholder="Upload student pass file"
                                />
                            </CardContent>
                        </Card>

                        {/* ------former school section----- */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Former School</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* name of school  */}
                                <TextInput
                                    disabled={isLoading}
                                    control={form.control}
                                    name={"nameOfSchool"}
                                    label="Name of School"
                                    type="text"
                                    placeholder="Enter name of school"
                                />
                                {/* location */}
                                <TextInput
                                    disabled={isLoading}
                                    control={form.control}
                                    name={"location"}
                                    label="Location"
                                    type="text"
                                    placeholder="Enter location"
                                />
                                {/* reason for exit  */}
                                <TextareaInput
                                    disabled={isLoading}
                                    control={form.control}
                                    name="reasonForExit"
                                    label="Reason for Exit"
                                    placeholder="Enter reason for exit"
                                />
                                {/* upload recent report file  */}
                                <FileInput
                                    disabled={isLoading}
                                    control={form.control}
                                    name={"recentReportFile"}
                                    label="Recent Report File"
                                    placeholder="Upload recent report file"
                                />
                            </CardContent>
                        </Card>

                        {/* ------general information section----- */}
                        <Card>
                            <CardHeader>
                                <CardTitle>General information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* blood type  */}
                                    <SelectInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="bloodType"
                                        label="Blood Type*"
                                        placeholder="Select blood type"
                                        options={BLOOD_GROUPS.map((item) => {
                                            return {
                                                label: item,
                                                value: item,
                                            };
                                        })}
                                    />

                                    {/* who lives with the student */}
                                    <TextInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="whoLivesWithStudentAtHome"
                                        label="Who lives with the student at home"
                                        placeholder="Enter who lives with the student at home"
                                        type="text"
                                    />
                                    {/* primary language at home  */}
                                    <TextInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="primaryLanguageAtHome"
                                        label="Primary language at home"
                                        placeholder="Enter primary language at home"
                                        type="text"
                                    />
                                    {/* other choldren at ccis  */}
                                    <SelectInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="otherChildrenAtCCIS"
                                        label="Other children at CCIS"
                                        placeholder="Select other children at CCIS"
                                        options={[
                                            { label: "Yes", value: "yes" },
                                            { label: "No", value: "no" },
                                        ]}
                                        mapValue={(val) => val === "yes"}
                                        mapToString={(val) =>
                                            val ? "yes" : "no"
                                        }
                                    />
                                    {/* reffered by current family */}
                                    <SelectInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="referredByCurrentFamily"
                                        label="Referred by current family"
                                        placeholder="Select referred by current family"
                                        options={[
                                            { label: "Yes", value: "yes" },
                                            { label: "No", value: "no" },
                                        ]}
                                        mapValue={(val) => val === "yes"}
                                        mapToString={(val) =>
                                            val ? "yes" : "no"
                                        }
                                    />
                                    {/* permission for social media photos */}
                                    <SelectInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="permissionForSocialMediaPhotos"
                                        label="Permission for social media photos"
                                        placeholder="Select permission for social media photos"
                                        options={[
                                            { label: "Yes", value: "yes" },
                                            { label: "No", value: "no" },
                                        ]}
                                        mapValue={(val) => val === "yes"}
                                        mapToString={(val) =>
                                            val ? "yes" : "no"
                                        }
                                    />
                                    {/* anything special */}
                                    <TextareaInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="specialInformation"
                                        label="Anything special"
                                        placeholder="Enter anything special"
                                    />
                                    {/* relevant medica conditions  */}
                                    <TextareaInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="medicalConditions"
                                        label="Relevant medical conditions"
                                        placeholder="Enter relevant medical conditions"
                                    />
                                    {/* school fees contribution by employer or third part if yes enter figure */}
                                    <SelectInput
                                        disabled={isLoading}
                                        control={form.control}
                                        name="feesContribution"
                                        label="School fees contribution by employer or third party"
                                        placeholder="Select school fees contribution by employer or third party"
                                        options={[
                                            { label: "Yes", value: "yes" },
                                            { label: "No", value: "no" },
                                        ]}
                                        mapValue={(val) => val === "yes"}
                                        mapToString={(val) =>
                                            val ? "yes" : "no"
                                        }
                                    />
                                    {/* <CheckboxInput
                                        control={form.control}
                                        name="feesContribution"
                                        label="School fees contribution by employer or third party"
                                        formDescription="If yes, enter figure"
                                    /> */}
                                    {form.watch("feesContribution") && (
                                        <TextInput
                                            disabled={isLoading}
                                            control={form.control}
                                            name="feesContributionPercentage"
                                            label="Fees contribution percentage"
                                            placeholder="Enter fees contribution percentage"
                                            type="number"
                                            formDescription="Enter percentage"
                                        />
                                    )}
                                </div>
                            </CardContent>
                        </Card>

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
                                                                size="sm"
                                                                onClick={() =>
                                                                    removeEmergencyContact(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <Trash className="mr-2 h-4 w-4" />
                                                                Remove
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
                                                    type="number"
                                                />
                                                {/* whatsapp number */}
                                                <TextInput
                                                    disabled={isLoading}
                                                    control={form.control}
                                                    name={`emergencyContacts.${index}.whatsappNumber`}
                                                    label="Whatsapp Number"
                                                    placeholder="Enter whatsapp number"
                                                    type="number"
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

                        {/* ------doctors section----- */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Doctors Information</CardTitle>
                                <CardDescription>
                                    You can add more by clicking the{" "}
                                    <span className="italic">Add Doctor</span>{" "}
                                    button.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {doctorFields.map((doctor, index) => (
                                    <Card key={doctor.id} className="mb-4">
                                        <CardHeader className="flex justify-between">
                                            <div className="flex items-center justify-between">
                                                <CardTitle>
                                                    Doctor #{index + 1}
                                                </CardTitle>
                                                <div>
                                                    {doctorFields.length >
                                                        1 && (
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() =>
                                                                removeDoctor(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <Trash className="mr-2 h-4 w-4" />
                                                            Remove
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
                                                name={`doctors.${index}.fullNames`}
                                                label="Full Names*"
                                                placeholder="Enter full names"
                                                type="text"
                                            />
                                            {/* contact phone */}
                                            <TextInput
                                                disabled={isLoading}
                                                control={form.control}
                                                name={`doctors.${index}.contactPhone`}
                                                label="Contact  Phone*"
                                                placeholder="Enter contact phone"
                                                type="number"
                                            />
                                        </CardContent>
                                    </Card>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        appendDoctor({
                                            fullNames: "",
                                            contactPhone: "",
                                        })
                                    }
                                >
                                    Add Doctor
                                </Button>
                            </CardContent>
                        </Card>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            onClick={() => {
                                console.log(form.formState.errors);
                            }}
                        >
                            {isLoading
                                ? "Submitting..."
                                : "Submit Registration"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};
