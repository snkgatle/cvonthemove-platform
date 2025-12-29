import React from 'react';
import { useFormContext, useFieldArray, useFormState } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import type { CreateCVFormInput } from '../../types';

export const EducationForm: React.FC = () => {
    const { register, control } = useFormContext<CreateCVFormInput>();
    const { errors } = useFormState({ control });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "educations",
    });

    return (
        <div className="form-section">
            <h3>Education</h3>
            {fields.map((field, index) => (
                <div key={field.id} className="array-item-card">
                    <div className="card-header">
                        <h4>Education {index + 1}</h4>
                        <button type="button" onClick={() => remove(index)} className="icon-btn danger"><Trash2 size={16}/></button>
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label>Institution</label>
                            <input
                                {...register(`educations.${index}.institution`)}
                                placeholder="University / School"
                                className={errors.educations?.[index]?.institution ? "input-error" : ""}
                            />
                            {errors.educations?.[index]?.institution && <span className="error">{errors.educations[index]?.institution?.message}</span>}
                        </div>
                        <div className="form-group">
                            <label>Degree</label>
                            <input
                                {...register(`educations.${index}.degree`)}
                                placeholder="Bachelor's, Master's, etc."
                                className={errors.educations?.[index]?.degree ? "input-error" : ""}
                            />
                            {errors.educations?.[index]?.degree && <span className="error">{errors.educations[index]?.degree?.message}</span>}
                        </div>
                        <div className="form-group">
                            <label>Field of Study</label>
                            <input
                                {...register(`educations.${index}.fieldOfStudy`)}
                                placeholder="Computer Science, etc."
                                className={errors.educations?.[index]?.fieldOfStudy ? "input-error" : ""}
                            />
                            {errors.educations?.[index]?.fieldOfStudy && <span className="error">{errors.educations[index]?.fieldOfStudy?.message}</span>}
                        </div>
                        <div className="form-group checkbox-group">
                             <label>
                                <input type="checkbox" {...register(`educations.${index}.current`)} />
                                Currently Studying
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Start Date</label>
                            <input
                                type="date"
                                {...register(`educations.${index}.startDate`)}
                                className={errors.educations?.[index]?.startDate ? "input-error" : ""}
                            />
                            {errors.educations?.[index]?.startDate && <span className="error">{errors.educations[index]?.startDate?.message}</span>}
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input
                                type="date"
                                {...register(`educations.${index}.endDate`)}
                                className={errors.educations?.[index]?.endDate ? "input-error" : ""}
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={() => append({ institution: '', degree: '', fieldOfStudy: '', startDate: '', current: false })}
                className="btn-secondary"
            >
                <Plus size={16}/> Add Education
            </button>
        </div>
    );
};
