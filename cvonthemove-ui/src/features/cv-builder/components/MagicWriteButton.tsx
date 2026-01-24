import React from 'react';
import { Sparkles, Loader2, Undo2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MagicWriteButtonProps {
    onClick: () => void;
    isLoading: boolean;
    hasSuggestion: boolean;
    onUndo: () => void;
    label?: string;
    className?: string;
}

export const MagicWriteButton: React.FC<MagicWriteButtonProps> = ({
    onClick,
    isLoading,
    hasSuggestion,
    onUndo,
    label = "Magic Write",
    className = ""
}) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClick}
                disabled={isLoading}
                className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-md text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
            >
                {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : (
                    <Sparkles size={16} className="text-purple-200" />
                )}
                {isLoading ? 'Generating...' : label}
            </motion.button>

            <AnimatePresence>
                {hasSuggestion && !isLoading && (
                    <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        type="button"
                        onClick={onUndo}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-md text-sm font-medium border border-white/10 transition-colors"
                        title="Undo suggestion"
                    >
                        <Undo2 size={14} />
                        Undo
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};
