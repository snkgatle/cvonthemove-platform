import React, { useState } from 'react';
import { useFormContext, useFieldArray, useFormState } from 'react-hook-form';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import type { CreateCVFormInput } from '../../types';
import { AIEnhancerModal } from '../AIEnhancerModal';

export const WorkExperienceForm: React.FC = () => {
    const { register, control, setValue, getValues } = useFormContext<CreateCVFormInput>();
    const { errors } = useFormState({ control });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "workExperiences",
    });

    const [modalState, setModalState] = useState<{ isOpen: boolean; index: number | null }>({
        isOpen: false,
        index: null,
    });

    const openEnhancer = (index: number) => {
        setModalState({ isOpen: true, index });
    };

    const closeEnhancer = () => {
        setModalState({ isOpen: false, index: null });
    };

    const handleSelectSuggestion = (suggestion: string) => {
        if (modalState.index !== null) {
            const currentDescription = getValues(`workExperiences.${modalState.index}.description`);
            // Append or replace? Let's append for now or just replace if empty.
            // The user might want to replace a specific bullet point.
            // But since the modal takes the text, usually it replaces the text or appends.
            // The prompt says "Jules will suggest 3 professional alternatives".
            // Let's replace the content in the modal input but here we update the form field.
            // If the user wants to *enhance* "I sold cars", they probably want the enhanced version.

            // To be safe, maybe we should append if there is already text and it's different?
            // Or replace?
            // Let's just set the value. The user can edit it later.
            setValue(`workExperiences.${modalState.index}.description`, suggestion, { shouldDirty: true });
            closeEnhancer();
        }
    };

    return (
        <div className="form-section">
            <h3>Work Experience</h3>
            {fields.map((field, index) => (
                <div key={field.id} className="array-item-card">
                    <div className="card-header">
                        <h4>Experience {index + 1}</h4>
                        <button type="button" onClick={() => remove(index)} className="icon-btn danger"><Trash2 size={16}/></button>
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label>Company</label>
                            <input
                                {...register(`workExperiences.${index}.company`)}
                                placeholder="Company Name"
                                className={errors.workExperiences?.[index]?.company ? "input-error" : ""}
                            />
                            {errors.workExperiences?.[index]?.company && <span className="error">{errors.workExperiences[index]?.company?.message}</span>}
                        </div>
                        <div className="form-group">
                            <label>Position</label>
                            <input
                                {...register(`workExperiences.${index}.position`)}
                                placeholder="Job Title"
                                className={errors.workExperiences?.[index]?.position ? "input-error" : ""}
                            />
                            {errors.workExperiences?.[index]?.position && <span className="error">{errors.workExperiences[index]?.position?.message}</span>}
                        </div>
                        <div className="form-group">
                            <label>Start Date</label>
                            <input
                                type="date"
                                {...register(`workExperiences.${index}.startDate`)}
                                className={errors.workExperiences?.[index]?.startDate ? "input-error" : ""}
                            />
                            {errors.workExperiences?.[index]?.startDate && <span className="error">{errors.workExperiences[index]?.startDate?.message}</span>}
                        </div>
                         <div className="form-group">
                            <label>End Date</label>
                            <input
                                type="date"
                                {...register(`workExperiences.${index}.endDate`)}
                                className={errors.workExperiences?.[index]?.endDate ? "input-error" : ""}
                            />
                        </div>
                         <div className="form-group checkbox-group">
                             <label>
                                <input type="checkbox" {...register(`workExperiences.${index}.current`)} />
                                Currently Working Here
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="flex justify-between items-center mb-1">
                            <label>Description</label>
                            <button
                                type="button"
                                onClick={() => openEnhancer(index)}
                                className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800"
                            >
                                <Sparkles size={12} /> Enhance with AI
                            </button>
                        </div>
                        <textarea
                            {...register(`workExperiences.${index}.description`)}
                            rows={4}
                            placeholder="Describe your responsibilities and achievements..."
                            className={errors.workExperiences?.[index]?.description ? "input-error" : ""}
                        />
                        {errors.workExperiences?.[index]?.description && <span className="error">{errors.workExperiences[index]?.description?.message}</span>}
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={() => append({ company: '', position: '', description: '', startDate: '', current: false })}
                className="btn-secondary"
            >
                <Plus size={16}/> Add Experience
            </button>

            {modalState.isOpen && modalState.index !== null && (
                <AIEnhancerModal
                    isOpen={modalState.isOpen}
                    onClose={closeEnhancer}
                    initialText={getValues(`workExperiences.${modalState.index}.description`) || ''}
                    onSelect={handleSelectSuggestion}
                />
            )}
        </div>
    );
};
