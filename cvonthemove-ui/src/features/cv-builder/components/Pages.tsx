import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { CVBuilderForm } from './CVBuilderForm';
import { type CreateCVInput } from '../types';
import { cvService } from '../services/cvService';
import '../styles/form.css';

export const CreateCVPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (data: CreateCVInput) => {
        try {
            console.log("Submitting Create CV:", data);
            await cvService.createCV(data);
            alert("CV Created Successfully!");
            navigate('/'); // Redirect to home or list
        } catch (error) {
            console.error("Failed to create CV", error);
            alert("Failed to create CV. Please try again.");
        }
    };

    return (
        <div className="p-8 bg-slate-900 min-h-screen">
             <h1 className="text-center text-white mb-8 text-3xl font-bold">Create New CV</h1>
            <CVBuilderForm onSubmit={handleSubmit} />
        </div>
    );
};

export const EditCVPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const [initialData, setInitialData] = useState<CreateCVInput | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Auth check
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login', { state: { from: location } });
            return;
        }

        const fetchCV = async () => {
            if (!id) return;
            try {
                const data = await cvService.getCV(id);
                setInitialData(data);
            } catch (error) {
                console.error("Failed to fetch CV", error);
                alert("Failed to load CV.");
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchCV();
    }, [id, navigate, location]);

    const handleSubmit = async (data: CreateCVInput) => {
        if (!id) return;
        try {
            console.log("Submitting Update CV:", data);
            await cvService.updateCV(id, data);
            alert("CV Updated Successfully!");
            navigate('/');
        } catch (error) {
            console.error("Failed to update CV", error);
            alert("Failed to update CV. Please try again.");
        }
    };

    if (loading) {
        return <div className="text-white text-center mt-8">Loading...</div>;
    }

    return (
        <div className="p-8 bg-slate-900 min-h-screen">
            <h1 className="text-center text-white mb-8 text-3xl font-bold">Edit CV</h1>
            {initialData && (
                <CVBuilderForm
                    initialData={initialData}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};
