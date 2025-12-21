import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CVSchema, Education, PersonalDetails, WorkExperience, Skill } from '../types';
import { INITIAL_CV_STATE } from '../types';

interface CVState {
    cvData: CVSchema;

    // Actions
    updatePersonalDetails: (details: Partial<PersonalDetails>) => void;

    addEducation: (education: Education) => void;
    updateEducation: (id: string, education: Partial<Education>) => void;
    removeEducation: (id: string) => void;

    addWorkExperience: (work: WorkExperience) => void;
    updateWorkExperience: (id: string, work: Partial<WorkExperience>) => void;
    removeWorkExperience: (id: string) => void;

    addSkill: (skill: Skill) => void;
    removeSkill: (id: string) => void;

    setTemplate: (templateId: string) => void;
    setCVData: (data: CVSchema) => void;
    reset: () => void;
}

export const useCVStore = create<CVState>()(
    persist(
        (set) => ({
            cvData: INITIAL_CV_STATE,

            updatePersonalDetails: (details) =>
                set((state) => ({
                    cvData: {
                        ...state.cvData,
                        personalDetails: { ...state.cvData.personalDetails, ...details },
                    },
                })),

            addEducation: (education) =>
                set((state) => ({
                    cvData: {
                        ...state.cvData,
                        education: [...state.cvData.education, education],
                    },
                })),

            updateEducation: (id, updatedEducation) =>
                set((state) => ({
                    cvData: {
                        ...state.cvData,
                        education: state.cvData.education.map((edu) =>
                            edu.id === id ? { ...edu, ...updatedEducation } : edu
                        ),
                    },
                })),

            removeEducation: (id) =>
                set((state) => ({
                    cvData: {
                        ...state.cvData,
                        education: state.cvData.education.filter((edu) => edu.id !== id),
                    },
                })),

            addWorkExperience: (work) =>
                set((state) => ({
                    cvData: {
                        ...state.cvData,
                        workExperience: [...state.cvData.workExperience, work],
                    },
                })),

            updateWorkExperience: (id, updatedWork) =>
                set((state) => ({
                    cvData: {
                        ...state.cvData,
                        workExperience: state.cvData.workExperience.map((work) =>
                            work.id === id ? { ...work, ...updatedWork } : work
                        ),
                    },
                })),

            removeWorkExperience: (id) =>
                set((state) => ({
                    cvData: {
                        ...state.cvData,
                        workExperience: state.cvData.workExperience.filter(
                            (work) => work.id !== id
                        ),
                    },
                })),

            addSkill: (skill) =>
                set((state) => ({
                    cvData: {
                        ...state.cvData,
                        skills: [...state.cvData.skills, skill],
                    },
                })),

            removeSkill: (id) =>
                set((state) => ({
                    cvData: {
                        ...state.cvData,
                        skills: state.cvData.skills.filter((skill) => skill.id !== id),
                    },
                })),

            setTemplate: (templateId) =>
                set((state) => ({
                    cvData: { ...state.cvData, templateId },
                })),

            setCVData: (data) => set({ cvData: data }),

            reset: () => set({ cvData: INITIAL_CV_STATE }),
        }),
        {
            name: 'cv-storage', // name of the item in the storage (must be unique)
            partialize: (state) => ({ cvData: state.cvData }), // only persist the cvData
        }
    )
);
