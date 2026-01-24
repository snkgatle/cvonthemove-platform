import React, { useState, useRef } from 'react';
import { useFormContext, useFieldArray, useFormState } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import type { CreateCVFormInput } from '../../types';
import { MagicWriteButton } from '../MagicWriteButton';
import { aiService } from '../../services/aiService';

export const WorkExperienceForm: React.FC = () => {
    const { register, control, setValue, getValues } = useFormContext<CreateCVFormInput>();
    const { errors } = useFormState({ control });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "workExperiences",
    });

    const [suggestingIndex, setSuggestingIndex] = useState<number | null>(null);
    const [previousDescriptions, setPreviousDescriptions] = useState<Record<number, string>>({});
    const [hasSuggestions, setHasSuggestions] = useState<Record<number, boolean>>({});
    const typingIntervalRef = useRef<any>(null);

    const fetchAISuggestion = async (index: number) => {
        const values = getValues();
        const experience = values.workExperiences?.[index];
        if (!experience) return;
        const { position, company } = experience;

        if (!position || !company) {
            alert("Please fill in Position and Company first to get a better suggestion.");
            return;
        }

        setSuggestingIndex(index);
        try {
            const suggestion = await aiService.suggestWorkDescription(position, company);

            // Save current for undo
            const currentDesc = getValues(`workExperiences.${index}.description`) || "";
            setPreviousDescriptions(prev => ({ ...prev, [index]: currentDesc }));

            // Typing effect
            let i = 0;
            setValue(`workExperiences.${index}.description`, ""); // Clear current
            if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

            typingIntervalRef.current = setInterval(() => {
                if (i < suggestion.length) {
                    const currentText = getValues(`workExperiences.${index}.description`) || "";
                    setValue(`workExperiences.${index}.description`, currentText + suggestion[i]);
                    i++;
                } else {
                    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
                    setHasSuggestions(prev => ({ ...prev, [index]: true }));
                    setSuggestingIndex(null);
                }
            }, 10);
        } catch (error) {
            console.error("Failed to fetch AI suggestion", error);
            setSuggestingIndex(null);
        }
    };

    const handleUndo = (index: number) => {
        const previous = previousDescriptions[index] || "";
        setValue(`workExperiences.${index}.description`, previous);
        setHasSuggestions(prev => ({ ...prev, [index]: false }));
    };

    return (
        <div className="form-section">
            <h3>Work Experience</h3>
            {fields.map((field, index) => (
                <div key={field.id} className="array-item-card">
                    <div className="card-header">
                        <h4>Experience {index + 1}</h4>
                        <button type="button" onClick={() => remove(index)} className="icon-btn danger"><Trash2 size={16} /></button>
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
                        <div className="flex justify-between items-center mb-2">
                            <label className="mb-0">Description</label>
                            <MagicWriteButton
                                onClick={() => fetchAISuggestion(index)}
                                isLoading={suggestingIndex === index}
                                hasSuggestion={hasSuggestions[index]}
                                onUndo={() => handleUndo(index)}
                            />
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
                <Plus size={16} /> Add Experience
            </button>
        </div>
    );
};
