import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { authService } from '../../auth/services/authService';
import { DashboardHeader } from '../../cv-builder/components/DashboardHeader';
import { Lock, AlertCircle, CheckCircle } from 'lucide-react';

const ChangePasswordSchema = z.object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type ChangePasswordForm = z.infer<typeof ChangePasswordSchema>;

export const AccountPage = () => {
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ChangePasswordForm>({
        resolver: zodResolver(ChangePasswordSchema),
    });

    const onSubmit = async (data: ChangePasswordForm) => {
        try {
            setStatus(null);
            await authService.changePassword({
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            });
            setStatus({ type: 'success', message: 'Password changed successfully' });
            reset();
        } catch (error: any) {
            console.error(error);
            const errorMessage = error.response?.data?.error || 'Failed to change password';
            setStatus({ type: 'error', message: errorMessage });
        }
    };

    return (
        <div className="min-h-screen bg-slate-900">
            <DashboardHeader />
            <div className="p-8">
                <div className="max-w-md mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-8 text-center">Account Settings</h1>

                    <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-white/5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <Lock className="w-6 h-6 text-blue-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-white">Change Password</h2>
                        </div>

                        {status && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className={`p-4 rounded-lg mb-6 flex items-start gap-3 ${status.type === 'success' ? 'bg-green-500/10 text-green-200 border border-green-500/20' : 'bg-red-500/10 text-red-200 border border-red-500/20'
                                    }`}
                            >
                                {status.type === 'success' ? <CheckCircle className="w-5 h-5 mt-0.5" /> : <AlertCircle className="w-5 h-5 mt-0.5" />}
                                <p>{status.message}</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Current Password</label>
                                <input
                                    type="password"
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                    {...register('oldPassword')}
                                />
                                {errors.oldPassword && <p className="mt-1 text-sm text-red-400">{errors.oldPassword.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">New Password</label>
                                <input
                                    type="password"
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                    {...register('newPassword')}
                                />
                                {errors.newPassword && <p className="mt-1 text-sm text-red-400">{errors.newPassword.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                    {...register('confirmPassword')}
                                />
                                {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full btn-primary py-2.5 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
