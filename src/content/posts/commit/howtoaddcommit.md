---
title: 基于 Mizuki 主题的 blog 添加 Twikoo 的评论
published: 2025-10-14
pinned: false
description: 本文将配置怎么在你的 blog 中添加评论。
tags: [博客,评论]
category: 教程
image: "./cover.jpg"
licenseName: "CC BY-NC-SA 4.0"
author: Soki
sourceLink: ""
draft: false
---

# 前言

给 Mizuki 主题添加 Twikoo 很简单，Mizuki 官方也写了 [文档](https://docs.mizuki.mysqil.com/config/other-config/#%E5%90%AF%E7%94%A8%E8%AF%84%E8%AE%BA%E7%B3%BB%E7%BB%9F) ，

这里稍微把操作流程完善一下。因为 Mizuki 默认只给 Posts 做了路由，这就导致成功添加 Twikoo 后也只能在文档里做评论。出于我个人有友链交换的需求，四处爬文，并询问了我的好友 [Hoyue](https://hoyue.fun/) 怎么配置的。他给我提供了以下思路 ⬇️

![iShot_2025-10-15_12.29.49 AM.png](https://p.ipic.vip/8pi5kr.png)

因为他用的是 Fuwai + Artalk。和 Mizuki部分文件命名与位置有些不一样。所以在这里我卡了一晚上，最终决定把需求丢给 ChatGPT让它帮我搞，它也是有模有样的给我一些思路，最终我参考了一下成功了。

![iShot_2025-10-15_12.33.32 AM.png](https://p.ipic.vip/cvnzoa.png)


作为前端代码一改就炸的我来说，这也算是一种突破了（笑），扯远了。因为时间原因，网站部分页面进行了修改，为了方便后面来的朋友们怎么去正确配置，接下来我将记录下怎么去配置 Twikoo 评论到 blog里。

# Twikko 配置

参考 Twikko 的文档，这里我们用 [Netlify 部署](https://twikoo.js.org/backend.html#netlify-%E9%83%A8%E7%BD%B2)。

1.首先去申请 [**MongoDB Atlas**](https://twikoo.js.org/mongodb-atlas.html) 账号，这个很简单，注册个账号就行。

2.登陆账号后，进入 dashboard 界面，创建 Free MongoDB 数据库，我的 Vercel 是部署在欧洲的，所以选择欧洲的节点。也可以参考文档说的，区域选择 `AWS / Oregon (us-west-2)`，理由

“该数据中心基建成熟，故障率低，且使用 Oregon 州的清洁能源，较为环保”。

3.数据库创建好后，在左侧 SECURITY 分组下，选择 Database Access，再在右面选择 Add New Database User。在弹出的对话框中配置数据库的密码，可以自己起，也可以点击红框标起的按钮，自动生成一个安全的密码。然后按旁边的 copy 按钮复制密码并妥善保存。下方的 Built-in Role 选 Atlas Admin，最后点击 Add User 完成创建账户

![iShot_2025-10-15_12.50.44 AM.png](https://p.ipic.vip/yfdtbq.png)

4.在下方的 Network Access 页面，点击 Add IP Address 添加网络白名单 ，在 Access List Entry 输入 `0.0.0.0/0` ，点击 Save 保存即可

![image.png](https://p.ipic.vip/xu7c7a.png)

5.回到 DATABASE 下的 Clusters ，点击 Connect ，点击 Drivers ， 直接看第三条 ，选择复制 ，然后妥善保存到你方便找到的地方。<db.password> 就是你刚刚在步骤3设置的密码，改一下就行。

![image.png](https://p.ipic.vip/uhlht5.png)

# Netlify 配置

1.  注册并登录 [**Netlify**](https://app.netlify.com/) 账号，创建一个 Team。

2.  打开 [**twikoojs/twikoo-netlify**](https://github.com/twikoojs/twikoo-netlify) 点击 fork 将仓库 fork 到自己的 GitHub 账号下

3. 打开 Netlify , 选择 Import from git

![image.png](https://p.ipic.vip/48ib0f.png)

4. “Let’s deploy your project with… “ 这里选择 GitHub

5. 选择刚刚 fork 的项目 

![image.png](https://p.ipic.vip/6yqjs1.png)

6.在Environent variables 下选择 Add environment variables 点击 New variable 按钮，Key 输入 `MONGODB_URI`，Value 输入 Twikoo 配置下的 步骤3 的数据库连接字符串，之后点击 Deploy twikoo-netlify 。

![image.png](https://p.ipic.vip/64lgnd.png)

12.等待部署，完成后，在 Project overview 右面，有个绿色的灯亮着，点击那个链接。如果环境配置正确，可以看到 “Twikoo 云函数运行正常” 的提示

![image.png](https://p.ipic.vip/acu57k.png)

> 环境ID就是生成的地址，包含https：// ，前缀和后缀都要输入。
> 

# 本地配置

打开 `src/config.ts` 文件，搜索 `commentConfig` ，将代码改成以下

```jsx
export const commentConfig: CommentConfig = {
  enable: true,  // 是否启用评论功能，false=关闭评论区
  twikoo: {
    envId: "https://app.twikoo.js.org", // Twikoo 环境 ID
  },
};
```

本地运行`pnpm dev`**，**`posts`页面下的文章正常显示评论。

## 在友链下配置留言板

Mizuki 也是只配了 post 的路由，其他页面的路由需要我们自己配，打开 `src/pages/friends.astro` 文件，在 const 变量下 新增一条，如图所示

```jsx
const envId =  "https://app.twikoo.js.org";  // Twikoo 环境 ID
```

![image.png](https://p.ipic.vip/fq4t7t.png)

之后在最下面加一条，如图所示，写在两个 </div> 标签上面。如果你特立孤行想把留言板独立出去。那就写在两个 </div> 标签中间。

```jsx
 <TwikooComment envId={envId} /> 
```

![image 2.png](https://p.ipic.vip/eu6r1s.png)

最后保存文件，再次运行**`pnpm dev`**，可以看到友链下面也有评论区了。自己测试了下，可以正常评论。

![image.png](https://p.ipic.vip/yqkv4y.png)

# 后记

抱着激动的心，提交代码，遇到了一点小插曲，因为我在单位是用笔电开发的，GitHub 那边的 ssh 我又没存忘记了。重新配置完，家里的台式又忘了换 ssh 。导致提交代码的时候出现了这个问题。

```jsx
remote: Invalid username or token. Password authentication is not supported for Git operations.
fatal: Authentication failed for 'https://github.com/SokiSama/sokisama.github.io.git/'
```

网上说的删钥匙串都不管用，最后用了强制删除大法解决

```jsx
git remote -v
git remote set-url origin https://github.com/SokiSama/sokisama.github.io.git //强制删除凭证
git push origin main //提交代码
```

重新输入 GitHub username  和 保存的 ssh 密钥 ，上传成功。