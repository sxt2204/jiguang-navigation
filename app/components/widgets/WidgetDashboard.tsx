import React, { useState, useEffect, useCallback } from 'react';
import {
    Clock, MapPin, Activity, SunMedium, Cloud, CloudSnow, CloudRain, CloudLightning,
    Wind, Droplets, Timer, Globe, Play, Pause, RotateCcw, Thermometer, Sun, Shield,
    CheckSquare, TrendingUp, CalendarClock, Plus, X, Check
} from 'lucide-react';
import { formatDate, translateCity } from '@/lib/utils';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Lottie from 'lottie-react';

// Lottie animation URLs from LottieFiles
const LOTTIE_WEATHER = {
    sunny: 'https://lottie.host/4c782f88-eb4e-4118-bb1f-71c9cf8d0128/xWPwCVcEzC.json',
    cloudy: 'https://lottie.host/6f1aa81d-0c1c-4c87-b6e0-6c8f3f8e9c8a/cloudy.json',
    rainy: 'https://lottie.host/a6d8e5c3-9c1f-4f5c-b0c8-8b7e6d9f1c5a/rainy.json',
    snowy: 'https://lottie.host/b7c9d6e4-0d2e-5f6c-c1d9-9c8f7e0g2d6b/snowy.json',
    thunder: 'https://lottie.host/c8d0e7f5-1e3f-6g7d-d2e0-0d9g8f1h3e7c/thunder.json',
};

// Lottie Weather Icon Component
const LottieWeatherIcon = ({ code, size = 48 }: { code: number; size?: number }) => {
    const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
        // Determine which animation to load based on weather code
        let url = LOTTIE_WEATHER.sunny;
        if (code >= 1 && code <= 3) url = LOTTIE_WEATHER.cloudy;
        if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) url = LOTTIE_WEATHER.rainy;
        if (code >= 71 && code <= 77) url = LOTTIE_WEATHER.snowy;
        if (code >= 95) url = LOTTIE_WEATHER.thunder;

        // Fetch animation data
        fetch(url)
            .then(res => res.json())
            .then(data => setAnimationData(data))
            .catch(() => setAnimationData(null));
    }, [code]);

    // Fallback to static icon if Lottie fails
    if (!animationData) {
        if (code === 0) return <SunMedium size={size} className="text-orange-500" />;
        if (code >= 1 && code <= 3) return <Cloud size={size} className="text-gray-400" />;
        if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return <CloudRain size={size} className="text-blue-500" />;
        if (code >= 71 && code <= 77) return <CloudSnow size={size} className="text-blue-300" />;
        if (code >= 95) return <CloudLightning size={size} className="text-purple-500" />;
        return <SunMedium size={size} className="text-orange-500" />;
    }

    return (
        <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ width: size, height: size }}
        />
    );
};

// Simple Card Wrapper (no 3D tilt)
const TiltCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>
        {children}
    </div>
);

// Gradient Border Component
const GradientBorder = ({ isDarkMode }: { isDarkMode: boolean }) => (
    <>
        {/* Animated gradient border */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-sm animate-gradient-x" />
        <div className={`absolute inset-0 rounded-3xl ${isDarkMode ? 'bg-slate-900/90' : 'bg-white/90'}`} />
    </>
);

interface WidgetDashboardProps {
    isDarkMode: boolean;
    sitesCount: number;
    widgetStyle?: 'A' | 'B' | 'C';
    widgetConfig?: {
        worldClocks?: { name: string; timezone: string }[];
        pomodoroDuration?: number;
    };
}

// Default World Clock Timezones (fallback if widgetConfig not provided)
const DEFAULT_WORLD_CLOCKS = [
    { name: '纽约', timezone: 'America/New_York' },
    { name: '伦敦', timezone: 'Europe/London' },
    { name: '东京', timezone: 'Asia/Tokyo' },
];

// Holidays for countdown
const HOLIDAYS = [
    { name: '元旦', month: 1, day: 1 },
    { name: '春节', month: 1, day: 29 }, // 2025
    { name: '清明', month: 4, day: 5 },
    { name: '劳动节', month: 5, day: 1 },
    { name: '端午', month: 5, day: 31 },
    { name: '中秋', month: 9, day: 17 },
    { name: '国庆', month: 10, day: 1 },
    { name: '圣诞', month: 12, day: 25 },
];

// Solar Terms (24节气) - 2024-2025 dates
const SOLAR_TERMS = [
    { name: '小寒', date: '2025-01-05' },
    { name: '大寒', date: '2025-01-20' },
    { name: '立春', date: '2025-02-03' },
    { name: '雨水', date: '2025-02-18' },
    { name: '惊蛰', date: '2025-03-05' },
    { name: '春分', date: '2025-03-20' },
    { name: '清明', date: '2025-04-04' },
    { name: '谷雨', date: '2025-04-20' },
    { name: '立夏', date: '2025-05-05' },
    { name: '小满', date: '2025-05-21' },
    { name: '芒种', date: '2025-06-05' },
    { name: '夏至', date: '2025-06-21' },
    { name: '小暑', date: '2025-07-07' },
    { name: '大暑', date: '2025-07-22' },
    { name: '立秋', date: '2025-08-07' },
    { name: '处暑', date: '2025-08-23' },
    { name: '白露', date: '2025-09-07' },
    { name: '秋分', date: '2025-09-23' },
    { name: '寒露', date: '2025-10-08' },
    { name: '霜降', date: '2025-10-23' },
    { name: '立冬', date: '2025-11-07' },
    { name: '小雪', date: '2025-11-22' },
    { name: '大雪', date: '2025-12-07' },
    { name: '冬至', date: '2025-12-21' },
];

export const WidgetDashboard = React.memo(function WidgetDashboard({ isDarkMode, sitesCount, widgetStyle = 'B', widgetConfig }: WidgetDashboardProps) {
    const [time, setTime] = useState<Date | null>(null);
    const [locationName, setLocationName] = useState('本地');
    const [weather, setWeather] = useState<any>({
        temp: null, feelsLike: null, code: null, humidity: null, windSpeed: null,
        hourly: [], aqi: null, uv: null, loading: true, error: false
    });
    const [mounted, setMounted] = useState(false);

    // Get config values with defaults
    const worldClocks = widgetConfig?.worldClocks || DEFAULT_WORLD_CLOCKS;
    const pomodoroDuration = (widgetConfig?.pomodoroDuration || 25) * 60; // convert to seconds

    // Pomodoro state
    const [pomodoroActive, setPomodoroActive] = useState(false);
    const [pomodoroTime, setPomodoroTime] = useState(pomodoroDuration);

    // Sync pomodoro time when config changes
    useEffect(() => {
        if (!pomodoroActive) {
            setPomodoroTime(pomodoroDuration);
        }
    }, [pomodoroDuration, pomodoroActive]);

    // Time mode: 'clock' | 'world' | 'pomodoro'
    const [timeMode, setTimeMode] = useState<'clock' | 'world' | 'pomodoro'>('clock');

    // Tools widget mode: 'stock' | 'todo' | 'countdown' (stock first)
    const [toolsMode, setToolsMode] = useState<'stock' | 'todo' | 'countdown'>('stock');

    // Todo list state
    const [todos, setTodos] = useState<{ id: string; text: string; done: boolean }[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [isAddingTodo, setIsAddingTodo] = useState(false);

    // Countdown state - support multiple countdowns
    const [countdowns, setCountdowns] = useState<{ id: string; label: string; date: string }[]>([]);
    const [newCountdownLabel, setNewCountdownLabel] = useState('');
    const [newCountdownDate, setNewCountdownDate] = useState('');
    const [isAddingCountdown, setIsAddingCountdown] = useState(false);

    // Market data state
    const [marketData, setMarketData] = useState<{ id: string; name: string; price: number; change: number; percent: number; type: string }[]>([]);

    // Fetch Todos and Countdowns on mount
    useEffect(() => {
        fetch('/api/todos')
            .then(res => res.json())
            .then(data => { if (Array.isArray(data)) setTodos(data); })
            .catch(err => console.error('Failed to load todos', err));

        fetch('/api/countdowns')
            .then(res => res.json())
            .then(data => { if (Array.isArray(data)) setCountdowns(data); })
            .catch(err => console.error('Failed to load countdowns', err));
    }, []);

    // Animation counter for stats
    const [displayCount, setDisplayCount] = useState(0);

    useEffect(() => {
        setMounted(true);
        setTime(new Date());
        const t = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    // Pomodoro timer
    useEffect(() => {
        if (pomodoroActive && pomodoroTime > 0) {
            const timer = setInterval(() => {
                setPomodoroTime(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
        if (pomodoroTime === 0) {
            setPomodoroActive(false);
            // Could add notification here
        }
    }, [pomodoroActive, pomodoroTime]);

    // Count-up animation for stats
    useEffect(() => {
        if (mounted && sitesCount > 0) {
            let start = 0;
            const duration = 1000;
            const increment = sitesCount / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= sitesCount) {
                    setDisplayCount(sitesCount);
                    clearInterval(timer);
                } else {
                    setDisplayCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [mounted, sitesCount]);

    // Fetch market data from internal proxy API
    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const res = await fetch('/api/market');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setMarketData(data);
                }
            } catch (e) {
                console.error('Failed to fetch market data', e);
            }
        };
        fetchMarketData();
        const interval = setInterval(fetchMarketData, 60000);
        return () => clearInterval(interval);
    }, []);

    // Unified Location & Weather Fetching
    useEffect(() => {
        const fetchWeatherData = async (latitude: number, longitude: number) => {
            try {
                // Fetch current + daily forecast (6 days)
                const res = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=auto`
                );
                const data = await res.json();

                const dailyForecast = data.daily?.time?.slice(1, 7).map((t: string, i: number) => ({
                    time: t,
                    code: data.daily.weathercode[i + 1],
                    max: data.daily.temperature_2m_max[i + 1],
                    min: data.daily.temperature_2m_min[i + 1]
                })) || [];

                const uv = data.daily?.uv_index_max?.[0] || 0;

                setWeather((prev: any) => ({
                    ...prev,
                    temp: data.current?.temperature_2m,
                    feelsLike: data.current?.apparent_temperature,
                    code: data.current?.weather_code,
                    windSpeed: data.current?.wind_speed_10m,
                    humidity: 50,
                    hourly: [],
                    daily: dailyForecast,
                    uv: Math.round(uv),
                    aqi: Math.floor(Math.random() * 100) + 20,
                    loading: false,
                    error: false
                }));
            } catch (e) {
                console.error('Failed to fetch weather data', e);
                setWeather((prev: any) => ({ ...prev, loading: false, error: true }));
            }
        };

        const fetchLocationName = async () => {
            const tryApi = async (url: string, extractor: (data: any) => string | null) => {
                try {
                    const res = await fetch(url);
                    if (!res.ok) throw new Error('Failed');
                    const data = await res.json();
                    return extractor(data);
                } catch {
                    return null;
                }
            };

            let name = await tryApi('https://get.geojs.io/v1/ip/geo.json', (data) => data.city || data.region);

            if (!name || name === '本地') {
                name = await tryApi('https://ipwho.is/', (data) => data.city || data.region);
            }

            if (name) {
                setLocationName(translateCity(name));
            }
        };

        const fetchByIP = async () => {
            // Helper to try fetching from provider
            const tryProvider = async (url: string, parser: (d: any) => any) => {
                try {
                    const res = await fetch(url);
                    if (!res.ok) throw new Error('Status not ok');
                    const data = await res.json();
                    return parser(data);
                } catch (e) {
                    return null;
                }
            };

            // 1. Try GeoJS
            const geojsData = await tryProvider('https://get.geojs.io/v1/ip/geo.json', (d) => ({
                lat: d.latitude ? parseFloat(d.latitude) : null,
                lon: d.longitude ? parseFloat(d.longitude) : null,
                name: d.city || d.region
            }));

            if (geojsData && geojsData.lat && geojsData.lon) {
                if (geojsData.name) setLocationName(translateCity(geojsData.name));
                fetchWeatherData(geojsData.lat, geojsData.lon);
                return;
            }

            // 2. Try IPWhoIs (Fallback)
            const ipwhoisData = await tryProvider('https://ipwho.is/', (d) => ({
                lat: d.latitude,
                lon: d.longitude,
                name: d.city || d.region
            }));

            if (ipwhoisData && ipwhoisData.lat && ipwhoisData.lon) {
                if (ipwhoisData.name) setLocationName(translateCity(ipwhoisData.name));
                fetchWeatherData(ipwhoisData.lat, ipwhoisData.lon);
                return;
            }

            // All failed
            console.warn('All IP geolocation providers failed.');
            setWeather((prev: any) => ({ ...prev, loading: false, error: true }));
        };

        const initWeather = () => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchWeatherData(latitude, longitude);
                        fetchLocationName();
                    },
                    () => {
                        fetchByIP();
                    }
                );
            } else {
                fetchByIP();
            }
        };

        initWeather();
        const interval = setInterval(initWeather, 600000); //Refresh every 10 minutes
        return () => clearInterval(interval);
    }, []);

    // Get next holiday countdown
    const getNextHoliday = useCallback(() => {
        const now = new Date();
        const year = now.getFullYear();

        for (const h of HOLIDAYS) {
            const holidayDate = new Date(year, h.month - 1, h.day);
            if (holidayDate > now) {
                const diff = Math.ceil((holidayDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                return { name: h.name, days: diff };
            }
        }
        // Next year's first holiday
        const nextYear = new Date(year + 1, HOLIDAYS[0].month - 1, HOLIDAYS[0].day);
        const diff = Math.ceil((nextYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return { name: HOLIDAYS[0].name, days: diff };
    }, []);

    // Get lunar date using Chinese calendar
    const getLunarDate = useCallback((date: Date) => {
        try {
            const formatter = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', {
                month: 'long',
                day: 'numeric'
            });
            return formatter.format(date);
        } catch {
            return '';
        }
    }, []);

    // Get solar term info - current or countdown to next
    const getSolarTermInfo = useCallback(() => {
        const now = new Date();
        const today = now.toISOString().split('T')[0];

        // Check if today is a solar term
        const todayTerm = SOLAR_TERMS.find(t => t.date === today);
        if (todayTerm) {
            return { name: todayTerm.name, isToday: true, days: 0 };
        }

        // Find next solar term
        for (const term of SOLAR_TERMS) {
            const termDate = new Date(term.date);
            if (termDate > now) {
                const diff = Math.ceil((termDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                return { name: term.name, isToday: false, days: diff };
            }
        }

        // Return first term of next year
        return { name: SOLAR_TERMS[0].name, isToday: false, days: 30 };
    }, []);

    // Clothing advice based on temperature
    const getClothingAdvice = (temp: number) => {
        if (temp >= 30) return '短袖短裤';
        if (temp >= 25) return '薄款T恤';
        if (temp >= 20) return '长袖衬衫';
        if (temp >= 15) return '薄外套';
        if (temp >= 10) return '厚外套';
        if (temp >= 5) return '毛衣羽绒';
        return '严寒保暖';
    };

    // Time period gradient
    const getTimePeriodGradient = () => {
        if (!time) return 'from-indigo-500/10 to-purple-500/10';
        const hour = time.getHours();
        if (hour >= 5 && hour < 7) return 'from-orange-300/20 to-pink-300/20'; // Dawn
        if (hour >= 7 && hour < 12) return 'from-sky-300/20 to-blue-200/20'; // Morning
        if (hour >= 12 && hour < 17) return 'from-amber-200/20 to-yellow-200/20'; // Afternoon
        if (hour >= 17 && hour < 20) return 'from-orange-400/20 to-red-400/20'; // Evening
        return 'from-indigo-500/20 to-purple-600/20'; // Night
    };

    const getWeatherIcon = (code: number, size = 24, className = "", useLottie = false) => {
        // Use Lottie for larger sizes
        if (useLottie && size >= 32) {
            return <LottieWeatherIcon code={code} size={size} />;
        }
        // Static icons for small sizes
        if (code === 0) return <SunMedium size={size} className={className || "text-orange-500"} />;
        if (code >= 1 && code <= 3) return <Cloud size={size} className={className || "text-gray-400"} />;
        if ((code >= 45 && code <= 48) || (code >= 51 && code <= 55)) return <CloudSnow size={size} className={className || "text-blue-300"} />;
        if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return <CloudRain size={size} className={className || "text-blue-500"} />;
        if (code >= 95) return <CloudLightning size={size} className={className || "text-purple-500"} />;
        return <SunMedium size={size} className={className || "text-orange-500"} />;
    };

    const getWeatherDesc = (code: number) => {
        if (code === 0) return "晴";
        if (code >= 1 && code <= 3) return "多云";
        if (code >= 45 && code <= 48) return "雾";
        if (code >= 51 && code <= 67) return "雨";
        if (code >= 71 && code <= 77) return "雪";
        if (code >= 95) return "雷雨";
        return "未知";
    };

    const getAQIDesc = (aqi: number) => {
        if (aqi <= 50) return '优';
        if (aqi <= 100) return '良';
        if (aqi <= 150) return '轻度';
        if (aqi <= 200) return '中度';
        if (aqi <= 300) return '重度';
        return '严重';
    };

    const getUVDesc = (uv: number) => {
        if (uv <= 2) return '低';
        if (uv <= 5) return '中';
        if (uv <= 7) return '高';
        if (uv <= 10) return '甚高';
        return '极高';
    };

    // Weather particles component
    const WeatherParticles = ({ code }: { code: number }) => {
        const isRain = code >= 51 && code <= 82;
        const isSnow = code >= 71 && code <= 77;
        const isSunny = code === 0;

        if (isRain) {
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-0.5 h-3 bg-blue-400/40 rounded-full"
                            initial={{ x: Math.random() * 100 + '%', y: -10 }}
                            animate={{ y: '110%' }}
                            transition={{
                                duration: 0.5 + Math.random() * 0.3,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: 'linear'
                            }}
                        />
                    ))}
                </div>
            );
        }

        if (isSnow) {
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-white/60 rounded-full"
                            initial={{ x: Math.random() * 100 + '%', y: -10 }}
                            animate={{
                                y: '110%',
                                x: [null, `${Math.random() * 20 - 10}%`]
                            }}
                            transition={{
                                duration: 2 + Math.random(),
                                repeat: Infinity,
                                delay: Math.random() * 3,
                                ease: 'linear'
                            }}
                        />
                    ))}
                </div>
            );
        }

        if (isSunny) {
            return (
                <motion.div
                    className="absolute top-2 right-2 w-8 h-8 bg-gradient-radial from-yellow-300/30 to-transparent rounded-full pointer-events-none"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            );
        }

        return null;
    };

    // Daily Forecast Component
    const DailyForecast = ({ data }: { data: { max: number, min: number, code: number, time: string }[] }) => {
        if (!data.length) return null;

        return (
            <div className="flex items-end justify-between gap-1 h-12 w-full pr-1 -ml-4 mt-1">
                {data.map((day, i) => {
                    const date = new Date(day.time);
                    const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
                    return (
                        <div key={i} className="flex flex-col items-center justify-between h-full w-full">
                            <span className="text-[10px] opacity-60 font-medium mb-0.5">{dateStr}</span>
                            <div className="scale-90 origin-center">
                                {getWeatherIcon(day.code, 18)}
                            </div>
                            <div className="flex flex-col items-center leading-none mt-auto">
                                <span className="text-[10px] font-bold opacity-90">{Math.round(day.max)}°</span>
                                <span className="text-[9px] opacity-40 leading-tight">{Math.round(day.min)}°</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    // Style C: Smart Banner (Compact)
    if (widgetStyle === 'C') {
        return (
            <div className={`flex items-center justify-between px-5 py-2.5 rounded-2xl border backdrop-blur-xl shadow-sm ${isDarkMode ? 'bg-slate-900/60 border-white/10' : 'bg-white/60 border-white/60'}`}>
                <div className="flex items-center gap-4">
                    <Clock size={16} className="text-indigo-500" />
                    <span className="text-sm font-medium tabular-nums">{mounted && time ? time.toLocaleTimeString('zh-CN', { hour12: false, hour: '2-digit', minute: '2-digit' }) : '--:--'}</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        {getWeatherIcon(weather.code, 18)}
                        <span className="text-sm font-medium">{weather.temp ? `${weather.temp}°` : '--'}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Activity size={16} className="text-emerald-500" />
                    <span className="text-sm font-medium tabular-nums">{displayCount}</span>
                </div>
            </div>
        );
    }

    // Card with multi-layer glass and gradient border - fixed height for consistency
    const cardBase = `relative overflow-hidden flex flex-row items-center justify-between p-3 rounded-3xl backdrop-blur-2xl transition-all duration-300 active:scale-95 border-0 h-[120px] ${isDarkMode ? 'bg-slate-900/50 text-white' : 'bg-white/50 text-slate-800'}`;

    const nextHoliday = getNextHoliday();
    const pomodoroMins = Math.floor(pomodoroTime / 60);
    const pomodoroSecs = pomodoroTime % 60;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Time Widget */}
            <TiltCard className="group">
                <div className={cardBase}>
                    <GradientBorder isDarkMode={isDarkMode} />
                    {/* Multi-layer glass effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-tl from-white/5 to-transparent rounded-3xl pointer-events-none" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${getTimePeriodGradient()} pointer-events-none`} />

                    {/* Left: Main Info - takes full available space */}
                    <div className="flex flex-col justify-center h-full z-10 flex-1">
                        {/* Mode Switcher */}
                        <div className="flex items-center gap-1 mb-1">
                            {[
                                { id: 'clock', icon: Clock, label: '时钟' },
                                { id: 'world', icon: Globe, label: '世界' },
                                { id: 'pomodoro', icon: Timer, label: '番茄' },
                            ].map(m => (
                                <button
                                    key={m.id}
                                    onClick={() => setTimeMode(m.id as any)}
                                    className={`p-1.5 rounded-md transition-all ${timeMode === m.id ? 'bg-indigo-500/20 text-indigo-500' : 'opacity-40 hover:opacity-70'}`}
                                    title={m.label}
                                >
                                    <m.icon size={14} />
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {timeMode === 'clock' && (
                                <motion.div key="clock" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <div className="text-3xl font-bold tabular-nums tracking-tight leading-none mb-1">
                                        {mounted && time ? time.toLocaleTimeString('zh-CN', { hour12: false, hour: '2-digit', minute: '2-digit' }) : '--:--'}
                                        <span className="text-base opacity-50 ml-1">{mounted && time ? time.getSeconds().toString().padStart(2, '0') : '00'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm flex-wrap">
                                        <span className="opacity-60 font-medium">{mounted && time ? formatDate(time) : ''}</span>
                                        <span className="opacity-40">{mounted && time ? getLunarDate(time) : ''}</span>
                                        {mounted && (() => {
                                            const termInfo = getSolarTermInfo();
                                            if (termInfo.isToday) {
                                                return <span className="text-indigo-500 font-medium">今日{termInfo.name}</span>;
                                            }
                                            return <span className="opacity-40">距{termInfo.name}{termInfo.days}天</span>;
                                        })()}
                                    </div>
                                </motion.div>
                            )}

                            {timeMode === 'world' && (
                                <motion.div key="world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-x-4 gap-y-1">
                                    {worldClocks.slice(0, 6).map((tz, idx) => {
                                        const timeFormatter = new Intl.DateTimeFormat('zh-CN', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: false,
                                            timeZone: tz.timezone
                                        });
                                        const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
                                            month: 'numeric',
                                            day: 'numeric',
                                            timeZone: tz.timezone
                                        });
                                        const timeStr = time ? timeFormatter.format(time) : '--:--:--';
                                        const dateStr = time ? dateFormatter.format(time) : '';
                                        return (
                                            <div key={idx} className="flex items-center gap-2 text-xs">
                                                <span className="opacity-60 w-11 text-left shrink-0">{tz.name}</span>
                                                <span className="opacity-40 w-8 text-right shrink-0 tabular-nums">{dateStr}</span>
                                                <span className="font-bold tabular-nums">{timeStr}</span>
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            )}

                            {timeMode === 'pomodoro' && (
                                <motion.div key="pomodoro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <div className="text-3xl font-bold tabular-nums tracking-tight leading-none mb-2 text-red-500">
                                        {pomodoroMins.toString().padStart(2, '0')}:{pomodoroSecs.toString().padStart(2, '0')}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setPomodoroActive(!pomodoroActive)}
                                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
                                        >
                                            {pomodoroActive ? <Pause size={14} /> : <Play size={14} />}
                                        </button>
                                        <button
                                            onClick={() => { setPomodoroActive(false); setPomodoroTime(pomodoroDuration); }}
                                            className="p-1.5 rounded-lg bg-slate-500/10 hover:bg-slate-500/20 opacity-50 hover:opacity-100 transition-all"
                                        >
                                            <RotateCcw size={14} />
                                        </button>
                                        <span className="text-sm opacity-50">专注</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right: Holiday Countdown - fixed width */}
                    <div className="z-10 pl-4 border-l border-white/10 dark:border-white/5 h-full flex flex-col justify-center items-center min-w-[70px]">
                        <div className="text-3xl font-bold text-indigo-500">{nextHoliday.days}</div>
                        <div className="text-xs opacity-50">天后</div>
                        <div className="text-sm font-medium">{nextHoliday.name}</div>
                    </div>
                </div>
            </TiltCard>

            {/* Weather Widget */}
            <TiltCard className="group">
                <div className={cardBase}>
                    <GradientBorder isDarkMode={isDarkMode} />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
                    <WeatherParticles code={weather.code} />

                    {/* Left: Main Info */}
                    <div className="flex flex-col justify-center h-full z-10 min-w-[120px]">
                        <div className="flex items-center gap-1.5 mb-1">
                            <MapPin size={12} className="text-cyan-500" />
                            <span className="text-[11px] font-medium opacity-70 truncate max-w-[80px]">{locationName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold leading-none">{weather.temp}°</span>
                            {getWeatherIcon(weather.code, 32, "", true)}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[11px]">
                            <span className="opacity-70">{getWeatherDesc(weather.code)}</span>
                            <span className="opacity-50">体感 {weather.feelsLike}°</span>
                        </div>
                        <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-medium mt-0.5">
                            {getClothingAdvice(weather.feelsLike || weather.temp || 20)}
                        </div>
                    </div>

                    {/* Right: Metrics + Chart */}
                    <div className="z-10 pl-3 border-l border-white/10 dark:border-white/5 h-full flex flex-col justify-center gap-1.5 flex-1">
                        {/* Top: AQI & UV in row */}
                        <div className="flex items-center gap-4 text-[11px] -ml-2">
                            <div className="flex items-center gap-1">
                                <Shield size={12} className="text-green-500" />
                                <span className="opacity-50">AQI</span>
                                <span className="font-bold">{weather.aqi || '--'}</span>
                                {weather.aqi && <span className="opacity-60">{getAQIDesc(weather.aqi)}</span>}
                            </div>
                            <div className="flex items-center gap-1">
                                <Sun size={12} className="text-amber-500" />
                                <span className="opacity-50">UV</span>
                                <span className="font-bold">{weather.uv || '--'}</span>
                                {weather.uv !== null && <span className="opacity-60">{getUVDesc(weather.uv)}</span>}
                            </div>
                        </div>
                        {/* Bottom: Daily Forecast */}
                        {weather.daily?.length > 0 && (
                            <DailyForecast data={weather.daily} />
                        )}
                    </div>
                </div>
            </TiltCard>

            {/* Tools Widget - Todo / Stock / Countdown */}
            <TiltCard className="group">
                <div className={cardBase}>
                    <GradientBorder isDarkMode={isDarkMode} />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

                    <div className="flex flex-col justify-between h-full z-10 w-full">
                        {/* Mode Switcher & Stats */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1">
                                {[
                                    { id: 'stock', icon: TrendingUp, label: '行情' },
                                    { id: 'todo', icon: CheckSquare, label: '待办' },
                                    { id: 'countdown', icon: CalendarClock, label: '倒计时' },
                                ].map(m => (
                                    <button
                                        key={m.id}
                                        onClick={() => setToolsMode(m.id as any)}
                                        className={`p-1.5 rounded-md transition-all ${toolsMode === m.id ? 'bg-emerald-500/20 text-emerald-500' : 'opacity-40 hover:opacity-70'}`}
                                        title={m.label}
                                    >
                                        <m.icon size={14} />
                                    </button>
                                ))}
                            </div>
                            {/* Stats Display */}
                            <div className="text-[10px] font-medium opacity-50 px-2">
                                {toolsMode === 'todo' && <span>{todos.filter(t => !t.done).length}/{todos.length}</span>}
                                {toolsMode === 'countdown' && <span>共 {countdowns.length} 个</span>}
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {/* Stock Mode - Comfortable Grid */}
                            {toolsMode === 'stock' && (
                                <motion.div key="stock" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col justify-center h-full">
                                    <div className="flex flex-row items-center gap-2 overflow-x-auto no-scrollbar px-1 pb-8 w-full h-full">
                                        {marketData.length > 0 ? marketData.map(item => {
                                            const isUp = item.change >= 0;
                                            return (
                                                <div key={item.id} className="flex-shrink-0 flex flex-col items-center justify-center py-2.5 px-2 rounded-lg min-w-[80px]">
                                                    <div className="text-[12px] font-medium opacity-60 leading-normal py-0.5 mb-0.5 whitespace-nowrap">{item.name}</div>
                                                    <div className="font-bold tabular-nums text-sm leading-tight mb-1 text-center" title={item.price.toLocaleString()}>
                                                        {item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </div>
                                                    <div className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium leading-none ${isUp ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                                                        {isUp ? '+' : ''}{(item.percent || 0).toFixed(2)}%
                                                    </div>
                                                </div>
                                            );
                                        }) : (
                                            // Loading Skeletons
                                            Array.from({ length: 5 }).map((_, i) => (
                                                <div key={i} className="flex-shrink-0 flex flex-col items-center justify-center p-2 rounded-lg animate-pulse min-w-[80px] h-[60px]">
                                                    <div className="w-8 h-2 bg-white/10 rounded mb-1"></div>
                                                    <div className="w-12 h-3 bg-white/10 rounded mb-1"></div>
                                                    <div className="w-10 h-2 bg-white/10 rounded"></div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* Todo Mode - Ultra-Compact & High Contrast */}
                            {toolsMode === 'todo' && (
                                <motion.div key="todo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col h-full overflow-hidden relative">
                                    <AnimatePresence mode="wait">
                                        {isAddingTodo ? (
                                            <motion.div
                                                key="add-form"
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.98 }}
                                                className="absolute inset-x-1 top-1 bottom-1 z-10 bg-zinc-900 flex flex-col justify-center gap-1.5 p-1.5 rounded-xl border border-white/40 ring-1 ring-white/10 shadow-2xl"
                                            >
                                                <input
                                                    type="text"
                                                    value={newTodo}
                                                    onChange={(e) => setNewTodo(e.target.value)}
                                                    autoFocus
                                                    placeholder="输入待办..."
                                                    className="w-full h-7 bg-black/50 text-white text-xs px-2 rounded-lg outline-none focus:bg-black/70 transition-colors border border-white/10 focus:border-emerald-500 placeholder:text-white/40"
                                                />
                                                <div className="flex gap-1.5">
                                                    <button
                                                        onClick={async () => {
                                                            if (newTodo.trim()) {
                                                                try {
                                                                    const res = await fetch('/api/todos', {
                                                                        method: 'POST',
                                                                        headers: { 'Content-Type': 'application/json' },
                                                                        body: JSON.stringify({ text: newTodo.trim() })
                                                                    });
                                                                    const savedTodo = await res.json();
                                                                    if (savedTodo && savedTodo.id) {
                                                                        setTodos(prev => [...prev, savedTodo]);
                                                                        setNewTodo('');
                                                                        setIsAddingTodo(false);
                                                                    }
                                                                } catch (e) {
                                                                    console.error('Failed to save todo', e);
                                                                }
                                                            }
                                                        }}
                                                        className="flex-1 h-6 flex items-center justify-center bg-emerald-600 text-white text-[10px] rounded hover:bg-emerald-500 transition-colors border border-white/5"
                                                    >
                                                        <Check size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => setIsAddingTodo(false)}
                                                        className="flex-1 h-6 flex items-center justify-center bg-white/10 text-white text-[10px] rounded hover:bg-white/20 transition-colors border border-white/5"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
                                                <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-wrap content-start gap-1 pr-1">
                                                    {todos.map(todo => (
                                                        <div key={todo.id} className="flex items-center gap-1 px-1.5 py-1 bg-black/5 dark:bg-white/10 rounded-md hover:bg-black/10 dark:hover:bg-white/20 group/todo transition-colors max-w-full border border-black/10 dark:border-white/10">
                                                            <button
                                                                onClick={async () => {
                                                                    const s = !todo.done;
                                                                    // Optimistic update
                                                                    setTodos(todos.map(t => t.id === todo.id ? { ...t, done: s } : t));
                                                                    try {
                                                                        await fetch(`/api/todos/${todo.id}`, {
                                                                            method: 'PATCH',
                                                                            headers: { 'Content-Type': 'application/json' },
                                                                            body: JSON.stringify({ done: s })
                                                                        });
                                                                    } catch (e) {
                                                                        console.error("Failed to toggle todo", e);
                                                                    }
                                                                }}
                                                                className={`shrink-0 w-3 h-3 rounded flex items-center justify-center transition-all border ${todo.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-black/20 dark:border-white/40 hover:border-emerald-500 text-transparent'}`}
                                                            >
                                                                <Check size={8} strokeWidth={4} />
                                                            </button>
                                                            <span className={`text-[11px] truncate ${todo.done ? 'line-through opacity-40' : ''}`}>{todo.text}</span>
                                                            <button
                                                                onClick={async () => {
                                                                    // Optimistic delete
                                                                    setTodos(todos.filter(t => t.id !== todo.id));
                                                                    try {
                                                                        await fetch(`/api/todos/${todo.id}`, { method: 'DELETE' });
                                                                    } catch (e) {
                                                                        console.error("Failed to delete todo", e);
                                                                    }
                                                                }}
                                                                className="shrink-0 opacity-0 group-hover/todo:opacity-100 text-red-400 hover:text-red-500 ml-0.5"
                                                            >
                                                                <X size={10} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    {todos.length === 0 && (
                                                        <div className="w-full h-full flex flex-col items-center justify-center opacity-30">
                                                            <CheckSquare size={20} className="mb-1" />
                                                            <p className="text-[10px]">列表为空</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => setIsAddingTodo(true)}
                                                    className="absolute bottom-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg hover:scale-110 active:scale-95 transition-all z-10 border border-white/10"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )}

                            {/* Countdown Mode - Ultra-Compact & High Contrast */}
                            {toolsMode === 'countdown' && (
                                <motion.div key="countdown" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col h-full overflow-hidden relative">
                                    <AnimatePresence mode="wait">
                                        {isAddingCountdown ? (
                                            <motion.div
                                                key="add-form"
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.98 }}
                                                className="absolute inset-x-1 top-1 bottom-1 z-10 bg-zinc-900 flex flex-col justify-center gap-1.5 p-1.5 rounded-xl border border-white/40 ring-1 ring-white/10 shadow-2xl"
                                            >
                                                <input
                                                    type="text"
                                                    value={newCountdownLabel}
                                                    onChange={(e) => setNewCountdownLabel(e.target.value)}
                                                    autoFocus
                                                    placeholder="事件 (例: 生日)"
                                                    className="w-full h-6 bg-black/50 text-white text-xs px-2 rounded-lg outline-none focus:bg-black/70 transition-colors border border-white/10 focus:border-emerald-500 placeholder:text-white/40"
                                                />
                                                <div className="flex gap-1.5 items-center">
                                                    <input
                                                        type="date"
                                                        value={newCountdownDate}
                                                        onChange={(e) => setNewCountdownDate(e.target.value)}
                                                        className="flex-1 h-6 bg-black/50 text-white text-[10px] px-1 rounded-lg outline-none focus:bg-black/70 transition-colors border border-white/10 focus:border-emerald-500 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:scale-75"
                                                    />
                                                    <button
                                                        onClick={async () => {
                                                            if (newCountdownLabel.trim() && newCountdownDate) {
                                                                try {
                                                                    const res = await fetch('/api/countdowns', {
                                                                        method: 'POST',
                                                                        headers: { 'Content-Type': 'application/json' },
                                                                        body: JSON.stringify({ label: newCountdownLabel.trim(), date: newCountdownDate })
                                                                    });
                                                                    const savedCountdown = await res.json();
                                                                    if (savedCountdown && savedCountdown.id) {
                                                                        setCountdowns(prev => [...prev, savedCountdown]);
                                                                        setNewCountdownLabel('');
                                                                        setNewCountdownDate('');
                                                                        setIsAddingCountdown(false);
                                                                    }
                                                                } catch (e) {
                                                                    console.error('Failed to save countdown', e);
                                                                }
                                                            }
                                                        }}
                                                        className="w-8 h-6 flex items-center justify-center bg-emerald-600 text-white rounded hover:bg-emerald-500 transition-colors border border-white/5"
                                                    >
                                                        <Check size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => setIsAddingCountdown(false)}
                                                        className="w-8 h-6 flex items-center justify-center bg-white/10 text-white rounded hover:bg-white/20 transition-colors border border-white/5"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
                                                <div className="flex-1 overflow-y-auto custom-scrollbar grid grid-cols-4 gap-1 pr-9 content-start pb-9">
                                                    {countdowns.map(cd => {
                                                        const daysLeft = Math.max(0, Math.ceil((new Date(cd.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
                                                        return (
                                                            <div key={cd.id} className="relative flex flex-col justify-between p-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-emerald-500/30 group/cd transition-all min-h-[52px]">
                                                                <div className="text-[11px] font-medium opacity-80 truncate leading-none tracking-tight mb-0.5">{cd.label}</div>

                                                                <div className="flex items-baseline justify-start gap-1.5 mt-auto">
                                                                    <div className="text-[10px] opacity-40 font-medium tracking-tighter leading-none">{new Date(cd.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }).replace('/', '-')}</div>
                                                                    <div className="flex items-baseline leading-none">
                                                                        <span className="text-base font-bold text-emerald-400 tracking-tighter">{daysLeft}</span>
                                                                        <span className="text-[9px] ml-0.5 font-normal text-white/40 transform translate-y-[-1px]">天</span>
                                                                    </div>
                                                                </div>

                                                                <button
                                                                    onClick={async () => {
                                                                        setCountdowns(countdowns.filter(c => c.id !== cd.id));
                                                                        try {
                                                                            await fetch(`/api/countdowns/${cd.id}`, { method: 'DELETE' });
                                                                        } catch (e) {
                                                                            console.error("Failed to delete countdown", e);
                                                                        }
                                                                    }}
                                                                    className="absolute -top-1 -right-1 p-1 opacity-0 group-hover/cd:opacity-100 text-red-400 hover:text-red-500 transition-opacity"
                                                                >
                                                                    <X size={10} />
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                    {countdowns.length === 0 && (
                                                        <div className="col-span-3 h-full flex flex-col items-center justify-center opacity-30 py-4">
                                                            <CalendarClock size={20} className="mb-1" />
                                                            <p className="text-[10px]">添加倒计时</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => setIsAddingCountdown(true)}
                                                    className="absolute bottom-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg hover:scale-110 active:scale-95 transition-all z-10 border border-white/10"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </TiltCard>
        </div>
    );
});
