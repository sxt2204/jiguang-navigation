import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface PrivateModeScreenProps {
    isDarkMode: boolean;
    onVerify: (password: string) => Promise<boolean>;
    appConfig: any;
}

export function PrivateModeScreen({ isDarkMode, onVerify, appConfig }: PrivateModeScreenProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const success = await onVerify(password);
        if (!success) {
            setError('密码错误');
            setPassword('');
        }
        setIsLoading(false);
    };

    return (
        <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <div className="text-center max-w-sm w-full">
                {/* Logo */}
                <div className="mb-8">
                    {appConfig.logoImage ? (
                        <img src={appConfig.logoImage} alt="Logo" className="h-16 mx-auto mb-4" />
                    ) : (
                        <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                            {appConfig.logoText}<span className="text-indigo-500">{appConfig.logoHighlight}</span>
                        </div>
                    )}
                </div>

                {/* Lock Icon */}
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-50'}`}>
                    <Lock className="text-indigo-500" size={36} />
                </div>

                <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    私有导航站
                </h2>
                <p className={`text-sm mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    请输入访问密码以查看内容
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="输入访问密码"
                        className={`w-full px-4 py-3 rounded-xl text-center text-lg border-2 outline-none transition-all ${isDarkMode ? 'bg-slate-800 border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500' : 'bg-white border-slate-200 placeholder:text-slate-400 focus:border-indigo-500'} focus:ring-4 focus:ring-indigo-500/10`}
                    />
                    {error && (
                        <p className="text-red-500 text-sm animate-in shake-x">{error}</p>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading || !password}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? '验证中...' : '进入'}
                    </button>
                </form>
            </div>
        </div>
    );
}
