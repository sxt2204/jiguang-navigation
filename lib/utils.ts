import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAccessibleTextColor = (hexColor: string) => {
  if (!hexColor) return '#000000';
  const r = parseInt(hexColor.substr(1, 2), 16) / 255;
  const g = parseInt(hexColor.substr(3, 2), 16) / 255;
  const b = parseInt(hexColor.substr(5, 2), 16) / 255;
  const getVal = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const L = 0.2126 * getVal(r) + 0.7152 * getVal(g) + 0.0722 * getVal(b);
  return L > 0.55 ? '#0f172a' : '#ffffff';
};

export const shouldUseTextShadow = (textColor: string) => textColor === '#ffffff';

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : {
    r: 0,
    g: 0,
    b: 0
  };
}

export const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString() + Math.random().toString(36).substring(2);
};

export const CITY_TRANSLATIONS: Record<string, string> = {
  'Beijing': '北京', 'Shanghai': '上海', 'Guangzhou': '广州', 'Shenzhen': '深圳',
  'Chengdu': '成都', 'Hangzhou': '杭州', 'Wuhan': '武汉', 'Chongqing': '重庆',
  'Nanjing': '南京', 'Tianjin': '天津', 'Suzhou': '苏州', 'Xi\'an': '西安',
  'Xian': '西安', 'Changsha': '长沙', 'Shenyang': '沈阳', 'Qingdao': '青岛',
  'Zhengzhou': '郑州', 'Dalian': '大连', 'Dongguan': '东莞', 'Ningbo': '宁波',
  'Xiamen': '厦门', 'Fuzhou': '福州', 'Harbin': '哈尔滨', 'Jinan': '济南',
  'Changchun': '长春', 'Wuxi': '无锡', 'Hefei': '合肥', 'Kunming': '昆明',
  'Nanning': '南宁', 'Guiyang': '贵阳', 'Lanzhou': '兰州', 'Haikou': '海口',
  'Nanchang': '南昌', 'Shijiazhuang': '石家庄', 'Urumqi': '乌鲁木齐', 'Taiyuan': '太原',
  'Xining': '西宁', 'Yinchuan': '银川', 'Hohhot': '呼和浩特', 'Lhasa': '拉萨',
  'Hong Kong': '香港', 'Macau': '澳门', 'Taipei': '台北', 'Kaohsiung': '高雄'
};

export const translateCity = (englishName: string) => {
  if (!englishName) return '本地';
  const key = Object.keys(CITY_TRANSLATIONS).find(k => k.toLowerCase() === englishName.toLowerCase());
  if (key) return CITY_TRANSLATIONS[key];
  return englishName;
};

export const FAVICON_PROVIDERS = [
  (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
  (domain: string) => `https://icons.duckduckgo.com/ip3/${domain}.ico`,
  (domain: string) => `https://api.iowen.cn/favicon/${domain}.png`,
];

export const getSimpleFaviconUrl = (url: string) => {
  if (!url) return '';
  try {
    const domain = new URL(url).hostname;
    return FAVICON_PROVIDERS[0](domain);
  } catch (e) {
    return '';
  }
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' }).format(date);
};

// Base64 Noise Texture - Modified: Reduced opacity from 0.4 to 0.2 in SVG for subtler effect
export const NOISE_BASE64 = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.2'/%3E%3C/svg%3E";

export const HARMONIOUS_COLORS = [
  '#3B82F6', '#2563EB', '#6366F1', '#4F46E5', '#0EA5E9', '#06B6D4', '#0891B2', '#475569',
  '#334155', '#64748B', '#8B5CF6', '#A855F7', '#D946EF', '#EC4899', '#F43F5E', '#F97316',
  '#EA580C', '#EF4444', '#DC2626', '#F59E0B', '#10B981', '#059669', '#14B8A6', '#0D9488', '#84CC16'
];

export const getRandomColor = () => HARMONIOUS_COLORS[Math.floor(Math.random() * HARMONIOUS_COLORS.length)];

import { Search, Globe, Github, Code } from 'lucide-react';

export const SEARCH_ENGINES = [
  { id: 'local', name: '本地', icon: Search, placeholder: '筛选本地导航...' },
  { id: 'baidu', name: '百度', icon: Globe, url: 'https://www.baidu.com/s?wd=', placeholder: '百度一下，你就知道' },
  { id: 'google', name: 'Google', icon: Search, url: 'https://www.google.com/search?q=', placeholder: 'Google Search' },
  { id: 'bing', name: 'Bing', icon: Globe, url: 'https://www.bing.com/search?q=', placeholder: 'Bing Search' },
  { id: 'github', name: 'GitHub', icon: Github, url: 'https://github.com/search?q=', placeholder: 'Search GitHub' },
  {
    id: 'luogu',
    name: '洛谷',
    icon: Code,
    url: 'https://www.luogu.com.cn/problem/',
    placeholder: '搜索题目或 Pxxxx 题号'
  },
];

