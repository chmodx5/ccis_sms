import DeleteItemDialog from '@/components/DeleteItemDialog';
import {
    Button,
    Card,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TextAreaInput,
} from '@/components/ui';
import FormContainer from '@/components/ui/form/form-container';
import { IconButton } from '@/components/ui/icon-button';
import {
    Parent,
    Student,
    StudentDoctor,
    StudentDoctorFormInput,
} from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import StudentDoctorForm from './../StudentDoctorForm';

interface Props {
    isUpdate?: boolean;
}

export const MedicalInformation: React.FC<Props> = ({ isUpdate = false }) => {
    const [isParentRegistered, setIsParentRegistered] =
        React.useState<boolean>(false);
    const [selectedParent, setSelectedParent] = React.useState<string>('');

    const student: Student = usePage().props.student as Student;
    const parents: Parent[] = usePage().props.parents as Parent[];

    console.log('parents', parents);

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
                  registration_no: '',
                  first_name: '',
                  middle_name: '',
                  surname: '',
                  preferred_name: '',
                  nationality: '',
                  date_of_birth: '',
                  gender: '',
                  birth_certificate_no: '',
                  passport_no: '',
                  passport_photo: '',
                  student_pass_number: '',
                  student_pass_expiry_date: '',
                  age_at_admission: '',
                  current_status: '',
                  status_date: '',
                  anticipated_year_level: '',
                  proposed_entry_date: '',
                  actual_entry_date: '',
                  special_things_about_child: '',
                  child_medical_conditions: '',
                  former_school: '',
                  home_residents: '',
                  primary_language_home: '',
                  has_other_children_enrolled: '',
                  other_children_details: '',
                  referred_by_family: '',
                  referrer_details: '',
                  employer_contribution: '',
                  contribution_percentage: '',
                  parents: [],
                  doctors: [],
                  emergency_contacts: [],
              },
    );

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isUpdate) {
            patch('/update-student', {
                onSuccess: () => {
                    toast('Student updated successfully');
                },
                onError: (error) => {
                    toast.error(
                        'An error occurred while updating the student.',
                    );
                },
            });
        } else {
            post('/add-student');
        }
    };

    console.log('erros', errors);
    // const isUpdate = false
    // split the form into section
    // general information
    // parents information
    // academic information
    // medical information blood-group, medical conditions, and doctor
    // other details

    return (
        <FormContainer title='Medical Information'>
            <form onSubmit={submit} className='mt-6 space-y-6'>
                <div className='lg:grid-cols grid grid-cols-1 gap-6 md:grid-cols-2'>
                    {/* Special things about the child Field */}
                    <TextAreaInput
                        id='special_things_about_child'
                        name='special_things_about_child'
                        label='Special things about the child'
                        placeholder='Enter Special things about the child'
                        value={data.special_things_about_child}
                        onChange={(e) =>
                            setData(
                                'special_things_about_child',
                                e.target.value,
                            )
                        }
                        error={errors.special_things_about_child}
                    />

                    {/* Child Medical Conditions Field */}
                    <TextAreaInput
                        id='child_medical_conditions'
                        name='child_medical_conditions'
                        label='Child Medical Conditions'
                        placeholder='Enter Child Medical Conditions'
                        value={data.child_medical_conditions}
                        onChange={(e) =>
                            setData('child_medical_conditions', e.target.value)
                        }
                        error={errors.child_medical_conditions}
                    />
                </div>

                {/* students doctor(s) */}
                <div className='space-y-3'>
                    {/* the doctors from  */}
                    <div>
                        <StudentDoctorForm
                            onSubmit={(value) => {
                                const daktari = [
                                    ...(data.doctors || []),
                                    value,
                                ];
                                setData('doctors', daktari);
                            }}
                        />
                    </div>
                    {/* list to display the added doctors */}
                    {data.doctors && data.doctors.length > 0 && (
                        <Card className='mb-4 shadow-none'>
                            <Table className=''>
                                <TableCaption>Students doctors</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className=''>
                                            Full Name
                                        </TableHead>
                                        <TableHead>Contact Phone</TableHead>
                                        <TableHead className='text-right'>
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.doctors.map(
                                        (
                                            item:
                                                | StudentDoctor
                                                | StudentDoctorFormInput,
                                            index,
                                        ) => (
                                            <TableRow key={index}>
                                                <TableCell className='font-medium'>
                                                    {item.full_name}
                                                </TableCell>
                                                <TableCell>
                                                    {item.contact_phone}
                                                </TableCell>
                                                <TableCell className='text-right'>
                                                    <DeleteItemDialog
                                                        confirmationText='DELETE'
                                                        onConfirm={() => {
                                                            setData(
                                                                'doctors',
                                                                data.doctors.filter(
                                                                    (
                                                                        student_doctor,
                                                                    ) =>
                                                                        student_doctor.full_name !==
                                                                        item.full_name,
                                                                ),
                                                            );
                                                            toast(
                                                                'Doctor deleted successully',
                                                            );
                                                        }}
                                                        triggerElement={
                                                            <IconButton
                                                                size='sm'
                                                                color='destructive'
                                                                type='button'
                                                            >
                                                                <Trash className='h-4 w-4' />
                                                            </IconButton>
                                                        }
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ),
                                    )}
                                </TableBody>
                            </Table>
                        </Card>
                    )}
                </div>

                <div className='flex items-center gap-4'>
                    <Button type='submit' disabled={processing}>
                        {isUpdate ? 'Update' : 'Save'}
                    </Button>

                    {recentlySuccessful && (
                        <p className='text-sm text-green-600 dark:text-green-400'>
                            Saved.
                        </p>
                    )}
                </div>
            </form>
        </FormContainer>
    );
};
