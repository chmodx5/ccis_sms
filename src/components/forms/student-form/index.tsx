import { AcademicInformation } from './AcademicInformation';
import { FamilyInfromation } from './FamilyInformation';
import { GeneralInformation } from './GeneralInfomation';
import { MedicalInformation } from './MedicalInformation';

export const StudentForm = () => {
    return (
        <div className='space-y-4'>
            <GeneralInformation />
            <AcademicInformation />
            <FamilyInfromation />
            <MedicalInformation />
        </div>
    );
};
