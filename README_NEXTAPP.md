这是一个由[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)引导的[Next.js](https://nextjs.org)项目。

##入门

首先，运行开发服务器：

```bash
npm install
npm run build
#（非npm环境请更改）

npm run dev
#（非npm环境请更改）
```

用浏览器打开[http://localhost:3000](http://localhost:3000)以查看结果。（若要在网站上部署，localhost将替换为你的网站公网ip或域名）

你可以通过修改`app/page.tsx`来开始编辑页面。当你编辑文件时，页面会自动更新。

若没有自动刷新，请运行：
```
pm2 restart next-app
npm run build
#（非npm环境请更改）
```

这个项目使用[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)来自动优化和加载[Geist](https://vercel.com/font)， Vercel的一个新字体家族。

##了解更多

要了解更多关于Next.js的信息，请查看以下资源：

- [Next.js文档](https://nextjs.org/docs) -了解Next.js的功能和API。
-[学习Next.js](https://nextjs.org/learn) -交互式Next.js教程。

你可以查看[Next.js GitHub仓库](https://github.com/vercel/next.js)——欢迎你的反馈和贡献！

##部署到Vercel上

部署你的Next.js应用最简单的方法是使用Next.js创建者的[Vercel平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)。

查看我们的[Next.js部署文档](https://nextjs.org/docs/app/building-your-application/deploying)了解更多细节。

###### 有道词典翻译，做了少许人工修改
