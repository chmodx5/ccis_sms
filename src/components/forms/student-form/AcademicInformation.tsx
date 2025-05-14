import { Button, TextInput } from '@/components/ui';
import FormContainer from '@/components/ui/form/form-container';
import { Parent, Student } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { toast } from 'sonner';

interface Props {
    isUpdate?: boolean;
}

export const AcademicInformation: React.FC<Props> = ({ isUpdate = false }) => {
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
        <FormContainer title='Academic Information'>
            <form onSubmit={submit} className='mt-6 space-y-6'>
                <div className='lg:grid-cols grid grid-cols-1 gap-6 md:grid-cols-2'>
                    {/* Pass Number Field */}
                    <TextInput
                        id='student_pass_number'
                        name='student_pass_number'
                        label='Pass Number'
                        placeholder='Enter Pass Number'
                        value={data.student_pass_number}
                        onChange={(e) =>
                            setData('student_pass_number', e.target.value)
                        }
                        error={errors.student_pass_number}
                    />

                    {/* Pass expiry date Field */}
                    <TextInput
                        id='student_pass_expiry_date'
                        name='student_pass_expiry_date'
                        type='date'
                        label='Pass expiry date'
                        placeholder='Enter Pass expiry date'
                        value={data.student_pass_expiry_date}
                        onChange={(e) =>
                            setData('student_pass_expiry_date', e.target.value)
                        }
                        error={errors.student_pass_expiry_date}
                    />

                    {/* Anticipated year level Field */}
                    <TextInput
                        id='anticipated_year_level'
                        name='anticipated_year_level'
                        label='Anticipated year level'
                        placeholder='Enter Anticipated year level'
                        value={data.anticipated_year_level}
                        onChange={(e) =>
                            setData('anticipated_year_level', e.target.value)
                        }
                        error={errors.anticipated_year_level}
                    />

                    {/* Proposed Entry Date Field */}
                    <TextInput
                        id='proposed_entry_date'
                        name='proposed_entry_date'
                        label='Proposed Entry Date'
                        type='date'
                        placeholder='Enter Proposed Entry Date'
                        value={data.proposed_entry_date}
                        onChange={(e) =>
                            setData('proposed_entry_date', e.target.value)
                        }
                        error={errors.proposed_entry_date}
                    />

                    {/* Actual Entry Date Field */}
                    <TextInput
                        id='actual_entry_date'
                        name='actual_entry_date'
                        label='Actual Entry Date'
                        type='date'
                        placeholder='Enter Actual Entry Date'
                        value={data.actual_entry_date}
                        onChange={(e) =>
                            setData('actual_entry_date', e.target.value)
                        }
                        error={errors.actual_entry_date}
                    />

                    {/* Former School Field */}
                    <TextInput
                        id='former_school'
                        name='former_school'
                        label='Former School'
                        placeholder='Enter Former School'
                        value={data.former_school}
                        onChange={(e) =>
                            setData('former_school', e.target.value)
                        }
                        error={errors.former_school}
                    />
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
