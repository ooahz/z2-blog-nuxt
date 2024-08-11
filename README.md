Z次元博客

个人主页：https://ahzoo.cn

Github：（十玖八柒）https://github.com/ooahz

## Star

喜欢此项目的点点仓库的star吧！
开源版本后续更新频率取决于star数量（关注度），没人关注的话后续就随缘更新了

## 项目技术栈

前端主要技术栈：
Vue3、Nuxt3、Vite、Pinia、TypeScript、Tailwind CSS、SCSS

后端主要技术栈：
JDK21、SpringCloud Alibaba 2023.0.0 全家桶、SpringBoot 3+、Mybatis Plus、Mysql、Redis、ElasticSearch 8+

## 项目运行必要工具

运行项目前，请确认是否已启动下面的工具：
Redis、MySQL、Elasticsearch 8+、Nacos 2.3.0

## 项目运行测试

> 推荐node版本 v20+

```shell
pnpm install
```

运行测试

```shell
pnpm run dev
```
默认访问地址：http://localhost:3200

## 项目部署

1. 构建文件

```shell
pnpm build
```

2. 部署项目

将生成的`.output`文件夹下的文件上传至服务器运行即可
```shell
node index.mjs
```
