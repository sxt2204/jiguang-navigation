# 🌌 JiGuang Navigation (Aurora Nav) | 极光导航

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![GitHub stars](https://img.shields.io/github/stars/sxt2204/jiguang-navigation.svg?style=social)
![GitHub forks](https://img.shields.io/github/forks/sxt2204/jiguang-navigation.svg?style=social)

**JiGuang Navigation is a modern, highly customizable, and privacy-focused personal start page.**  
**极光导航是一款现代、高度可定制且注重隐私的个人起始页。**

Built with the latest web technologies, it offers a stunning visual experience with glassmorphism design, smooth animations, and powerful features to organize your digital life.  
基于最新的 Web 技术构建，提供极具质感的毛玻璃设计、流畅的动画效果以及强大的功能，助您高效管理数字生活。

---

![效果展示](result.png)

## ✨ Features | 功能特性

### 🎨 Visual Excellence | 极致视觉体验

- **Glassmorphism Design**: Premium frosted glass effects with dynamic lighting and noise textures.  
  **毛玻璃设计**：高级的磨砂玻璃质感，配合动态光效和噪点纹理，质感细腻。

- **Bing Wallpapers**: Daily 4K Sync, Smooth Transitions, and Archive.  
  **必应壁纸**：每日自动同步 4K 超清壁纸，支持平滑淡入动画，并自动存档。

- **Custom Backgrounds**: Support for image uploads, pure colors, and overlay controls.  
  **自定义背景**：支持上传图片、纯色背景，可调节遮罩透明度和模糊度。

- **Theme Switching**: Seamless toggle between Dark and Light modes.  
  **主题切换**：完美适配的日夜间模式切换，所有 UI 元素自动适应。

- **Typography System**: Global font customization with smart inheritance.  
  **排版系统**：全局字体自定义，支持智能继承与系统字体回退。

- **Card Styles**: Adjustable card corner radius (0-24px) & unified folder iconography.  
  **卡片样式**：支持卡片圆角自由调节（0-24px），并采用统一的精致文件夹图标设计。

- **Pill-style UI**: Interactive chip-style elements for breadcrumbs and tags.  
  **胶囊 UI**：面包屑导航及标签采用现代化的胶囊风格设计，交互感更强。

### 🧭 Navigation & Organization | 导航与整理

- **Site Management**: Drag-and-drop sorting, infinite nested folders, and batch organization.  
  **站点管理**：支持拖拽排序、无限层级文件夹嵌套以及批量管理。
  - *Drag to Folder*: Drop sites directly into folder cards.  
    *拖拽归档*：直接将站点拖入文件夹卡片即可归档。
  - *Context Menu*: "Move out of folder" option for quick reorganization.  
    *右键移出*：提供“移出文件夹”选项，快速调整层级。

- **Category System**: Custom categories with visibility control and auto-colors.  
  **分类系统**：自定义分类，支持隐藏/显示及自动分配主题色。

- **Smart Search**: Local filtering and multi-engine support (Persistence enabled).  
  **智能搜索**：实时筛选本地站点，支持切换多种搜索引擎并自动记忆您的偏好。

- **Breadcrumb Navigation**: Interactive pill-style breadcrumbs for folder navigation.  
  **面包屑导航**：交互式胶囊面包屑。
  - *Drag Support*: Drop items onto the "Home" breadcrumb to move them out of folders.  
    *拖拽支持*：支持将项目拖拽至“首页”面包屑以快速移出文件夹。

### 🧩 HTML5 Widgets | HTML5 组件

- **Custom Content**: Add arbitrary HTML content to Header/Footer areas.  
  **自定义内容**：在页头或页脚区域添加任意 HTML 内容。

- **Drag & Drop**: Reorder HTML sections vertically with smooth animations.  
  **拖拽排序**：支持垂直拖拽排序 HTML 区域，拥有流畅的悬浮动画。

- **Visual Editor**: Built-in editor to modify HTML code, height, and width.  
  **可视化编辑**：内置编辑器，可直接修改 HTML 代码、高度和宽度。

### 🛠️ Advanced Customization | 高级定制

- **Layout Settings**: Adjust grid columns, card size, fonts, and compact mode.  
  **布局设置**：调节网格列数、卡片尺寸、字体以及紧凑模式。

- **Site Identity**: Customize logo text, highlight, and footer links.  
  **站点标识**：自定义 Logo 文字、高亮色及页脚链接管理。

- **Icon System**: Auto-fetch favicons, upload images, or use built-in icons.  
  **图标系统**：自动抓取图标，支持上传图片或使用内置图标库。

- **Data Management**: One-click Full Import/Export (including Search Engine & Layout) and batch icon sync.  
  **数据管理**：一键全量导入/导出（含搜索引擎与布局配置），后台批量同步图标缓存。

### 🔒 Privacy & Access Control | 隐私与访问控制

- **Public/Private Mode**: Switch between public access and password-protected private mode.  
  **公私有模式**：一键切换公开访问或密码保护的私有模式。

- **Guest Access**: In Private Mode, visitors need a password to view site content (except for the background).  
  **访客限制**：私有模式下，访客需输入密码方可查看站点内容（壁纸除外）。

### ⚡ Performance & Security | 性能与安全

- **Optimized Icon Sync**: Smart caching and deduplication to minimize storage and bandwidth.  
  **图标同步优化**：智能缓存与去重算法，最小化存储占用与带宽消耗。

- **Optimistic UI**: Instant interactions with background saving.  
  **美观 UI**：操作即时响应，后台异步保存，体验极致流畅。

- **Local First**: Prioritizes local storage for instant loading.  
  **本地优先**：优先加载本地缓存，实现秒开。

- **Admin System**: Secure login to protect settings and layout.  
  **管理系统**：安全的登录验证，保护配置不被篡改。

---

## 🛠️ Tech Stack | 技术栈

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [SQLite](https://www.sqlite.org/) (Default)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Drag & Drop**: [dnd-kit](https://dndkit.com/)

---

## 🚀 Getting Started | 快速开始

### Prerequisites | 前置要求

- Node.js 18+
- npm / yarn / pnpm

### Installation | 安装步骤

1. **Clone the repository | 克隆仓库**
   ```bash
   git clone https://github.com/sxt2204/jiguang-navigation.git
   cd jiguang-navigation
   ```

2. **Install dependencies | 安装依赖**
   ```bash
   npm install
   ```

3. **Setup Database | 设置数据库**
   ```bash
   # Initialize SQLite database | 初始化 SQLite 数据库
   npx prisma db push
   
   # Seed default data | 填充默认数据
   npx prisma db seed
   ```

4. **Run Development Server | 启动开发服务器**
   ```bash
   npm run dev
   ```

5. **Open Browser | 打开浏览器**
   Visit `http://localhost:3000` to see your new start page!  
   访问 `http://localhost:3000` 查看您的新起始页！

---

## 🐳 Docker Deployment | Docker 部署

1. **Build & Run | 构建并运行**
   ```bash
   docker-compose up -d --build
   ```

2. **Access | 访问**
   Open `http://localhost:2266`.  
   打开 `http://localhost:2266`。

---

## 📖 Usage Guide | 使用指南

### Default Admin | 默认管理员

- **Username**: `admin`
- **Password**: `123456`
- *Please change your password immediately after the first login!*  
  *请在首次登录后立即修改密码！*

### Key Operations | 关键操作

- **Edit Mode**: Log in to enable editing features.  
  **编辑模式**：登录后开启编辑功能。

- **Reorder**: Drag and drop sites, categories, or HTML sections.  
  **排序**：拖拽站点、分类或 HTML 区域。

- **Context Menu**: Right-click on any item for options.  
  **右键菜单**：右键点击任意项目获取选项。

- **Settings**: Click the gear icon for global settings.  
  **设置**：点击齿轮图标访问全局设置。

---

## 📄 License | 许可协议

This project is licensed under the Apache 2.0 License.  
本项目基于 Apache 2.0 协议开源。

See the [LICENSE](LICENSE) file for details.  
详见 [LICENSE](LICENSE) 文件。
