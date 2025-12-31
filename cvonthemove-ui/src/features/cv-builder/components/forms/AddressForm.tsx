import React from 'react';
import { useFormContext, useFieldArray, useFormState } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import type { CreateCVFormInput } from '../../types';
import { countryList } from '../../countries';

export const AddressForm: React.FC = () => {
    const { register, control } = useFormContext<CreateCVFormInput>();
    const { errors } = useFormState({ control });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "addresses",
    });

    return (
        <div className="form-section">
            <h3>Addresses</h3>
            {fields.map((field, index) => (
                <div key={field.id} className="array-item-card">
                    <div className="card-header">
                        <h4>Address {index + 1}</h4>
                        <button type="button" onClick={() => remove(index)} className="icon-btn danger"><Trash2 size={16}/></button>
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label>Line 1</label>
                            <input
                                {...register(`addresses.${index}.line1`)}
                                placeholder="Street Address"
                                className={errors.addresses?.[index]?.line1 ? "input-error" : ""}
                            />
                            {errors.addresses?.[index]?.line1 && <span className="error">{errors.addresses[index]?.line1?.message}</span>}
                        </div>
                        <div className="form-group">
                            <label>Line 2</label>
                            <input
                                {...register(`addresses.${index}.line2`)}
                                placeholder="Apt, Suite, etc."
                                className={errors.addresses?.[index]?.line2 ? "input-error" : ""}
                            />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input
                                {...register(`addresses.${index}.city`)}
                                placeholder="City"
                                className={errors.addresses?.[index]?.city ? "input-error" : ""}
                            />
                            {errors.addresses?.[index]?.city && <span className="error">{errors.addresses[index]?.city?.message}</span>}
                        </div>
                        <div className="form-group">
                            <label>Postal Code</label>
                            <input
                                {...register(`addresses.${index}.postalCode`)}
                                placeholder="Zip Code"
                                className={errors.addresses?.[index]?.postalCode ? "input-error" : ""}
                            />
                            {errors.addresses?.[index]?.postalCode && <span className="error">{errors.addresses[index]?.postalCode?.message}</span>}
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <select
                                {...register(`addresses.${index}.country`)}
                                className={errors.addresses?.[index]?.country ? "input-error" : ""}
                                defaultValue=""
                            >
                                <option value="" disabled>Select a country</option>
                                {countryList.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                            {errors.addresses?.[index]?.country && <span className="error">{errors.addresses[index]?.country?.message}</span>}
                        </div>
                    </div>
                </div>
            ))}
            <button type="button" onClick={() => append({ line1: '', city: '', postalCode: '', country: '' })} className="btn-secondary">
                <Plus size={16}/> Add Address
            </button>
        </div>
    );
};
