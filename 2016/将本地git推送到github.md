---
title: 将本地git推送到github
date: 2016-03-31 16:43:09
tags:
---

# 将本地git推送到github

1. 在github创建项目
2. 创建本地git仓库

```
git init # 本地仓库初始化，执行完后会在工程目录下生成一个.git的隐藏目录

git add . # 添加所有文件到本地索引，命令用法：git add file

git commit # 提交修改到本地仓库，可以使用git commit -a 代替git add . 和git commit两条命令

git remote add origin https://github.com/heizq/blog-resource.git  # 添加远程仓库地址，保存在 origin变量中

git pull origin master #如果你让github给你智能生成过gitignore文件的话，那需要先pull一次

git push -u origin master # 推送到上一步创建的github仓库

```