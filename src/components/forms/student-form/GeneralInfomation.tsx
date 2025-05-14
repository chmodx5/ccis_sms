import React from "react";

interface Props {
    isUpdate?: boolean;
}

export const GeneralInformation: React.FC<Props> = ({ isUpdate }) => {
    const student: Student = usePage().props.student as Student;

    const {
        data,
        setData,
        post,
        patch,
        processing,
        errors,
        recentlySuccessful,
    } = useForm(
        isUpdate
            ? student
            : {
                  // renamed from current_status to status_of_registration
                  status_of_registration: "",
                  status_of_registration_date: "",

                  registration_no: "",
                  first_name: "",
                  middle_name: "",
                  surname: "",
                  preferred_name: "",

                  date_of_birth: "",
                  gender: "",
                  nationality: "",
                  student_type: "",

                  birth_certificate_no: "",
                  birth_certificate: "",
                  passport_no: "",
                  passport: "",

                  passport_photo: "",

                  student_pass_number: "",
                  student_pass_expiry_date: "",
                  age_at_admission: "",
                  anticipated_year_level: "",
                  proposed_entry_date: "",
                  actual_entry_date: "",
                  special_things_about_child: "",
                  child_medical_conditions: "",
                  former_school: "",
                  home_residents: "",
                  primary_language_home: "",
                  has_other_children_enrolled: "",
                  other_children_details: "",
                  referred_by_family: "",
                  referrer_details: "",
                  employer_contribution: "",
                  contribution_percentage: "",
                  parents: [],
                  doctors: [],
                  emergency_contacts: [],
              }
    );
    return (
        <FormContainer title="General Information">
            <div className="space-y-6">
                {/* status of registation, status data ad registration number */}
                <div className="flex flex-col space-x-4 sm:flex-row">
                    {/* Status of registration  */}
                    <div className="w-full sm:flex-1">
                        <SelectInput
                            id="status_of_registration"
                            name="status_of_registration"
                            label="Status of Registration"
                            placeholder="Status of Registration"
                            value={data.status_of_registration}
                            onChange={(e) =>
                                setData("status_of_registration", e)
                            }
                            error={errors.nationality}
                            options={[
                                {
                                    label: "Readmission",
                                    value: "readmission",
                                },
                                {
                                    label: "New Student",
                                    value: "new-student",
                                },
                                {
                                    label: "Exit Student",
                                    value: "exit-student",
                                },
                            ]}
                        />
                    </div>

                    {/* Status of registration date */}
                    <div className="">
                        <TextInput
                            id="status_of_registration_date"
                            name="status_of_registration_date"
                            label="Status Date"
                            type="date"
                            placeholder="Enter Status Date"
                            value={data.status_of_registration_date}
                            onChange={(e) =>
                                setData(
                                    "status_of_registration_date",
                                    e.target.value
                                )
                            }
                            error={errors.status_of_registration_date}
                        />
                    </div>

                    {/* registration number */}
                    <div className="w-full sm:flex-1">
                        <TextInput
                            id="registration_no"
                            name="registration_no"
                            label="Registration Number"
                            type="number"
                            placeholder="Enter Registration Number"
                            value={data.registration_no}
                            onChange={(e) =>
                                setData("registration_no", e.target.value)
                            }
                            error={errors.registration_no}
                        />
                    </div>
                </div>

                {/* names */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                    {/* First Name Field */}
                    <TextInput
                        id="first_name"
                        name="first_name"
                        label="First Name"
                        placeholder="Enter First Name"
                        value={data.first_name}
                        onChange={(e) => setData("first_name", e.target.value)}
                        error={errors.first_name}
                    />

                    {/*Middle Name Field */}
                    <TextInput
                        id="middle_name"
                        name="middle_name"
                        label="Middle Name"
                        placeholder="Enter Middle Name"
                        value={data.middle_name}
                        onChange={(e) => setData("middle_name", e.target.value)}
                        error={errors.middle_name}
                    />

                    {/* Surname Field */}
                    <TextInput
                        id="surname"
                        name="surname"
                        label="Surname"
                        placeholder="Enter Surname"
                        value={data.surname}
                        onChange={(e) => setData("surname", e.target.value)}
                        error={errors.surname}
                    />

                    {/* Preffered Name Field */}
                    <TextInput
                        id="preferred_name"
                        name="preferred_name"
                        label="Preffered Name"
                        placeholder="Enter Preffered Name"
                        value={data.preferred_name}
                        onChange={(e) =>
                            setData("preferred_name", e.target.value)
                        }
                        error={errors.preferred_name}
                    />
                </div>

                {/* date of birth, gender,nationality and student type */}
                <div className="flex space-x-4">
                    {/* Date of Birth Field */}
                    <TextInput
                        id="date_of_birth"
                        name="date_of_birth"
                        label="Date of Birth"
                        type="date"
                        placeholder="Enter Date of Birth"
                        value={data.date_of_birth}
                        onChange={(e) =>
                            setData("date_of_birth", e.target.value)
                        }
                        error={errors.date_of_birth}
                    />
                    <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
                        {/* Gender Field */}
                        <SelectInput
                            id="gender"
                            name="gender"
                            label="Gender"
                            placeholder="Enter Gender"
                            value={data.gender}
                            onChange={(e) => setData("gender", e)}
                            error={errors.nationality}
                            options={[
                                {
                                    label: "Male",
                                    value: "Male",
                                },
                                {
                                    label: "Female",
                                    value: "Female",
                                },
                            ]}
                        />
                        {/* Nationality Field */}
                        <TextInput
                            id="nationality"
                            name="nationality"
                            label="Nationality"
                            placeholder="Enter Nationality"
                            value={data.nationality}
                            onChange={(e) =>
                                setData("nationality", e.target.value)
                            }
                            error={errors.nationality}
                        />

                        {/* stydent type */}
                        <SelectInput
                            id="student_type"
                            name="student_type"
                            label="Student type"
                            placeholder="Local or International student"
                            value={data.student_type}
                            onChange={(e) => setData("student_type", e)}
                            error={errors.nationality}
                            options={[
                                {
                                    label: "Local",
                                    value: "local",
                                },
                                {
                                    label: "International",
                                    value: "international",
                                },
                            ]}
                        />
                    </div>
                </div>

                {/* birth certificate and passport fields */}
                {data.student_type == "local" ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Birth Certificate No Field */}
                        <TextInput
                            id="birth_certificate_no"
                            name="birth_certificate_no"
                            label="Birth Certificate No"
                            placeholder="Enter Birth Certificate No"
                            value={data.birth_certificate_no}
                            onChange={(e) =>
                                setData("birth_certificate_no", e.target.value)
                            }
                            error={errors.birth_certificate_no}
                        />
                        {/* Birth Certificate  */}
                        <TextInput
                            id="birth_certificate"
                            name="birth_certificate"
                            label="Birth Certificate(pdf)"
                            type="file"
                            placeholder="Upload Birth certificate"
                            value={data.birth_certificate}
                            onChange={(e) =>
                                setData("birth_certificate", e.target.value)
                            }
                            error={errors.birth_certificate}
                        />
                    </div>
                ) : (
                    data.student_type == "international" && (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* Passport No Field */}
                            <TextInput
                                id="passport_no"
                                name="passport_no"
                                label="Passport No"
                                type="number"
                                placeholder="Enter Passport No"
                                value={data.passport_no}
                                onChange={(e) =>
                                    setData("passport_no", e.target.value)
                                }
                                error={errors.passport_no}
                            />
                            {/* Birth Certificate  */}
                            <TextInput
                                id="passport"
                                name="passport"
                                label="Passport (pdf)"
                                type="file"
                                placeholder="Upload passport"
                                value={data.passport}
                                onChange={(e) =>
                                    setData("passport", e.target.value)
                                }
                                error={errors.passport}
                            />
                        </div>
                    )
                )}

                {/* passport size photo */}
                <div className="w-64">
                    <ImageInput
                        name="profile_picture"
                        label="Passport Sized Photo"
                        placeholder="Drag and drop an image or click to upload"
                        value={data.passport_photo}
                        onChange={(file) => console.log(file)}
                        formDescription="Upload a recent photo for your profile."
                        error={errors.passport_photo}
                        disabled={false}
                    />
                </div>

                <div>
                    <Button>Save</Button>
                </div>
            </div>
        </FormContainer>
    );
};
