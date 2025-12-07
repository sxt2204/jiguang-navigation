import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Activity, SunMedium, Cloud, CloudSnow, CloudRain, CloudLightning } from 'lucide-react';
import { formatDate, translateCity } from '@/lib/utils';

interface WidgetDashboardProps {
    isDarkMode: boolean;
    sitesCount: number;
}

export const WidgetDashboard = React.memo(function WidgetDashboard({ isDarkMode, sitesCount }: WidgetDashboardProps) {
    // Use null initially to avoid hydration mismatch, set actual time after mount
    const [time, setTime] = useState<Date | null>(null);
    const [locationName, setLocationName] = useState('本地');
    const [weather, setWeather] = useState<any>({ temp: null, code: null, loading: true, error: false });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setTime(new Date()); // Set initial time after mount
        const t = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
                const data = await res.json();
                let city = data.city || data.region || '本地';
                setLocationName(translateCity(city));
            } catch (e) {
                setLocationName('本地');
            }
        };
        fetchLocation();
    }, []);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
                        const data = await res.json();
                        if (data.current_weather) {
                            setWeather({
                                temp: data.current_weather.temperature,
                                code: data.current_weather.weathercode,
                                loading: false,
                                error: false
                            });
                        }
                    } catch (e) {
                        setWeather({ loading: false, error: true });
                    }
                },
                () => {
                    setWeather({ loading: false, error: true });
                }
            );
        } else {
            setWeather({ loading: false, error: true });
        }
    }, []);

    const getWeatherIcon = (code: number) => {
        if (code === 0) return <SunMedium size={24} className="text-orange-500" />;
        if (code >= 1 && code <= 3) return <Cloud size={24} className="text-gray-400" />;
        if ((code >= 45 && code <= 48) || (code >= 51 && code <= 55)) return <CloudSnow size={24}
            className="text-blue-300" />;
        if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return <CloudRain size={24}
            className="text-blue-500" />;
        if (code >= 95) return <CloudLightning size={24} className="text-purple-500" />;
        return <SunMedium size={24} className="text-orange-500" />;
    };

    const getWeatherDesc = (code: number) => {
        if (code === 0) return "晴朗";
        if (code >= 1 && code <= 3) return "多云";
        if (code >= 45 && code <= 48) return "雾";
        if (code >= 51 && code <= 67) return "雨";
        if (code >= 71 && code <= 77) return "雪";
        if (code >= 95) return "雷雨";
        return "未知";
    };

    const widgetClass = `flex flex-col justify-center p-4 rounded-2xl border backdrop-blur-md shadow-sm transition-transform hover:scale-[1.02] active:scale-95 duration-200 ${isDarkMode ? 'bg-slate-800/40 border-white/10' : 'bg-white/60 border-white/60'}`;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={widgetClass}>
                <div className="flex items-center gap-3 mb-1"><Clock size={18} className="text-indigo-500" /><span
                    className="text-xs opacity-60 font-medium">当前时间</span></div>
                <div
                    className="text-2xl font-bold tabular-nums">{mounted && time ? time.toLocaleTimeString('zh-CN', { hour12: false }) : '--:--:--'}</div>
                <div className="text-xs opacity-50">{mounted && time ? formatDate(time) : 'Loading...'}</div>
            </div>
            <div className={widgetClass}>
                <div className="flex items-center gap-3 mb-1">
                    <MapPin size={18} className="text-cyan-500" />
                    <span className="text-xs opacity-60 font-medium">{locationName}天气</span>
                </div>
                {weather.loading ? (
                    <div className="animate-pulse h-8 w-20 bg-gray-200/20 rounded"></div>
                ) : weather.error ? (
                    <>
                        <div className="text-lg font-bold">N/A</div>
                        <div className="text-xs opacity-50">位置未授权</div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">{weather.temp}°C</span>
                            {getWeatherIcon(weather.code)}
                        </div>
                        <div className="text-xs opacity-50">{getWeatherDesc(weather.code)} · 实时同步</div>
                    </>
                )}
            </div>
            <div className={widgetClass}>
                <div className="flex items-center gap-3 mb-1"><Activity size={18} className="text-emerald-500" /><span
                    className="text-xs opacity-60 font-medium">收录统计</span></div>
                <div className="text-2xl font-bold">{sitesCount}</div>
                <div className="text-xs opacity-50">个优质站点</div>
            </div>
        </div>
    )
});
