import React from 'react';
import { useFormContext, useFieldArray, useFormState } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import type { CreateCVFormInput } from '../../types';

export const WorkExperienceForm: React.FC = () => {
    const { register, control } = useFormContext<CreateCVFormInput>();
    const { errors } = useFormState({ control });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "workExperiences",
    });

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
                        <label>Description</label>
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
        </div>
    );
};
