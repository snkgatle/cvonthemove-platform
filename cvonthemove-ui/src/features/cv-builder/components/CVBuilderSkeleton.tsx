import { Skeleton } from '../../../components/Skeleton';

export const CVBuilderSkeleton = () => {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="form-header mb-8">
                <Skeleton width="40%" height={36} className="mb-2" />
                <Skeleton width="60%" height={20} />
            </div>

            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-800 p-6 rounded-lg mb-6 border border-white/5">
                    <Skeleton width="30%" height={28} className="mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Skeleton width="25%" height={16} />
                            <Skeleton width="100%" height={44} />
                        </div>
                        <div className="space-y-2">
                            <Skeleton width="25%" height={16} />
                            <Skeleton width="100%" height={44} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Skeleton width="15%" height={16} />
                            <Skeleton width="100%" height={100} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
