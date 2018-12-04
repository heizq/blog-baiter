---
title: '使用node.js,hexo,github建立个人博客'
date: 2016-03-31 15:30:00
tags:
---

# 使用node.js,hexo,github建立个人博客 

## 安装node.js

1. 下载安装node.js

[https://nodejs.org/en/](https://nodejs.org/en/ "node.js")

## 安装hexo

* 打开官网[https://hexo.io/zh-cn/](https://hexo.io/zh-cn/)

* 选择需要建立博客的路径，例如：我的博客路径：F:\blogs
  进入blogs，打开所在路径的命令行窗口：
<pre><code>
npm install hexo-cli -g
hexo init blog
cd blog
npm install
hexo server
</code></pre>

<!--more-->

* 可以通过访问 localhost:4000 查看博客。

## 安装hexo 主题插件 Next

* 在终端窗口下，定位到 Hexo 站点目录下。使用 Git checkout 代码：
<pre><code>
cd your-hexo-site
git clone https://github.com/iissnan/hexo-theme-next themes/next
</code></pre>

* 如果没有安装git 请先安装git。
* NexT的相关配置请参考[http://theme-next.iissnan.com/getting-started.html](http://theme-next.iissnan.com/getting-started.html)

## github page 

* 登录github，新建 Repository ，设置Name为 yourname.github.io 例如：heizq.github.io
* 将仓库克隆到本地路径下，不要和blog路径在一起。
<pre><code>
git clone https://github.com/username/username.github.io
</code></pre>
* 通过以下命令生成新的博文
<pre><code>
//通过以下命令生成新的博文
hexo new "博文名称"
//生成目标文件
hexo g

</code></pre>
* 将blog 下public 文件夹下的所有文件拷贝到 github仓库中去。
* cd username.github.io
```
git add --all

git commit -m "Initial commit"

git push -u origin master
```

* 这样就可以通过 username.github.io 访问你的博客了。