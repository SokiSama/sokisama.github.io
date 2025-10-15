---
title: macOS环境下使用Hexo搭建个人博客
published: 2025-10-09
updated: 2025-10-12
description: '这个教程将教你如何去在macOS环境下，搭建一个blog'
image: "./cover.jpg"
tags: [建站, 博客,]
category: '教程'
draft: false 
---
> **🔰 适合新手去搭建的个人blog。**


> **⚠️ 本教程只提供框架搭建，安装主题请参考GitHub教程。**

写这篇教程的时候我还在用Hexo，现在转到Astro真香。但还是想把这个教程po上去。一方面是以后打算弄个朴素点的给外人看，另一方面是ntr（

个人习惯用macOS，遂写一份在Mac上利用Hexo搭建个人博客

该教程Windows用户也适用，安装git和node是可视化的，可跳过准备工作

# 准备工作

> **安装 Homebrew**
> 

Homebrew对于程序员来说可以说是必装的软件了，在中国大陆环境下安装需要提前设置环境变量

设置环境变量：

```jsx
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"
```

直接复制到terminal ，enter

运行中科大 Homebrew 安装脚本

```jsx
/bin/bash -c "$(curl -fsSL https://mirrors.ustc.edu.cn/misc/brew-install.sh)"
```

敲两次enter，homebrew安装成功

> **安装 Git 和 Node.js**
> 

重新打开terminal，在terminal中输入

```jsx
brew install git
brew install node
```

如果在安装时出现下载 缓慢 & 失败情况，请自备梯子并开启tun模式，必要时请使用全局代理

> **测试所需组件是否安装成功**
> 

依次输入下面的命令

```jsx
npm -v
node -v
git --version
```

![photo_2025-10-12_01-21-29.jpg](https://camo.githubusercontent.com/4dc413f23451b64c26ff1331f9bfb8916f00b19d3bb4ae302184ffa721b95ca1/68747470733a2f2f702e697069632e7669702f6a38316b6e6f2e706e67)

出现npm、Node.js和git的版本号即代表安装成功

# 本地部署

> **安装 Hexo**
> 

在terminal中输入

```jsx
npm install -g hexo-cli
```

等待安装完成后初始化博客

```jsx
hexo init blog
```

在Finder/home目录下，新建一个名为`blog`的文件夹，并在内初始化你的博客。之后所有的操作都在这个文件夹下进行，请确保在执行后文的操作前已经切换到了这个文件夹（cd blog）

切换到`blog`文件夹中，即可生成和预览博客。

```jsx
cd blog
hexo g
hexo s
```

执行`hexo s`命令后，通过浏览器访问`http://127.0.0.1:4000`可以预览你的博客

![photo_2025-10-12_03-47-34.jpg](https://camo.githubusercontent.com/a794aaaa5dff3d9c73079ebfd1a550235e0f3b166783de7afef7f82898b06f47/68747470733a2f2f702e697069632e7669702f7136726362742e6a7067)

至此，一个简单的hexo博客就已经搭建完了，如果只是想要个本地博客，那到这就可以结束教程了，接下来将讲下怎么去部署到GitHub Pages。

# **部署到GitHub**

> 配置Git用户名和账号
> 

```jsx
git config --global user.name "username"
git config --global user.email "example@example.com"
```

其中 `username` 是你的用户名，`example@example.com`是你 Github 的登录邮箱。

然后通过终端命令生成 SSH Key：

```jsx
ssh-keygen -t rsa -C "example@example.com"
```

执行完成后会在`~/.ssh/id_rsa.pub`目录下生成 需要使用的 key，也就是公钥。

到账户主文件夹下同时按`Command+Shift+.`显示隐藏文件，找到`.ssh`文件夹，打开id_rsa.pub，没有可用的编辑器就去下个VSCode，就算现在不用后面改网页也会用得到。

打开[GitHub_Settings_keys](https://github.com/settings/keys) 页面，新建New SSH Key，Title随意填，Key就把刚才复制的内容全都粘贴上去。然后点Add SSH Key即可。Key type不用管，默认即可

![iShot_2025-10-12_10.35.49 AM.png](https://camo.githubusercontent.com/3bedce184d0aa62a077103789ee869fb09acbff11003ab5b5d1c141740e3930c/68747470733a2f2f702e697069632e7669702f396a347a7a672e706e67)

新增成功后，在终端用下面的命令试下成功没有

```jsx
ssh git@github.com
```

![如图，显示这样就算成功了](https://camo.githubusercontent.com/cba0c9b7ee1f784e86ea981e215b284765086ae1f6d8a18df3d30b2a1290204d/68747470733a2f2f702e697069632e7669702f6464703968692e706e67)

如图，显示这样就算成功了

> **上传至 Github**
> 

在Github上新建一个仓库，Repository Name 填`你的GitHub用户名.github.io`，仓库状态设为 Public，点击 Create Repository 创建新的网站仓库。

安装 Hexo 的扩展 `hexo-deployer-git`，务必在博客文件夹下执行：

```jsx
**npm install hexo-deployer-git --save**
```

****用VSCode打开博客下的的`_config.yml`文件，拖到最下面，修改deploy部分为
****

```jsx
deploy:
type: git
repo: [git@github.com](mailto:git@github.com):你的用户名/你的用户名.github.io.git
branch: master
```

修改完成后按Command + S保存，此时就可以使用`hexo d`把存在本地的博客部署到Github上了：
****记住这两条命令，之后更新网站经常用得到

```jsx
#生成博客
hexo g
#将博客推送到指定的地方，在这里是我们的Github仓库
hexo d
```

> **打开仓库的 Github Pages 功能**
> 

打开仓库的 Settings -> Pages，将 Build and deployment 项下的 Source 设置为「Deploy from a branch」，Branch 选择「master」，单击 Save 保存，Pages 功能就被打开了，每次`hexo d`，更新后的网页都将被自动部署到 Github Pages。

![iShot_2025-10-12_10.54.48 AM.png](https://camo.githubusercontent.com/6fb9a449847cb61f584aebf1ac744e30faeca891746020b2cb81c329aca306da/68747470733a2f2f702e697069632e7669702f763565636a342e706e67)

保存后，打开`你的用户名.github.io`就能看到你的博客了。

至此，你的博客就已经部署在了GitHub上了。剩下的就是创作与上传了。

> **开始写作**
> 

cd到blog目录下，生成一篇新文章：

```jsx
$ hexo new <title>
```

执行后会在`blog/source/_post`文件夹里生成一个名为`<title>.md`的文件，打开它即可使用 Markdown 开始写作，用什么编辑器随你喜好。我用的Notion。

写完后想要上传：

```jsx
#注意以下命令需要切换到blog文件夹(cd blog)执行
$ hexo g
$ hexo d
```

如果没有生效，执行：

`$ hexo clean`

然后再执行上传操作。

Enjoy your write.😜

Fin.