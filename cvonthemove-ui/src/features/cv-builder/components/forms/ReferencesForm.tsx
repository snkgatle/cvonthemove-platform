import React from 'react';
import { useFormContext, useFieldArray, useFormState } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import type { CreateCVFormInput } from '../../types';

export const ReferencesForm: React.FC = () => {
    const { register, control } = useFormContext<CreateCVFormInput>();
    const { errors } = useFormState({ control });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "references",
    });

    return (
        <div className="form-section">
            <h3>References</h3>
            {fields.map((field, index) => (
                <div key={field.id} className="array-item-card">
                     <div className="card-header">
                        <h4>Reference {index + 1}</h4>
                        <button type="button" onClick={() => remove(index)} className="icon-btn danger"><Trash2 size={16}/></button>
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                {...register(`references.${index}.name`)}
                                placeholder="Name"
                                className={errors.references?.[index]?.name ? "input-error" : ""}
                            />
                             {errors.references?.[index]?.name && <span className="error">{errors.references[index]?.name?.message}</span>}
                        </div>
                        <div className="form-group">
                            <label>Relationship</label>
                            <input
                                {...register(`references.${index}.relationship`)}
                                placeholder="Manager, Colleague, etc."
                                className={errors.references?.[index]?.relationship ? "input-error" : ""}
                            />
                             {errors.references?.[index]?.relationship && <span className="error">{errors.references[index]?.relationship?.message}</span>}
                        </div>
                        <div className="form-group">
                            <label>Company</label>
                            <input
                                {...register(`references.${index}.company`)}
                                placeholder="Company"
                                className={errors.references?.[index]?.company ? "input-error" : ""}
                            />
                        </div>
                         <div className="form-group">
                            <label>Email</label>
                            <input
                                {...register(`references.${index}.email`)}
                                placeholder="Email"
                                type="email"
                                className={errors.references?.[index]?.email ? "input-error" : ""}
                            />
                             {errors.references?.[index]?.email && <span className="error">{errors.references[index]?.email?.message}</span>}
                        </div>
                         <div className="form-group">
                            <label>Phone</label>
                            <input
                                {...register(`references.${index}.phone`)}
                                placeholder="Phone"
                                className={errors.references?.[index]?.phone ? "input-error" : ""}
                            />
                        </div>
                    </div>
                </div>
            ))}
             <button
                type="button"
                onClick={() => append({ name: '', relationship: '' })}
                className="btn-secondary"
            >
                <Plus size={16}/> Add Reference
            </button>
        </div>
    );
};
