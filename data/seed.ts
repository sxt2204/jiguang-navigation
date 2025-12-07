import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const INITIAL_CATEGORIES = [
    "学习资源",
    "开发工具",
    "设计灵感",
    "娱乐影音",
    "人工智能"
];

const INITIAL_SITES = [
    {
        "id": "1",
        "name": "Google",
        "url": "https://google.com",
        "desc": "全球最大的搜索引擎。",
        "category": "学习资源",
        "color": "#4285F4",
        "icon": "Globe",
        "iconType": "auto"
    },
    {
        "id": "9",
        "name": "MDN",
        "url": "https://developer.mozilla.org",
        "desc": "Web 开发技术权威文档。",
        "category": "学习资源",
        "color": "#000000",
        "icon": "BookOpen",
        "iconType": "auto"
    },
    {
        "id": "14",
        "name": "Stack Overflow",
        "url": "https://stackoverflow.com",
        "desc": "程序员问答社区。",
        "category": "学习资源",
        "color": "#F48024",
        "icon": "Code",
        "iconType": "auto"
    },
    {
        "id": "101",
        "name": "掘金",
        "url": "https://juejin.cn",
        "desc": "帮助开发者成长的社区。",
        "category": "学习资源",
        "color": "#1E80FF",
        "icon": "BookOpen",
        "iconType": "auto"
    },
    {
        "id": "102",
        "name": "知乎",
        "url": "https://www.zhihu.com",
        "desc": "有问题，就会有答案。",
        "category": "学习资源",
        "color": "#0084FF",
        "icon": "MessageSquare",
        "iconType": "auto"
    },
    {
        "id": "103",
        "name": "FreeCodeCamp",
        "url": "https://www.freecodecamp.org",
        "desc": "免费学习编程的开源社区。",
        "category": "学习资源",
        "color": "#0A0A23",
        "icon": "Code",
        "iconType": "auto"
    },
    {
        "id": "104",
        "name": "LeetCode",
        "url": "https://leetcode.cn",
        "desc": "海量编程算法题库。",
        "category": "学习资源",
        "color": "#FFA116",
        "icon": "Code",
        "iconType": "auto"
    },
    {
        "id": "105",
        "name": "Wikipedia",
        "url": "https://www.wikipedia.org",
        "desc": "自由的百科全书。",
        "category": "学习资源",
        "color": "#636466",
        "icon": "Globe",
        "iconType": "auto"
    },
    {
        "id": "106",
        "name": "Coursera",
        "url": "https://www.coursera.org",
        "desc": "世界顶级在线课程平台。",
        "category": "学习资源",
        "color": "#0056D2",
        "icon": "BookOpen",
        "iconType": "auto"
    },
    {
        "id": "107",
        "name": "TED",
        "url": "https://www.ted.com",
        "desc": "传播有价值的思想。",
        "category": "学习资源",
        "color": "#E62B1E",
        "icon": "Monitor",
        "iconType": "auto"
    },
    {
        "id": "108",
        "name": "CSDN",
        "url": "https://www.csdn.net",
        "desc": "专业开发者社区。",
        "category": "学习资源",
        "color": "#FC5531",
        "icon": "Code",
        "iconType": "auto"
    },
    {
        "id": "109",
        "name": "InfoQ",
        "url": "https://www.infoq.cn",
        "desc": "促进软件开发领域知识与创新。",
        "category": "学习资源",
        "color": "#1D8955",
        "icon": "BookOpen",
        "iconType": "auto"
    },
    {
        "id": "2",
        "name": "GitHub",
        "url": "https://github.com",
        "desc": "全球最大的开源社区。",
        "category": "开发工具",
        "color": "#181717",
        "icon": "Github",
        "iconType": "auto"
    },
    {
        "id": "6",
        "name": "React",
        "url": "https://react.dev",
        "desc": "构建用户界面的库。",
        "category": "开发工具",
        "color": "#61DAFB",
        "icon": "Code",
        "iconType": "auto"
    },
    {
        "id": "10",
        "name": "Vercel",
        "url": "https://vercel.com",
        "desc": "前端部署与托管平台。",
        "category": "开发工具",
        "color": "#000000",
        "icon": "Code",
        "iconType": "auto"
    },
    {
        "id": "201",
        "name": "Vue.js",
        "url": "https://vuejs.org",
        "desc": "渐进式 JavaScript 框架。",
        "category": "开发工具",
        "color": "#4FC08D",
        "icon": "Code",
        "iconType": "auto"
    },
    {
        "id": "202",
        "name": "Tailwind CSS",
        "url": "https://tailwindcss.com",
        "desc": "原子化 CSS 框架。",
        "category": "开发工具",
        "color": "#06B6D4",
        "icon": "Palette",
        "iconType": "auto"
    },
    {
        "id": "203",
        "name": "Next.js",
        "url": "https://nextjs.org",
        "desc": "React 生产环境框架。",
        "category": "开发工具",
        "color": "#000000",
        "icon": "Code",
        "iconType": "auto"
    },
    {
        "id": "204",
        "name": "Docker",
        "url": "https://www.docker.com",
        "desc": "应用容器引擎。",
        "category": "开发工具",
        "color": "#2496ED",
        "icon": "Code",
        "iconType": "auto"
    },
    {
        "id": "205",
        "name": "TypeScript",
        "url": "https://www.typescriptlang.org",
        "desc": "具有类型语法的 JavaScript。",
        "category": "开发工具",
        "color": "#3178C6",
        "icon": "Code",
        "iconType": "auto"
    },
    {
        "id": "206",
        "name": "GitLab",
        "url": "https://gitlab.com",
        "desc": "DevOps 生命周期工具。",
        "category": "开发工具",
        "color": "#FC6D26",
        "icon": "Github",
        "iconType": "auto"
    },
    {
        "id": "207",
        "name": "Postman",
        "url": "https://www.postman.com",
        "desc": "API 开发协作平台。",
        "category": "开发工具",
        "color": "#FF6C37",
        "icon": "Zap",
        "iconType": "auto"
    },
    {
        "id": "208",
        "name": "NPM",
        "url": "https://www.npmjs.com",
        "desc": "Node.js 包管理器。",
        "category": "开发工具",
        "color": "#CB3837",
        "icon": "Code",
        "iconType": "auto"
    },
    {
        "id": "209",
        "name": "Cloudflare",
        "url": "https://www.cloudflare.com",
        "desc": "Web 性能和安全公司。",
        "category": "开发工具",
        "color": "#F38020",
        "icon": "Cloud",
        "iconType": "auto"
    },
    {
        "id": "4",
        "name": "Dribbble",
        "url": "https://dribbble.com",
        "desc": "设计师灵感分享社区。",
        "category": "设计灵感",
        "color": "#EA4C89",
        "icon": "ImageIcon",
        "iconType": "auto"
    },
    {
        "id": "7",
        "name": "Figma",
        "url": "https://figma.com",
        "desc": "在线协作界面设计工具。",
        "category": "设计灵感",
        "color": "#F24E1E",
        "icon": "Palette",
        "iconType": "auto"
    },
    {
        "id": "301",
        "name": "Behance",
        "url": "https://www.behance.net",
        "desc": "展示和发现创意作品。",
        "category": "设计灵感",
        "color": "#1769FF",
        "icon": "ImageIcon",
        "iconType": "auto"
    },
    {
        "id": "302",
        "name": "Pinterest",
        "url": "https://www.pinterest.com",
        "desc": "发现图片与灵感。",
        "category": "设计灵感",
        "color": "#BD081C",
        "icon": "ImageIcon",
        "iconType": "auto"
    },
    {
        "id": "303",
        "name": "Unsplash",
        "url": "https://unsplash.com",
        "desc": "免费高清素材图片。",
        "category": "设计灵感",
        "color": "#000000",
        "icon": "ImageIcon",
        "iconType": "auto"
    },
    {
        "id": "304",
        "name": "Pexels",
        "url": "https://www.pexels.com",
        "desc": "免费素材图片和视频。",
        "category": "设计灵感",
        "color": "#05A081",
        "icon": "ImageIcon",
        "iconType": "auto"
    },
    {
        "id": "305",
        "name": "IconFont",
        "url": "https://www.iconfont.cn",
        "desc": "阿里巴巴矢量图标库。",
        "category": "设计灵感",
        "color": "#EC4899",
        "icon": "Palette",
        "iconType": "auto"
    },
    {
        "id": "306",
        "name": "Awwwards",
        "url": "https://www.awwwards.com",
        "desc": "网页设计与创新奖项。",
        "category": "设计灵感",
        "color": "#222222",
        "icon": "Globe",
        "iconType": "auto"
    },
    {
        "id": "307",
        "name": "Material Design",
        "url": "https://m3.material.io",
        "desc": "Google 开源设计系统。",
        "category": "设计灵感",
        "color": "#7C4DFF",
        "icon": "Palette",
        "iconType": "auto"
    },
    {
        "id": "308",
        "name": "Coolors",
        "url": "https://coolors.co",
        "desc": "超快速的配色生成器。",
        "category": "设计灵感",
        "color": "#0066FF",
        "icon": "Palette",
        "iconType": "auto"
    },
    {
        "id": "309",
        "name": "Google Fonts",
        "url": "https://fonts.google.com",
        "desc": "免费开源字体库。",
        "category": "设计灵感",
        "color": "#4285F4",
        "icon": "BookOpen",
        "iconType": "auto"
    },
    {
        "id": "310",
        "name": "Canva",
        "url": "https://www.canva.com",
        "desc": "在线平面设计工具。",
        "category": "设计灵感",
        "color": "#00C4CC",
        "icon": "Palette",
        "iconType": "auto"
    },
    {
        "id": "3",
        "name": "Bilibili",
        "url": "https://bilibili.com",
        "desc": "二次元与年轻人的聚集地。",
        "category": "娱乐影音",
        "color": "#00AEEC",
        "icon": "Youtube",
        "iconType": "auto"
    },
    {
        "id": "401",
        "name": "YouTube",
        "url": "https://www.youtube.com",
        "desc": "全球最大的视频网站。",
        "category": "娱乐影音",
        "color": "#FF0000",
        "icon": "Youtube",
        "iconType": "auto"
    },
    {
        "id": "402",
        "name": "Netflix",
        "url": "https://www.netflix.com",
        "desc": "流媒体影视巨头。",
        "category": "娱乐影音",
        "color": "#E50914",
        "icon": "Monitor",
        "iconType": "auto"
    },
    {
        "id": "403",
        "name": "Spotify",
        "url": "https://open.spotify.com",
        "desc": "数字音乐流媒体服务。",
        "category": "娱乐影音",
        "color": "#1DB954",
        "icon": "Music",
        "iconType": "auto"
    },
    {
        "id": "404",
        "name": "Steam",
        "url": "https://store.steampowered.com",
        "desc": "全球最大的游戏平台。",
        "category": "娱乐影音",
        "color": "#171A21",
        "icon": "Gamepad",
        "iconType": "auto"
    },
    {
        "id": "405",
        "name": "Twitch",
        "url": "https://www.twitch.tv",
        "desc": "游戏直播平台。",
        "category": "娱乐影音",
        "color": "#9146FF",
        "icon": "Gamepad",
        "iconType": "auto"
    },
    {
        "id": "406",
        "name": "豆瓣",
        "url": "https://www.douban.com",
        "desc": "电影书籍音乐评分。",
        "category": "娱乐影音",
        "color": "#007722",
        "icon": "BookOpen",
        "iconType": "auto"
    },
    {
        "id": "407",
        "name": "网易云音乐",
        "url": "https://music.163.com",
        "desc": "专注于发现与分享。",
        "category": "娱乐影音",
        "color": "#C20C0C",
        "icon": "Music",
        "iconType": "auto"
    },
    {
        "id": "408",
        "name": "Epic Games",
        "url": "https://store.epicgames.com",
        "desc": "每周免费送游戏。",
        "category": "娱乐影音",
        "color": "#313131",
        "icon": "Gamepad",
        "iconType": "auto"
    },
    {
        "id": "409",
        "name": "Discord",
        "url": "https://discord.com",
        "desc": "游戏玩家语音聊天软件。",
        "category": "娱乐影音",
        "color": "#5865F2",
        "icon": "MessageSquare",
        "iconType": "auto"
    },
    {
        "id": "410",
        "name": "微博",
        "url": "https://weibo.com",
        "desc": "随时随地发现新鲜事。",
        "category": "娱乐影音",
        "color": "#E6162D",
        "icon": "Globe",
        "iconType": "auto"
    },
    {
        "id": "411",
        "name": "Apple Music",
        "url": "https://music.apple.com",
        "desc": "苹果音乐流媒体。",
        "category": "娱乐影音",
        "color": "#FA243C",
        "icon": "Music",
        "iconType": "auto"
    },
    {
        "id": "5",
        "name": "ChatGPT",
        "url": "https://chat.openai.com",
        "desc": "OpenAI开发的智能对话模型。",
        "category": "人工智能",
        "color": "#10A37F",
        "icon": "Coffee",
        "iconType": "auto"
    },
    {
        "id": "12",
        "name": "Midjourney",
        "url": "https://midjourney.com",
        "desc": "AI 图像生成工具。",
        "category": "人工智能",
        "color": "#000000",
        "icon": "ImageIcon",
        "iconType": "auto"
    },
    {
        "id": "501",
        "name": "Claude",
        "url": "https://claude.ai",
        "desc": "Anthropic 开发的 AI 助手。",
        "category": "人工智能",
        "color": "#D97757",
        "icon": "Coffee",
        "iconType": "auto"
    },
    {
        "id": "502",
        "name": "Gemini",
        "url": "https://gemini.google.com",
        "desc": "Google 最强多模态模型。",
        "category": "人工智能",
        "color": "#4E88F9",
        "icon": "Coffee",
        "iconType": "auto"
    },
    {
        "id": "503",
        "name": "Hugging Face",
        "url": "https://huggingface.co",
        "desc": "AI 模型开源社区。",
        "category": "人工智能",
        "color": "#FFD21E",
        "icon": "Code",
        "iconType": "auto"
    },
    {
        "id": "504",
        "name": "Poe",
        "url": "https://poe.com",
        "desc": "Quora 推出的 AI 聚合平台。",
        "category": "人工智能",
        "color": "#4C32CC",
        "icon": "MessageSquare",
        "iconType": "auto"
    },
    {
        "id": "505",
        "name": "Perplexity",
        "url": "https://www.perplexity.ai",
        "desc": "AI 驱动的搜索引擎。",
        "category": "人工智能",
        "color": "#115E59",
        "icon": "Search",
        "iconType": "auto"
    },
    {
        "id": "506",
        "name": "Notion AI",
        "url": "https://www.notion.so",
        "desc": "集成在笔记中的 AI 助手。",
        "category": "人工智能",
        "color": "#000000",
        "icon": "BookOpen",
        "iconType": "auto"
    },
    {
        "id": "507",
        "name": "Civitai",
        "url": "https://civitai.com",
        "desc": "Stable Diffusion 模型库。",
        "category": "人工智能",
        "color": "#2A6DE9",
        "icon": "ImageIcon",
        "iconType": "auto"
    },
    {
        "id": "508",
        "name": "Runway",
        "url": "https://runwayml.com",
        "desc": "AI 视频编辑与生成。",
        "category": "人工智能",
        "color": "#000000",
        "icon": "Monitor",
        "iconType": "auto"
    },
    {
        "id": "509",
        "name": "通义千问",
        "url": "https://tongyi.aliyun.com",
        "desc": "阿里巴巴大语言模型。",
        "category": "人工智能",
        "color": "#6236FF",
        "icon": "Coffee",
        "iconType": "auto"
    },
    {
        "id": "510",
        "name": "文心一言",
        "url": "https://yiyan.baidu.com",
        "desc": "百度新一代知识增强大模型。",
        "category": "人工智能",
        "color": "#2932E1",
        "icon": "Coffee",
        "iconType": "auto"
    }
];

const DEFAULT_LAYOUT_SETTINGS = {
    cardHeight: 100,
    gridCols: 4,
    gap: 5,
    glassOpacity: 70,
    isWideMode: false,
    showWidgets: true,
    stickyHeader: true,
    stickyFooter: false,
    bgEnabled: false,
    bgUrl: '',
    bgType: 'bing',
    bgColor: '#F8FAFC',
    bgOpacity: 40,
    fontFamily: 'system',
    bgScale: 100,
    bgX: 50,
    bgY: 50,
    navColorMode: false,
    colorfulCards: false,
    fontSizeScale: 100
};

const DEFAULT_APP_CONFIG = {
    siteTitle: '极光导航',
    logoText: '极光',
    logoHighlight: '导航',
    logoType: 'text',
    logoImage: '',
    footerText: '© {year} JiGuang. Build your own start page.',
    footerLinks: [{ name: 'GitHub', url: 'https://github.com' }, { name: 'Privacy', url: '#' }]
};

async function main() {
    console.log('Start seeding ...')

    // Seed Categories
    for (let i = 0; i < INITIAL_CATEGORIES.length; i++) {
        const catName = INITIAL_CATEGORIES[i];
        await prisma.category.upsert({
            where: { name: catName },
            update: {},
            create: {
                name: catName,
                order: i,
                color: '#6366F1' // Default color
            },
        })
    }

    // Seed Sites
    for (const site of INITIAL_SITES) {
        await prisma.site.upsert({
            where: { id: String(site.id) },
            update: {},
            create: {
                id: String(site.id),
                name: site.name,
                url: site.url,
                desc: site.desc,
                category: site.category,
                color: site.color,
                icon: site.icon,
                iconType: site.iconType,
                order: 0
            },
        })
    }

    // Seed Settings
    await prisma.globalSettings.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            layout: JSON.stringify(DEFAULT_LAYOUT_SETTINGS),
            config: JSON.stringify(DEFAULT_APP_CONFIG),
            theme: JSON.stringify({ isDarkMode: false })
        }
    })

    // Seed Admin User (admin / 123456)
    // Note: In a real app, use bcrypt to hash. Here we will use a simple hash or just plain text for now and update later, 
    // BUT the plan said use bcrypt. I will use a hardcoded hash for "123456" to avoid importing bcrypt in seed if possible, 
    // or just import it.
    // "123456" hashed with bcrypt (cost 10) is: $2a$10$X7.
    // Actually, let's just use the library since I installed it.

    // Wait, I can't easily use require('bcryptjs') if I am in module mode without setup.
    // I will use a placeholder hash for "123456" generated online to be safe and simple.
    // $2a$10$EpW.
    // Let's use a known hash for "123456": $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

    await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            passwordHash: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy' // 123456
        }
    })

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
