import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCVFormSchema, type CreateCVInput, type CreateCVFormInput } from '../types';
import { PersonalDetailsForm } from './forms/PersonalDetailsForm';
import { AddressForm } from './forms/AddressForm';
import { EducationForm } from './forms/EducationForm';
import { WorkExperienceForm } from './forms/WorkExperienceForm';
import { SkillsForm } from './forms/SkillsForm';
import { ReferencesForm } from './forms/ReferencesForm';
import { Save, type LucideIcon } from 'lucide-react';

interface CVBuilderFormProps {
    initialData?: CreateCVInput;
    onSubmit: (data: CreateCVInput) => void;
    isSubmitting?: boolean;
    submitLabel?: string;
    submitIcon?: LucideIcon;
}

export const CVBuilderForm: React.FC<CVBuilderFormProps> = ({
    initialData,
    onSubmit,
    isSubmitting = false,
    submitLabel = 'Save CV',
    submitIcon: Icon = Save
}) => {
    // Transform initialData to form structure (wrap languages)
    const defaultPersonalDetails = {
        languages: [],
        fullName: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
        linkedinUrl: "",
        idNumber: "",
        criminalRecord: "",
        maritalStatus: "",
    };

    // Transform initialData to form structure (wrap languages)
    const formInitialValues: CreateCVFormInput = initialData ? {
        ...initialData,
        personalDetails: initialData.personalDetails ? {
            ...initialData.personalDetails,
            languages: initialData.personalDetails.languages ? initialData.personalDetails.languages.map(l => ({ value: l })) : []
        } : defaultPersonalDetails
    } : {
        personalDetails: defaultPersonalDetails,
        addresses: [],
        educations: [],
        workExperiences: [],
        skills: [],
        references: [],
    };

    const methods = useForm<CreateCVFormInput>({
        resolver: zodResolver(CreateCVFormSchema),
        defaultValues: formInitialValues,
    });

    const handleFormSubmit = (data: CreateCVFormInput) => {
        // Transform back to API structure (unwrap languages)
        // Ensure personalDetails is always present and correctly typed
        const apiData: CreateCVInput = {
            ...data,
            personalDetails: {
                ...(data.personalDetails || initialData?.personalDetails || formInitialValues.personalDetails),
                languages: data.personalDetails?.languages
                    ? data.personalDetails.languages.map(l => l.value)
                    : (initialData?.personalDetails?.languages || [])
            }
        };
        onSubmit(apiData);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="cv-builder-form">
                <div className="form-header">
                    <h2>CV Details</h2>
                    <p>Fill in the details below to generate your CV.</p>
                </div>

                <div id="personalDetails">
                    <PersonalDetailsForm />
                </div>
                <div id="addresses">
                    <AddressForm />
                </div>
                <div id="educations">
                    <EducationForm />
                </div>
                <div id="workExperiences">
                    <WorkExperienceForm />
                </div>
                <div id="skills">
                    <SkillsForm />
                </div>
                <div id="references">
                    <ReferencesForm />
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={isSubmitting} className="btn-primary">
                        <Icon size={18} />
                        {isSubmitting ? 'Saving...' : submitLabel}
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};
