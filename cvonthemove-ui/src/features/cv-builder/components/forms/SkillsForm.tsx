import React from 'react';
import { useFormContext, useFieldArray, useFormState } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import type { CreateCVFormInput } from '../../types';

export const SkillsForm: React.FC = () => {
    const { register, control } = useFormContext<CreateCVFormInput>();
    const { errors } = useFormState({ control });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "skills",
    });

    return (
        <div className="form-section">
            <h3>Skills</h3>
            {fields.map((field, index) => (
                <div key={field.id} className="array-item-row">
                    <div className="form-group" style={{ flex: 1 }}>
                        <input
                            {...register(`skills.${index}.name`)}
                            placeholder="Skill Name (e.g. React)"
                            className={errors.skills?.[index]?.name ? "input-error" : ""}
                        />
                         {errors.skills?.[index]?.name && <span className="error">{errors.skills[index]?.name?.message}</span>}
                    </div>
                    <div className="form-group" style={{ width: '150px' }}>
                        <select
                            {...register(`skills.${index}.level`)}
                            className={errors.skills?.[index]?.level ? "input-error" : ""}
                        >
                            <option value="">Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                        </select>
                         {errors.skills?.[index]?.level && <span className="error">{errors.skills[index]?.level?.message}</span>}
                    </div>
                    <button type="button" onClick={() => remove(index)} className="icon-btn danger"><Trash2 size={16}/></button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => append({ name: '', level: '' })}
                className="btn-secondary small"
            >
                <Plus size={16}/> Add Skill
            </button>
        </div>
    );
};
