import React, { useState } from 'react';
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
    onPatch?: (section: keyof CreateCVInput, data: Partial<CreateCVInput>) => Promise<void>;
    isSubmitting?: boolean;
    submitLabel?: string;
    submitIcon?: LucideIcon;
}

const SectionWrapper = ({ title, children, onSave, isSaving }: { title: string, children: React.ReactNode, onSave: () => void, isSaving: boolean }) => (
    <div className="bg-slate-800 p-6 rounded-lg mb-6 border border-white/5 relative group">
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
        {children}
        <div className="mt-4 flex justify-end">
            <button type="button" onClick={onSave} disabled={isSaving} className="btn-primary-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm disabled:opacity-50 flex items-center gap-2">
                <Save size={14} />
                {isSaving ? 'Saving...' : `Save ${title}`}
            </button>
        </div>
    </div>
);

export const CVBuilderForm: React.FC<CVBuilderFormProps> = ({
    initialData,
    onSubmit,
    onPatch,
    isSubmitting = false,
    submitLabel = 'Save Full CV',
    submitIcon: Icon = Save
}) => {
    const [savingSection, setSavingSection] = useState<string | null>(null);

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

    const unwrapData = (data: CreateCVFormInput): CreateCVInput => ({
        ...data,
        personalDetails: {
            ...(data.personalDetails || initialData?.personalDetails || defaultPersonalDetails),
            languages: data.personalDetails?.languages
                ? data.personalDetails.languages.map(l => l.value)
                : (initialData?.personalDetails?.languages || [])
        }
    });

    const handleFormSubmit = (data: CreateCVFormInput) => {
        onSubmit(unwrapData(data));
    };

    const handleSectionSave = async (section: keyof CreateCVInput) => {
        if (!onPatch) return;

        // Trigger validaton for the specific field
        const isValid = await methods.trigger(section as any);
        if (!isValid) return;

        setSavingSection(section);
        const data = methods.getValues();
        const apiData = unwrapData(data);

        try {
            await onPatch(section, { [section]: apiData[section] });
        } catch (error) {
            console.error(`Failed to save ${section}`, error);
        } finally {
            setSavingSection(null);
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="cv-builder-form space-y-8">
                <div className="form-header mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">CV Details</h2>
                    <p className="text-slate-400">Fill in the sections below. You can save each section independently.</p>
                </div>

                <div id="personalDetails">
                    <SectionWrapper title="Personal Details" onSave={() => handleSectionSave('personalDetails')} isSaving={savingSection === 'personalDetails'}>
                        <PersonalDetailsForm />
                    </SectionWrapper>
                </div>
                <div id="addresses">
                    <SectionWrapper title="Addresses" onSave={() => handleSectionSave('addresses')} isSaving={savingSection === 'addresses'}>
                        <AddressForm />
                    </SectionWrapper>
                </div>
                <div id="educations">
                    <SectionWrapper title="Education" onSave={() => handleSectionSave('educations')} isSaving={savingSection === 'educations'}>
                        <EducationForm />
                    </SectionWrapper>
                </div>
                <div id="workExperiences">
                    <SectionWrapper title="Work Experience" onSave={() => handleSectionSave('workExperiences')} isSaving={savingSection === 'workExperiences'}>
                        <WorkExperienceForm />
                    </SectionWrapper>
                </div>
                <div id="skills">
                    <SectionWrapper title="Skills" onSave={() => handleSectionSave('skills')} isSaving={savingSection === 'skills'}>
                        <SkillsForm />
                    </SectionWrapper>
                </div>
                <div id="references">
                    <SectionWrapper title="References" onSave={() => handleSectionSave('references')} isSaving={savingSection === 'references'}>
                        <ReferencesForm />
                    </SectionWrapper>
                </div>

                <div className="form-actions border-t border-white/10 pt-8 mt-8 flex justify-end">
                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full md:w-auto text-lg px-8 py-3">
                        <Icon size={20} className="mr-2" />
                        {isSubmitting ? 'Saving Full CV...' : submitLabel}
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};
