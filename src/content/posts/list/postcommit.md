---
title: 在 blog 页面添加文章统计数据
published: 2025-10-15
updated: 2025-10-15
description: '实现 blog 内文章数据统计'
image: "./cover.jpg"
tags: [统计, 博客,]
category: '教程'
draft: false 
---
# **Astro 博客现代统计组件添加指南**

在浏览别人博客的时候，我们会发现在侧栏有个统计文章的小工具。其实这是一个自定义组件。我们只需要简单几步。就也能在自己的博客实现文章统计。这样会有一种成就感，码字更有动力（？）

本文将以 Mizuki 主题为例，不同主题配置方法如出一辙。

## **1.创建组件文件**

在 src/components/widget/ 下新建文件 BlogStats.astro  将下行代码复制进去并保存 。其中 <div class="icon"> 的内容根据自己需要修改

```
---
---
import { getCollection } from 'astro:content';

const posts = await getCollection('posts');

const postCount = posts.length;
const tags = new Set();
const categories = new Set();
let totalWords = 0;

posts.forEach(post => {
  if (post.data.tags) post.data.tags.forEach(tag => tags.add(tag));
  if (post.data.category) categories.add(post.data.category);
  if (post.body) totalWords += post.body.split(/\s+/).length;
});

const totalWordsInWan = (totalWords / 10000).toFixed(1);
---

<div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2">
  <div class="flex items-center bg-gray-100 dark:bg-[#1e1e2e] p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
    <div class="text-2xl mr-3">📝</div>
    <div>
      <div class="text-sm text-gray-600 dark:text-gray-400">文章数</div>
      <div class="text-lg font-semibold text-gray-900 dark:text-gray-100">{postCount}</div>
    </div>
  </div>

  <div class="flex items-center bg-gray-100 dark:bg-[#1e1e2e] p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
    <div class="text-2xl mr-3">🏷</div>
    <div>
      <div class="text-sm text-gray-600 dark:text-gray-400">标签数</div>
      <div class="text-lg font-semibold text-gray-900 dark:text-gray-100">{tags.size}</div>
    </div>
  </div>

  <div class="flex items-center bg-gray-100 dark:bg-[#1e1e2e] p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
    <div class="text-2xl mr-3">📂</div>
    <div>
      <div class="text-sm text-gray-600 dark:text-gray-400">分类数</div>
      <div class="text-lg font-semibold text-gray-900 dark:text-gray-100">{categories.size}</div>
    </div>
  </div>

  <div class="flex items-center bg-gray-100 dark:bg-[#1e1e2e] p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
    <div class="text-2xl mr-3">✍️</div>
    <div>
      <div class="text-sm text-gray-600 dark:text-gray-400">总字数</div>
      <div class="text-lg font-semibold text-gray-900 dark:text-gray-100">{totalWordsInWan} 万</div>
    </div>
  </div>
</div>
```

---

## **2.修改侧边栏配置**

在 src/config.ts 的 components 数组中添加：

```
{
  type: "blogStats",
  enable: true,
  order: 6,   //顺序    
  position: "sticky",
  class: "onload-animation",
  animationDelay: 100,
}
```

---

## **3. 添加组件映射表**

打开 src/components/widget/sidebar ，在 componentMap 中添加：

```
import BlogStats from './BlogStats.astro'; //添加的

const componentMap = {
  profile: Profile,
  announcement: Announcement,
  categories: Categories,
  tags: Tags,
  toc: TOC,
  "music-player": MusicPlayer,
  blogStats: BlogStats, //添加的
};
```

---

---

## **4.重启 Astro**

```
pnpm run dev
```

刷新页面即可看到已经生成的统计组件，同时适配暗色模式

![image.png](https://p.ipic.vip/9m3zz0.png)


![iShot_2025-10-15_8.36.16 PM.png](https://p.ipic.vip/wuup0p.png)
---