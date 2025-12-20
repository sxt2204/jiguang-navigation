import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
interface SyncProgressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onStart: () => void;
    progress: number;
    total: number;
    processed: number;
    skipped: number;
    success: number;
    failed: number;
    status: 'idle' | 'analyzing' | 'syncing' | 'finished';
}

export function SyncProgressModal({
    isOpen,
    onClose,
    onStart,
    progress,
    total,
    processed,
    skipped,
    success,
    failed,
    status
}: SyncProgressModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 w-[90%] max-w-md border border-slate-200 dark:border-slate-800"
                >
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        {status === 'idle' && (
                            <>
                                <RefreshCw className="text-blue-500" size={20} />
                                准备同步
                            </>
                        )}
                        {status === 'analyzing' && (
                            <>
                                <Loader2 className="animate-spin text-purple-500" size={20} />
                                正在分析...
                            </>
                        )}
                        {status === 'syncing' && (
                            <>
                                <Loader2 className="animate-spin text-blue-500" size={20} />
                                正在同步图标...
                            </>
                        )}
                        {status === 'finished' && (
                            <>
                                <CheckCircle2 className="text-emerald-500" size={20} />
                                同步完成
                            </>
                        )}
                    </h3>

                    <div className="h-3 mb-4">
                        <Progress
                            value={progress}
                            className={`h-full transition-opacity duration-300 ${status === 'idle' ? 'opacity-0' : 'opacity-100'}`}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="col-span-2 bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-xl text-center flex items-center justify-between px-6 border border-indigo-100 dark:border-indigo-900/30">
                            <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">总计任务</div>
                            <div className="font-bold text-2xl text-indigo-600 dark:text-indigo-400">{total}</div>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-900/10 p-3 rounded-xl text-center border border-purple-100 dark:border-purple-900/30">
                            <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">需同步</div>
                            <div className="font-bold text-lg text-purple-600 dark:text-purple-400">{total - skipped}</div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-xl text-center border border-blue-100 dark:border-blue-900/30">
                            <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">无需同步</div>
                            <div className="font-bold text-lg text-blue-600 dark:text-blue-400">{skipped}</div>
                        </div>

                        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-3 rounded-xl text-center border border-emerald-100 dark:border-emerald-900/30">
                            <div className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">成功</div>
                            <div className="font-bold text-lg text-emerald-600 dark:text-emerald-400">{success}</div>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-xl text-center border border-red-100 dark:border-red-900/30">
                            <div className="text-xs text-red-600 dark:text-red-400 mb-1">失败</div>
                            <div className="font-bold text-lg text-red-600 dark:text-red-400">{failed}</div>
                        </div>
                    </div>

                    <div className="mt-2">
                        {status === 'idle' ? (
                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                                >
                                    取消
                                </button>
                                <button
                                    onClick={onStart}
                                    className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                                >
                                    开始同步
                                </button>
                            </div>
                        ) : status === 'finished' ? (
                            <button
                                onClick={onClose}
                                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                            >
                                关闭
                            </button>
                        ) : (
                            <button
                                disabled
                                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-400 font-medium cursor-not-allowed dark:bg-slate-800 dark:text-slate-500"
                            >
                                {status === 'analyzing' ? '正在分析任务...' : '正在同步图标...'}
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
