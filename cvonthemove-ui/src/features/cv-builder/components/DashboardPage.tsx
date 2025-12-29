import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cvService } from '../services/cvService';

export const DashboardPage = () => {
    const [cvs, setCvs] = useState<CV[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchCvs = async () => {
            try {
                const data = await cvService.getAllCVs();
                setCvs(data);
            } catch (error) {
                console.error("Failed to fetch CVs", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCvs();
    }, [navigate]);

    if (loading) {
        return <div className="text-white text-center mt-8">Loading...</div>;
    }

    return (
        <div className="p-8 bg-slate-900 min-h-screen">
            <h1 className="text-center text-white mb-8 text-3xl font-bold">Your CVs</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cvs.map((cv) => (
                    <div key={cv.id} className="bg-slate-800 p-6 rounded-lg">
                        <h2 className="text-white text-xl font-bold">{cv.personalDetails?.fullName || 'Untitled'}</h2>
                        <p className="text-slate-400">Created at: {new Date(cv.createdAt).toLocaleDateString()}</p>
                        <button
                            onClick={() => navigate(`/edit/${cv.id}`)}
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
