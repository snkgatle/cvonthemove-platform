import React from 'react';
import { useFormContext, useFieldArray, useFormState } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import type { CreateCVFormInput } from '../../types';

export const PersonalDetailsForm: React.FC = () => {
    const { register, control } = useFormContext<CreateCVFormInput>();
    const { errors } = useFormState({ control });

    // Manage languages as a field array of objects { value: string }
    const { fields, append, remove } = useFieldArray({
        control,
        name: "personalDetails.languages",
    });

    return (
        <div className="form-section">
            <h3>Personal Details</h3>
            <div className="grid-2">
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        {...register("personalDetails.fullName")}
                        placeholder="Mpho Leruo"
                        className={errors.personalDetails?.fullName ? "input-error" : ""}
                    />
                    {errors.personalDetails?.fullName && <span className="error">{errors.personalDetails.fullName.message}</span>}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        {...register("personalDetails.email")}
                        placeholder="mpho@example.com"
                        type="email"
                        className={errors.personalDetails?.email ? "input-error" : ""}
                    />
                    {errors.personalDetails?.email && <span className="error">{errors.personalDetails.email.message}</span>}
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input
                        {...register("personalDetails.phone")}
                        placeholder="082 123 4567"
                        className={errors.personalDetails?.phone ? "input-error" : ""}
                    />
                    {errors.personalDetails?.phone && <span className="error">{errors.personalDetails.phone.message}</span>}
                </div>

                <div className="form-group">
                    <label>Location</label>
                    <input
                        {...register("personalDetails.location")}
                        placeholder="City, Country"
                        className={errors.personalDetails?.location ? "input-error" : ""}
                    />
                    {errors.personalDetails?.location && <span className="error">{errors.personalDetails.location.message}</span>}
                </div>

                <div className="form-group">
                    <label>ID Number</label>
                    <input
                        {...register("personalDetails.idNumber")}
                        placeholder="Required"
                        className={errors.personalDetails?.idNumber ? "input-error" : ""}
                    />
                </div>

                <div className="form-group">
                    <label>Marital Status</label>
                    <select
                        {...register("personalDetails.maritalStatus")}
                        className={errors.personalDetails?.maritalStatus ? "input-error" : ""}
                    >
                        <option value="">Select...</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label>Summary</label>
                <textarea
                    {...register("personalDetails.summary")}
                    rows={4}
                    placeholder="Professional summary..."
                    className={errors.personalDetails?.summary ? "input-error" : ""}
                />
                {errors.personalDetails?.summary && <span className="error">{errors.personalDetails.summary.message}</span>}
            </div>

            <div className="grid-2">
                <div className="form-group">
                    <label>LinkedIn URL</label>
                    <input
                        {...register("personalDetails.linkedinUrl")}
                        placeholder="https://linkedin.com/in/..."
                        className={errors.personalDetails?.linkedinUrl ? "input-error" : ""}
                    />
                    {errors.personalDetails?.linkedinUrl && <span className="error">{errors.personalDetails.linkedinUrl.message}</span>}
                </div>
                <div className="form-group">
                    <label>Criminal Record</label>
                    <input {...register("personalDetails.criminalRecord")} placeholder="e.g. None" />
                </div>
            </div>

            <div className="form-group">
                <label>Languages</label>
                <div className="grid-3">
                    {fields.map((field, index) => (
                        <div key={field.id} className="array-item-row">
                            <input
                                {...register(`personalDetails.languages.${index}.value`)}
                                placeholder="Language"
                            />
                            <button type="button" onClick={() => remove(index)} className="icon-btn danger"><Trash2 size={16} /></button>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={() => append({ value: "" })} className="btn-secondary small">
                    <Plus size={16} /> Add Language
                </button>
            </div>
        </div>
    );
};
