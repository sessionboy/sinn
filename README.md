## Profile
  这是一个基于react+koa2技术栈开发的，纯手工、从零开始构建的个人开源博客，准确来说应该是一个小型社区，目前是一个雏形。   
  如果你有足够的时间和精力，完全可以把[sinn](http://sinn.boyagirl.com)拓展为一个比较完备的小型、中型社区。
## 主要技术栈
* 前端:   
```
webpack2, react ,react-router,  dva , material-ui, generator, markdown, fetch, es6, babel
``` 
* 后端:
```
nodejs, koa2, mongoose, es6/7,  async/await
```
*  部署/服务器
```
docker, nginx, linux, 阿里云ecs
```
* cdn存储
```
 阿里云oss,  七牛云存储
```

## HOW TO USE?

#### 一，后端, 需要首先安装和启动sinn-server
本开源项目使用前后端分离的架构，请先启动api server    
sinn-server地址：<https://github.com/sessionboy/sinn-server>

####  二，前端
可以使用git，当然也可以直接download
 ```
git clone git@github.com:sessionboy/sinn.git
```
安装依赖
```
 npm install 
```
或使用淘宝镜像（推荐）
```
npm install --registry=https://registry.npm.taobao.org
```
#### 三，接口代理 proxy ，处理跨域问题（使用默认配置可忽略本项）
* 本项目使用webpack做代理，可避免跨域问题  （限本地开发）  
    
webpack配置地址：/build/webpack.dev.js   ，如下:
```
proxy: {
       '/api' : {
       //  target: 'http://sinn.boyagirl.com:8080',
         target: 'http://localhost:8080',
         secure: false
       },
      }
```
注意：后端默认8080端口，本地启动地址默认为 \* http://localhost:8080 *\，如果你改了server的端口号,或想要代理其他地址，或者是线上地址，把target值替换为你的新代理地址即可     
     
* 线上代理
可根据你的运行环境，使用nginx做接口转发, 配置可参考/nginx文件夹下的nginx配置 (略简单)
    
#### 四，启动
* 开发环境    
```
npm run dev
```
     
* 正式环境     
```
npm start
```

