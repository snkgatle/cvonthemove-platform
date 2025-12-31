import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cvService } from '../services/cvService';
import { type CV } from '../types';
import Preloader from '../../../components/Preloader';

export const DashboardPage = () => {
    const [cv, setCv] = useState<CV | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchCv = async () => {
            try {
                const data = await cvService.getMyCV();
                setCv(data);
            } catch (error) {
                console.error("Failed to fetch CV", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCv();
    }, [navigate]);

    if (loading) {
        return <Preloader />;
    }

    if (!cv) {
        return <div className="p-8 bg-slate-900 min-h-screen text-white text-center">
            <h1 className="text-3xl font-bold mb-4">No CV Found</h1>
            <p className="mb-8">You haven't created a CV yet. Let's get started!</p>
            <Link to="/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Create a New CV
            </Link>
        </div>;
    }

    return (
        <div className="p-8 bg-slate-900 min-h-screen">
            <h1 className="text-center text-white mb-8 text-3xl font-bold">Edit Your CV</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <DashboardCard
                    title="Personal Details"
                    description="Edit your personal information."
                    link={`/edit/${cv.id}?section=personalDetails`}
                />
                <DashboardCard
                    title="Addresses"
                    description="Manage your addresses."
                    link={`/edit/${cv.id}?section=addresses`}
                />
                <DashboardCard
                    title="Educational Information"
                    description="Update your education history."
                    link={`/edit/${cv.id}?section=educations`}
                />
                <DashboardCard
                    title="Work Experience"
                    description="Modify your work experience."
                    link={`/edit/${cv.id}?section=workExperiences`}
                />
                 <DashboardCard
                    title="Skills"
                    description="Update your professional skills."
                    link={`/edit/${cv.id}?section=skills`}
                />
                <DashboardCard
                    title="References"
                    description="Update your references."
                    link={`/edit/${cv.id}?section=references`}
                />
            </div>
        </div>
    );
};

interface DashboardCardProps {
    title: string;
    description: string;
    link: string;
}

const DashboardCard = ({ title, description, link }: DashboardCardProps) => {
    const navigate = useNavigate();

    return (
        <div
            className="bg-slate-800 p-6 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors"
            onClick={() => navigate(link)}
        >
            <h2 className="text-white text-xl font-bold">{title}</h2>
            <p className="text-slate-400 mt-2">{description}</p>
            <div className="mt-4 text-blue-500 hover:text-blue-400">
                Edit Section &rarr;
            </div>
        </div>
    );
};
