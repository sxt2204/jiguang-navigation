import {
    Globe, Github, Youtube, Twitter, Code, Briefcase, Coffee, Image as ImageIcon, Music,
    MessageSquare, Gamepad, BookOpen, Search, Monitor, Palette, Zap, Cloud, Activity, Lock, User,
    Linkedin, Instagram, Facebook, Twitch, Mail, Rss, MessageCircle
} from 'lucide-react';

// --- Social Icons for Footer ---
export const SOCIAL_ICONS = [
    { id: 'github', name: 'GitHub', icon: Github },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter },
    { id: 'youtube', name: 'YouTube', icon: Youtube },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin },
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'facebook', name: 'Facebook', icon: Facebook },
    { id: 'twitch', name: 'Twitch', icon: Twitch },
    { id: 'mail', name: 'Email', icon: Mail },
    { id: 'rss', name: 'RSS', icon: Rss },
    { id: 'wechat', name: '微信', icon: MessageCircle },
    { id: 'globe', name: '网站', icon: Globe },
];

// --- Fonts ---
export const FONTS = [
    {
        id: 'system',
        name: '系统默认',
        family: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        url: ''
    },
    {
        id: 'noto-sans-sc',
        name: '思源黑体 (现代)',
        family: '"Noto Sans SC", sans-serif',
        url: 'https://fonts.loli.net/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap'
    },
    {
        id: 'noto-serif-sc',
        name: '思源宋体 (优雅)',
        family: '"Noto Serif SC", serif',
        url: 'https://fonts.loli.net/css2?family=Noto+Serif+SC:wght@400;700&display=swap'
    },
    {
        id: 'zcool-kuaile',
        name: '站酷快乐体 (趣味)',
        family: '"ZCOOL KuaiLe", cursive',
        url: 'https://fonts.loli.net/css2?family=ZCOOL+KuaiLe&display=swap'
    },
    {
        id: 'lxgw-wenkai',
        name: '霞鹜文楷 (书写)',
        family: '"LXGW WenKai", sans-serif',
        url: 'https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/style.css'
    },
    {
        id: 'inter',
        name: 'Inter (西文现代)',
        family: '"Inter", sans-serif',
        url: 'https://fonts.loli.net/css2?family=Inter:wght@400;500;600;700&display=swap'
    },
    {
        id: 'poppins',
        name: 'Poppins (几何)',
        family: '"Poppins", sans-serif',
        url: 'https://fonts.loli.net/css2?family=Poppins:wght@400;500;600;700&display=swap'
    },
    {
        id: 'nunito',
        name: 'Nunito (圆润)',
        family: '"Nunito", sans-serif',
        url: 'https://fonts.loli.net/css2?family=Nunito:wght@400;600;700&display=swap'
    },
    {
        id: 'playfair',
        name: 'Playfair (典雅)',
        family: '"Playfair Display", serif',
        url: 'https://fonts.loli.net/css2?family=Playfair+Display:wght@400;600;700&display=swap'
    },
    {
        id: 'roboto-mono',
        name: 'Roboto Mono (代码)',
        family: '"Roboto Mono", monospace',
        url: 'https://fonts.loli.net/css2?family=Roboto+Mono:wght@400;500;700&display=swap'
    },
];

// --- Config ---
export const DEFAULT_APP_CONFIG = {
    siteTitle: '极光导航',
    logoText: '极光',
    logoHighlight: '导航',
    logoImage: '/logo.png',
    footerText: '© {year} JiGuang. Build your own start page.',
    footerLinks: [{ name: 'GitHub', url: 'https://github.com' }, { name: 'Privacy', url: '#' }],
    socialLinks: [{ icon: 'github', url: 'https://github.com' }], // Default social link
    widgetConfig: {
        worldClocks: [
            { name: '纽约', timezone: 'America/New_York' },
            { name: '伦敦', timezone: 'Europe/London' },
            { name: '东京', timezone: 'Asia/Tokyo' },
        ],
        pomodoroDuration: 25, // minutes
    },
    htmlConfig: {
        header: [],
        footer: [],
        headerLayout: 'column', // 'column' | 'row'
        footerLayout: 'column'  // 'column' | 'row'
    },
    privateMode: false // 私有模式：访客需要输入密码才能查看
};

// New: Fresh & Elegant Colors for Pure Background
export const FRESH_BACKGROUND_COLORS = [
    '#F8FAFC', // Slate 50
    '#F0F9FF', // Sky 50
    '#F0FDF4', // Green 50
    '#FEFCE8', // Yellow 50
    '#FEF2F2', // Red 50
    '#FDF4FF', // Fuchsia 50
    '#F5F3FF', // Violet 50
    '#FAFAF9', // Warm Gray 50
    '#ECFEFF', // Cyan 50
    '#FFF7ED'  // Orange 50
];

// New: Elegant Palette for Navigation Pills
export const FRESH_NAV_COLORS = [
    '#3B82F6', // Blue
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#8B5CF6', // Violet
    '#EC4899', // Pink
    '#6366F1', // Indigo
    '#14B8A6'  // Teal
];

export const ICON_MAP: any = {
    Globe: Globe, Github: Github, Youtube: Youtube, Twitter: Twitter, Code: Code, Briefcase: Briefcase,
    Coffee: Coffee, ImageIcon: ImageIcon, Music: Music, MessageSquare: MessageSquare, Gamepad: Gamepad,
    BookOpen: BookOpen, Search: Search, Monitor: Monitor, Palette: Palette, Zap: Zap, Cloud: Cloud,
    Activity: Activity, Lock: Lock, User: User,
};

export const DEFAULT_LAYOUT_SETTINGS = {
    cardHeight: 100,
    cardWidth: 260, // Min width for responsive grid
    gridCols: 4,
    gap: 5,
    glassOpacity: 70,
    isWideMode: false,
    showWidgets: true,
    showNavBar: true,
    stickyHeader: true,
    stickyFooter: false,
    bgEnabled: false,
    bgUrl: '',
    bgType: 'bing', // 'bing' | 'custom' | 'color'
    bgColor: '#F8FAFC', // Default pure background color
    bgOpacity: 40, // Mask opacity
    fontFamily: 'system',
    bgScale: 100, // Default scale 100%
    bgX: 50, // Default center X
    bgY: 50, // Default center Y
    navColorMode: false, // Enable colorful navigation pills
    colorfulCards: false, // Enable colorful site cards
    colorfulMixRatio: 40, // Color mixing ratio (0-100)
    colorfulOpacity: 60, // Gradient overlay opacity (0-100)
    fontSizeScale: 100, // Global Font Size Scale (Percentage)
    compactMode: false, // Compact mode - reduce spacing
    dialogBlur: 12, // Dialog backdrop blur (px)

    // Animation Config
    enableHover: true,
    hoverIntensity: 1, // 0.5 - 2.0
    enableClick: true,
    clickIntensity: 1,
    enableDrag: true,
    dragIntensity: 1,
    enableStagger: true,
    staggerIntensity: 1,
    enableTabSlide: true,
    tabIntensity: 1,
    enableModalAnim: true,
    modalIntensity: 1,

    // Shadow Config
    shadowIntensity: 4, // 0 - 8 (Level)

    // Typography Config (Global)
    globalTitleColor: '', // Empty = Auto/Default
    globalDescColor: '',
    globalTitleFont: 'system',
    globalDescFont: 'system',
    globalTitleSize: 15, // px
    globalDescSize: 12,   // px
    widgetStyle: 'B', // 'A' | 'B' | 'C'
};
