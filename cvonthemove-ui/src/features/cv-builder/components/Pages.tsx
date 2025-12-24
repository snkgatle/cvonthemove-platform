import { CVBuilderForm } from './CVBuilderForm';
import { type CreateCVInput } from '../types';
import '../styles/form.css';

// Mock data for editing
const MOCK_DATA: CreateCVInput = {
    personalDetails: {
        fullName: "Jane Doe",
        email: "jane.doe@example.com",
        phone: "+1 555 0199",
        location: "New York, USA",
        summary: "Experienced software engineer with a passion for frontend development.",
        linkedinUrl: "https://linkedin.com/in/janedoe",
        languages: ["English", "Spanish"],
        maritalStatus: "Single"
    },
    addresses: [
        {
            line1: "123 Main St",
            city: "New York",
            postalCode: "10001",
            country: "USA"
        }
    ],
    educations: [
        {
            institution: "Tech University",
            degree: "Bachelor of Science",
            fieldOfStudy: "Computer Science",
            startDate: "2015-09-01",
            endDate: "2019-05-30",
            current: false
        }
    ],
    workExperiences: [
        {
            company: "Tech Corp",
            position: "Frontend Developer",
            description: "Built amazing UIs with React.",
            startDate: "2019-06-01",
            current: true
        }
    ],
    skills: [
        { name: "React", level: "Expert" },
        { name: "TypeScript", level: "Advanced" }
    ],
    references: []
};

export const CreateCVPage = () => {
    const handleSubmit = async (data: CreateCVInput) => {
        console.log("Submitting Create CV:", data);
        // Here you would typically make the API call to POST /cv-builder
        // await api.post('/cv-builder', data);
        alert("CV Data prepared for submission (Check Console)");
    };

    return (
        <div style={{ padding: '2rem', background: '#0f172a', minHeight: '100vh' }}>
             <h1 style={{ textAlign: 'center', color: 'white', marginBottom: '2rem' }}>Create New CV</h1>
            <CVBuilderForm onSubmit={handleSubmit} />
        </div>
    );
};

export const EditCVPage = () => {
    const handleSubmit = async (data: CreateCVInput) => {
        console.log("Submitting Update CV:", data);
        // Here you would typically make the API call to POST /cv-builder or PUT /cv-builder/:id
        alert("CV Data Updated (Check Console)");
    };

    return (
        <div style={{ padding: '2rem', background: '#0f172a', minHeight: '100vh' }}>
            <h1 style={{ textAlign: 'center', color: 'white', marginBottom: '2rem' }}>Edit CV</h1>
            <CVBuilderForm
                initialData={MOCK_DATA}
                onSubmit={handleSubmit}
            />
        </div>
    );
};
