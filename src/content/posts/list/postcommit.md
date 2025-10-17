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

本文将以 Mizuki 主题为例，不同主题配置方法如出一辙。具体效果图看参考下图和博客页面。

![merged_image.png](https://p.ipic.vip/50z9ff.png)

在 src/components/widget/ 下新建文件 BlogStats.astro  将下行代码复制进去并保存 。

```
--- 
import { getCollection } from 'astro:content';
import WidgetLayout from "./WidgetLayout.astro";

const posts = await getCollection('posts');

const postCount = posts.length;
const tags = new Set();
const categories = new Set();
let totalWords = 0;

posts.forEach(post => {
  if (post.data.tags) {
    post.data.tags.forEach(tag => {
      tags.add(tag);
    });
  }
  if (post.data.category) {
    categories.add(post.data.category);
  }
  if (post.body) {
    totalWords += post.body.split(/\s+/).length;
  }
});

const totalWordsInWan = (totalWords / 10000).toFixed(1);
---

<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded"
  rel="stylesheet"
/>

<style>
  .material-symbols-rounded {
    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-size: 1.8rem;
    margin-right: 0.75rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .stat-card {
    border-radius: 12px;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    transition: all 0.25s ease;
    background-color: var(--card-bg-color);
    color: var(--card-text-color);
  }

  html.dark .stat-card {
    background-color: transparent;
    color: white;
  }
</style>

<WidgetLayout id="blog-stats">
  <div class="stats-grid">
    {/** 文章数 */}
    <div class="stat-card">
      <span class="material-symbols-rounded">description</span>
      <div>
        <div class="text-sm">文章数</div>
        <div class="text-lg font-semibold">{postCount}</div>
      </div>
    </div>

    {/** 标签数 */}
    <div class="stat-card">
      <span class="material-symbols-rounded">label_important</span>
      <div>
        <div class="text-sm">标签数</div>
        <div class="text-lg font-semibold">{tags.size}</div>
      </div>
    </div>

    {/** 分类数 */}
    <div class="stat-card">
      <span class="material-symbols-rounded">folder</span>
      <div>
        <div class="text-sm">分类数</div>
        <div class="text-lg font-semibold">{categories.size}</div>
      </div>
    </div>

    {/** 总字数 */}
    <div class="stat-card">
      <span class="material-symbols-rounded">edit</span>
      <div>
        <div class="text-sm">总字数</div>
        <div class="text-lg font-semibold">{totalWordsInWan} 万</div>
      </div>
    </div>
  </div>
</WidgetLayout>
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

## **4.重启 Astro**

```
pnpm run dev
```

刷新页面即可看到已经生成的统计组件
