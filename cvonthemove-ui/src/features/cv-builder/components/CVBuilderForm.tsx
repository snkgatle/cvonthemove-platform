import React, { useState, useMemo, lazy, Suspense } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateCVFormSchema, type CreateCVInput, type CreateCVFormInput } from '../types';
import { Save, type LucideIcon } from 'lucide-react';
import { Skeleton } from '../../../components/Skeleton';

const PersonalDetailsForm = lazy(() => import('./forms/PersonalDetailsForm').then(module => ({ default: module.PersonalDetailsForm })));
const AddressForm = lazy(() => import('./forms/AddressForm').then(module => ({ default: module.AddressForm })));
const EducationForm = lazy(() => import('./forms/EducationForm').then(module => ({ default: module.EducationForm })));
const WorkExperienceForm = lazy(() => import('./forms/WorkExperienceForm').then(module => ({ default: module.WorkExperienceForm })));
const SkillsForm = lazy(() => import('./forms/SkillsForm').then(module => ({ default: module.SkillsForm })));
const ReferencesForm = lazy(() => import('./forms/ReferencesForm').then(module => ({ default: module.ReferencesForm })));

const FormSectionSkeleton = () => (
    <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
        </div>
        <Skeleton width="100%" height={80} />
    </div>
);

const SectionWrapper = React.memo(({ title, children, onSave, isSaving, showSaveButton }: { title: string, children: React.ReactNode, onSave: () => void, isSaving: boolean, showSaveButton: boolean }) => (
    <div className="bg-slate-800 p-6 rounded-lg mb-6 border border-white/5 relative group">
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
        {children}
        {showSaveButton && (
            <div className="mt-4 flex justify-end">
                <button type="button" onClick={onSave} disabled={isSaving} className="btn-primary-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm disabled:opacity-50 flex items-center gap-2">
                    <Save size={14} />
                    {isSaving ? 'Saving...' : `Save ${title}`}
                </button>
            </div>
        )}
    </div>
));

interface CVBuilderFormProps {
    initialData?: CreateCVInput;
    onSubmit: (data: CreateCVInput) => void;
    onPatch?: (section: keyof CreateCVInput, data: Partial<CreateCVInput>) => Promise<void>;
    isSubmitting?: boolean;
    submitLabel?: string;
    submitIcon?: LucideIcon;
}

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
    const defaultPersonalDetails = useMemo(() => ({
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
    }), []);

    const formInitialValues: CreateCVFormInput = useMemo(() => initialData ? {
        ...initialData,
        personalDetails: initialData.personalDetails ? {
            ...initialData.personalDetails,
            languages: initialData.personalDetails.languages ? initialData.personalDetails.languages.map((l: string) => ({ value: l })) : []
        } : defaultPersonalDetails
    } : {
        personalDetails: defaultPersonalDetails,
        addresses: [],
        educations: [],
        workExperiences: [],
        skills: [],
        references: [],
    }, [initialData, defaultPersonalDetails]);

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
                    <SectionWrapper title="Personal Details" onSave={() => handleSectionSave('personalDetails')} isSaving={savingSection === 'personalDetails'} showSaveButton={!!onPatch}>
                        <Suspense fallback={<FormSectionSkeleton />}>
                            <PersonalDetailsForm />
                        </Suspense>
                    </SectionWrapper>
                </div>
                <div id="addresses">
                    <SectionWrapper title="Addresses" onSave={() => handleSectionSave('addresses')} isSaving={savingSection === 'addresses'} showSaveButton={!!onPatch}>
                        <Suspense fallback={<FormSectionSkeleton />}>
                            <AddressForm />
                        </Suspense>
                    </SectionWrapper>
                </div>
                <div id="educations">
                    <SectionWrapper title="Education" onSave={() => handleSectionSave('educations')} isSaving={savingSection === 'educations'} showSaveButton={!!onPatch}>
                        <Suspense fallback={<FormSectionSkeleton />}>
                            <EducationForm />
                        </Suspense>
                    </SectionWrapper>
                </div>
                <div id="workExperiences">
                    <SectionWrapper title="Work Experience" onSave={() => handleSectionSave('workExperiences')} isSaving={savingSection === 'workExperiences'} showSaveButton={!!onPatch}>
                        <Suspense fallback={<FormSectionSkeleton />}>
                            <WorkExperienceForm />
                        </Suspense>
                    </SectionWrapper>
                </div>
                <div id="skills">
                    <SectionWrapper title="Skills" onSave={() => handleSectionSave('skills')} isSaving={savingSection === 'skills'} showSaveButton={!!onPatch}>
                        <Suspense fallback={<FormSectionSkeleton />}>
                            <SkillsForm />
                        </Suspense>
                    </SectionWrapper>
                </div>
                <div id="references">
                    <SectionWrapper title="References" onSave={() => handleSectionSave('references')} isSaving={savingSection === 'references'} showSaveButton={!!onPatch}>
                        <Suspense fallback={<FormSectionSkeleton />}>
                            <ReferencesForm />
                        </Suspense>
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
