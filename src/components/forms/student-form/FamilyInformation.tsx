import DeleteItemDialog from '@/components/DeleteItemDialog';
import {
    Button,
    Card,
    CheckboxInput,
    ComboboxInput,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TextAreaInput,
    TextInput,
} from '@/components/ui';
import FormContainer from '@/components/ui/form/form-container';
import { IconButton } from '@/components/ui/icon-button';
import { cn } from '@/lib/utils';
import {
    Parent,
    ParentFormInput,
    Student,
    StudentEmergencyContact,
    StudentEmergencyContactFormInput,
} from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import ParentForm from './../ParentForm';
import StudentEmergencyContactForm from './../StudentEmergencyContactForm';

interface Props {
    isUpdate?: boolean;
}

export const FamilyInfromation: React.FC<Props> = ({ isUpdate = false }) => {
    const [isParentRegistered, setIsParentRegistered] =
        React.useState<boolean>(false);
    const [isMotherRegistered, setIsMotherRegistered] =
        React.useState<boolean>(false);
    const [isFatherRegistered, setIsFatherRegistered] =
        React.useState<boolean>(false);
    const [selectedMother, setSelectedMother] = React.useState('');
    const [selectedFather, setSelectedFather] = React.useState<
        Parent | ParentFormInput
    >({});

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

    React.useEffect(() => {
        if (
            data.parents.filter((itm) => itm.relationship == 'mother').length >
            0
        ) {
            setIsMotherRegistered(true);
        }
    }, [isMotherRegistered, data.parents]);

    React.useEffect(() => {
        if (
            data.parents.filter((itm) => itm.relationship == 'father').length >
            0
        ) {
            setIsFatherRegistered(true);
        }
    }, [isFatherRegistered, data.parents]);

    const father =
        data.parents.filter((itm) => itm.relationship == 'father') || [];
    const mother =
        data.parents.filter((itm) => itm.relationship == 'mother') || [];

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

    // const isUpdate = false
    // split the form into section
    // general information
    // parents information
    // academic information
    // medical information blood-group, medical conditions, and doctor
    // other details

    return (
        <FormContainer title='Family Information'>
            <form onSubmit={submit} className='mt-6 space-y-6'>
                <div className='lg:grid-cols grid grid-cols-1 gap-6 md:grid-cols-2'>
                    {/* Home residence Field */}
                    <TextInput
                        id='home_residents'
                        name='home_residents'
                        label='Home residence'
                        placeholder='Enter Home residence'
                        value={data.home_residents}
                        onChange={(e) =>
                            setData('home_residents', e.target.value)
                        }
                        error={errors.home_residents}
                    />

                    {/* Primary Home Language Field */}
                    <TextInput
                        id='primary_language_home'
                        name='primary_language_home'
                        label='Primary Home Language'
                        placeholder='Enter Primary Home Language'
                        value={data.primary_language_home}
                        onChange={(e) =>
                            setData('primary_language_home', e.target.value)
                        }
                        error={errors.primary_language_home}
                    />
                </div>

                {/* reffered by family and details fields */}
                <div className='space-y-6'>
                    <div
                        className={cn(
                            'w-full',
                            !data.referred_by_family && 'md:w-full',
                        )}
                    >
                        {/* Was reffered by family Field */}
                        <CheckboxInput
                            id='referred_by_family'
                            name='referred_by_family'
                            label='Did a current enrooled family member refer you to CCIS'
                            placeholder='Did a current enrooled family member refer you to CCIS'
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            value={data.referred_by_family}
                            onChange={(value) =>
                                setData('referred_by_family', value)
                            }
                            error={errors.referred_by_family}
                        />
                    </div>
                    {data.referred_by_family && (
                        <div className='w-full'>
                            {/* Referrer Details Field */}
                            <TextAreaInput
                                id='referrer_details'
                                name='referrer_details'
                                label='Referrer Details'
                                placeholder='Referrer Details'
                                value={data.referrer_details}
                                onChange={(e) =>
                                    setData('referrer_details', e.target.value)
                                }
                                error={errors.referrer_details}
                            />
                        </div>
                    )}
                </div>

                {/* Employer contribution and details fields */}
                <div className='space-y-6'>
                    {/* Employer Contribution Field */}
                    <div
                        className={cn(
                            'w-full',
                            !data.employer_contribution && 'md:w-full',
                        )}
                    >
                        <CheckboxInput
                            id='employer_contribution'
                            name='employer_contribution'
                            label='Employer Contribution'
                            placeholder='Employer Contribution'
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            value={data.employer_contribution}
                            onChange={(value) =>
                                setData('employer_contribution', value)
                            }
                            error={errors.employer_contribution}
                        />
                    </div>

                    {/* Contribution Percentage Field */}
                    {data.employer_contribution && (
                        <div className='w-full'>
                            <TextInput
                                id='contribution_percentage'
                                name='contribution_percentage'
                                label='Contribution Percentage'
                                placeholder='Contribution Percentage'
                                type='number'
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                value={data.contribution_percentage}
                                onChange={(e) =>
                                    setData(
                                        'contribution_percentage',
                                        e.target.value,
                                    )
                                }
                                error={errors.contribution_percentage}
                            />
                        </div>
                    )}
                </div>

                {/* mothers details */}
                {/* if the parent has already been added we can just display the filled form insted then if the user decides to select a new parent for the student they can either erase the previous parents details or select a new one from the combobox */}
                <FormContainer title='Mother'>
                    <div className='space-y-3'>
                        {/* the parents form  */}
                        <div className='space-y-3'>
                            <CheckboxInput
                                id='is_registered'
                                name='is_registered'
                                label='Is registed or has other childred'
                                value={isMotherRegistered}
                                onChange={(e) => {
                                    setIsMotherRegistered(e);
                                }}
                                error={errors.has_other_children_enrolled}
                            />
                            {/* SOEMTHING TO CHECK IF PARENT IS REGISTERED IF TRUE WE DISPLAY A COMBOBOX TO SELECT THE PARENT IF FALSE THEN WE DISPLAY THIS BUTTON  */}
                            {isMotherRegistered && (
                                <div className='flex flex-col items-end gap-3 md:flex-row'>
                                    <div className='flex-1'>
                                        <ComboboxInput
                                            name='existing_parents'
                                            label='Select Parent'
                                            placeholder='Select Parent'
                                            onSelect={(parent) => {
                                                const selectedParentDetails =
                                                    parents.find(
                                                        (itm) =>
                                                            itm.full_name ===
                                                            parent,
                                                    );

                                                console.log(
                                                    selectedParentDetails,
                                                );
                                                if (selectedParentDetails) {
                                                    setSelectedMother(parent);
                                                    if (
                                                        data.parents.filter(
                                                            (itm) =>
                                                                itm.relationship ==
                                                                'mother',
                                                        ).length > 0
                                                    ) {
                                                        setData('parents', [
                                                            ...data.parents.filter(
                                                                (itm) =>
                                                                    itm.relationship !=
                                                                    'mother',
                                                            ),
                                                            {
                                                                ...selectedParentDetails,
                                                                relationship:
                                                                    'mother',
                                                            },
                                                        ]);
                                                        // remove the parent with the relationship mother from the list and add the newly selected one that way we have one mother per child
                                                    } else {
                                                        setData('parents', [
                                                            ...(data.parents ||
                                                                []),
                                                            {
                                                                ...selectedParentDetails,
                                                                relationship:
                                                                    'mother',
                                                            },
                                                        ]);
                                                    }
                                                }
                                            }}
                                            value={selectedMother}
                                            options={
                                                parents?.length > 0
                                                    ? parents.map((parent) => ({
                                                          label: parent.full_name,
                                                          value: parent.full_name,
                                                      }))
                                                    : []
                                            }
                                        />
                                    </div>

                                    <Button type='button'>Add Parent</Button>
                                </div>
                            )}

                            {/* when the data is submitted on this form it becomes undeditable here to edit it just go to the parents list or page */}
                            {!isMotherRegistered && (
                                <ParentForm
                                    submitButtonTitle='Save'
                                    relationship='mother'
                                    title='Add Mother'
                                />
                            )}
                            {/* list to display the added parents */}
                            {mother && (
                                <Card className='mb-4 shadow-none'>
                                    <Table className=''>
                                        <TableCaption>
                                            Students Parents
                                        </TableCaption>

                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className=''>
                                                    Full Name
                                                </TableHead>
                                                <TableHead>
                                                    Relationship
                                                </TableHead>
                                                <TableHead>
                                                    Occupation
                                                </TableHead>
                                                <TableHead>
                                                    Contact Phone
                                                </TableHead>
                                                <TableHead>
                                                    Whatsapp Number
                                                </TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead className='text-right'>
                                                    Action
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {mother.map(
                                                (
                                                    item:
                                                        | Parent
                                                        | ParentFormInput,
                                                    index,
                                                ) => (
                                                    <TableRow key={index}>
                                                        <TableCell className='font-medium'>
                                                            {item.full_name}
                                                        </TableCell>
                                                        <TableCell className='font-medium'>
                                                            {item.relationship}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.occupation}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.contact_phone}
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                item.whatsapp_number
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.email_address}
                                                        </TableCell>
                                                        <TableCell className='text-right'>
                                                            <DeleteItemDialog
                                                                confirmationText='DELETE'
                                                                onConfirm={() => {
                                                                    setData(
                                                                        'parents',
                                                                        data.parents.filter(
                                                                            (
                                                                                parent,
                                                                            ) =>
                                                                                parent.full_name !==
                                                                                item.full_name,
                                                                        ),
                                                                    );
                                                                    toast(
                                                                        'Parent deleted successully',
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
                    </div>
                </FormContainer>

                {/*fathers details */}
                <FormContainer title='Father'>
                    <div className='space-y-3'>
                        {/* the parents form  */}
                        <div className='space-y-3'>
                            <CheckboxInput
                                id='is_registered'
                                name='is_registered'
                                label='Is registed or has other childred'
                                value={isFatherRegistered}
                                onChange={(e) => {
                                    setIsFatherRegistered(e);
                                }}
                            />
                            {/* SOEMTHING TO CHECK IF PARENT IS REGISTERED IF TRUE WE DISPLAY A COMBOBOX TO SELECT THE PARENT IF FALSE THEN WE DISPLAY THIS BUTTON  */}
                            {isFatherRegistered && (
                                <div className='flex flex-col items-end gap-3 md:flex-row'>
                                    <div className='flex-1'>
                                        <ComboboxInput
                                            name='existing_parents'
                                            label='Select Parent'
                                            placeholder='Select Parent'
                                            onSelect={(itm) => {
                                                const selectedParentDetails =
                                                    parents.find(
                                                        (parent) =>
                                                            parent.id.toString() ===
                                                            itm,
                                                    );
                                                if (selectedParentDetails) {
                                                    setSelectedParent(itm);
                                                    if (
                                                        data.parents.filter(
                                                            (itm) =>
                                                                itm.relationship ==
                                                                'mother',
                                                        ).length > 0
                                                    ) {
                                                        setData('parents', [
                                                            ...data.parents.filter(
                                                                (itm) =>
                                                                    itm.relationship !=
                                                                    'father',
                                                            ),
                                                            {
                                                                ...selectedParentDetails,
                                                                relationship:
                                                                    'father',
                                                            },
                                                        ]);
                                                        // remove the parent with the relationship father from the list and add the newly selected one that way we have one father per child
                                                    } else {
                                                        setData('parents', [
                                                            ...(data.parents ||
                                                                []),
                                                            {
                                                                ...selectedParentDetails,
                                                                relationship:
                                                                    'father',
                                                            },
                                                        ]);
                                                    }
                                                }
                                            }}
                                            value={selectedParent}
                                            options={
                                                parents?.length > 0
                                                    ? parents.map((parent) => ({
                                                          label: parent.full_name,
                                                          value: parent.id.toString(),
                                                      }))
                                                    : []
                                            }
                                        />
                                    </div>
                                    <Button type='button'>Add Parent</Button>
                                </div>
                            )}

                            {!isFatherRegistered && (
                                <ParentForm
                                    relationship='father'
                                    onSubmit={(value) => {
                                        const wazazi = [
                                            ...(data.parents || []),
                                            value,
                                        ];
                                        setData('parents', wazazi);
                                    }}
                                />
                            )}

                            {/* list to display the added parents */}
                            {father && (
                                <Card className='mb-4 shadow-none'>
                                    <Table className=''>
                                        <TableCaption>
                                            Students Parents
                                        </TableCaption>

                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className=''>
                                                    Full Name
                                                </TableHead>
                                                <TableHead>
                                                    Occupation
                                                </TableHead>
                                                <TableHead>
                                                    Contact Phone
                                                </TableHead>
                                                <TableHead>
                                                    Whatsapp Number
                                                </TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead className='text-right'>
                                                    Action
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {data.parents
                                                .filter(
                                                    (itm) =>
                                                        itm.relationship ==
                                                        'father',
                                                )
                                                .map(
                                                    (
                                                        item:
                                                            | Parent
                                                            | ParentFormInput,
                                                        index,
                                                    ) => (
                                                        <TableRow key={index}>
                                                            <TableCell className='font-medium'>
                                                                {item.full_name}
                                                            </TableCell>
                                                            <TableCell className='font-medium'>
                                                                {
                                                                    item.relationship
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    item.occupation
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    item.contact_phone
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    item.whatsapp_number
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    item.email_address
                                                                }
                                                            </TableCell>
                                                            <TableCell className='text-right'>
                                                                <DeleteItemDialog
                                                                    confirmationText='DELETE'
                                                                    onConfirm={() => {
                                                                        setData(
                                                                            'parents',
                                                                            data.parents.filter(
                                                                                (
                                                                                    parent,
                                                                                ) =>
                                                                                    parent.full_name !==
                                                                                    item.full_name,
                                                                            ),
                                                                        );
                                                                        toast(
                                                                            'Parent deleted successully',
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
                    </div>
                </FormContainer>

                {/* emergency contacts */}
                <div className='space-y-3'>
                    {/* the emergency contact form  */}
                    <>
                        <StudentEmergencyContactForm
                            onSubmit={(value) => {
                                const kontacts = [
                                    ...(data.emergency_contacts || []),
                                    value,
                                ];
                                setData('emergency_contacts', kontacts);
                            }}
                        />
                    </>

                    {/* list to display the added emergency contacts */}
                    {data.emergency_contacts &&
                        data.emergency_contacts.length > 0 && (
                            <Card className='mb-4 shadow-none'>
                                <Table className=''>
                                    <TableCaption>
                                        Students Emergency contacts
                                    </TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className=''>
                                                Full Name
                                            </TableHead>
                                            <TableHead>Relationship</TableHead>
                                            <TableHead>Contact Phone</TableHead>
                                            <TableHead>
                                                Whatsapp Number
                                            </TableHead>
                                            <TableHead className='text-right'>
                                                Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data.emergency_contacts.map(
                                            (
                                                item:
                                                    | StudentEmergencyContact
                                                    | StudentEmergencyContactFormInput,
                                                index,
                                            ) => (
                                                <TableRow key={index}>
                                                    <TableCell className='font-medium'>
                                                        {item.full_name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.relationship}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.contact_phone}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.whatsapp_number}
                                                    </TableCell>
                                                    <TableCell className='text-right'>
                                                        <DeleteItemDialog
                                                            confirmationText='DELETE'
                                                            onConfirm={() => {
                                                                setData(
                                                                    'emergency_contacts',
                                                                    data.emergency_contacts.filter(
                                                                        (
                                                                            emergency_contact,
                                                                        ) =>
                                                                            emergency_contact.full_name !==
                                                                            item.full_name,
                                                                    ),
                                                                );
                                                                toast(
                                                                    'Contact deleted successully',
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
