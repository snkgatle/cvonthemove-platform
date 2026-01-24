import { Skeleton } from '../../../components/Skeleton';

export const DashboardSkeleton = () => {
    return (
        <div className="min-h-screen bg-slate-900">
            <div className="p-8">
                <div className="flex justify-center mb-8">
                    <Skeleton width={200} height={40} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="bg-slate-800 p-6 rounded-lg border border-white/5">
                            <Skeleton width="60%" height={24} className="mb-4" />
                            <Skeleton width="100%" height={16} className="mb-2" />
                            <Skeleton width="100%" height={16} className="mb-4" />
                            <Skeleton width="40%" height={16} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
