## 简介
   sinn是一个基于react+koa2+docker技术栈开发的，从零开始构建的个人开源项目。    
   目标是要打造一个小型社区，目前是一个雏形。
   
  测试demo: http://test.boyagirl.com   

  测试体验账号—用户: sinn  密码：123456

  已上线地址：http://sinn.boyagirl.com    

 ( 开源重点在于技术分享和交流，如果觉得可以，右上角点颗星星喔~ ) 
  
## 技术选型
* 前端:   
```
webpack3, react ,react-router,  dva , material-ui, generator, markdown, fetch, es6, babel
``` 
* 后端:
```
nodejs, koa2, mongoose, es6/7,  async/await,  Resful API
```
*  部署/服务器
```
docker, nginx, linux, 阿里云ecs
```
* 云存储
```
 阿里云oss,  七牛云存储
```       
### 技术栈亮点  
*  react前沿技术栈，组件化、高性能的工程化开发模式

*  koa2+mongodb，可快速构建 node 后端服务

*  使用 async/await 终极异步处理方案

*  前沿的docker容器化部署方案

*  dllPlugin和commonsChunkPlugin双重拆分，更快的构建速度和更小的体积
  
### 效果图如下:
<img src="http://sinn.oss-cn-shenzhen.aliyuncs.com/images/58d7777bc1a5bd0001672cdashow2.jpg" />
<img src="http://sinn.oss-cn-shenzhen.aliyuncs.com/images/58d7777bc1a5bd0001672cdashow3.jpg" />
<img src="http://sinn.oss-cn-shenzhen.aliyuncs.com/images/58d7777bc1a5bd0001672cdashow1.jpg" />
## HOW TO USE?

#### 一，后端, 需要首先安装和启动sinn-server

* sinn-server地址：https://github.com/sessionboy/sinn-server

* 后端跑起来后，需要登录管理后台，然后在分类管理中添加一级分类，二级分类

* 可参考我的测试demo: http://servertest.boyagirl.com    
  测试账户: sinn  密码：admin

####  二，前端
可以使用git，当然也可以直接download
 ```
git clone git@github.com:sessionboy/sinn.git
```
安装依赖
```
 npm install 或者 yarn
```
或使用淘宝镜像（推荐）
```
npm install --registry=https://registry.npm.taobao.org
```
#### 三，设置webpack代理 ，处理跨域问题（使用默认配置可忽略本项）
- 本地开发
 1, 通过设置proxy代理，可来避免跨域问题
  2, webpack配置地址：/build/webpack.dev.js   ，如下:
```
proxy: {
       '/api' : {
       //  target: 'http://sinn.boyagirl.com:8080',
         target: 'http://localhost:8080',
         secure: false
       },
      }  
```   
* 线上代理
可根据你的运行环境，使用nginx做接口转发, 配置可参考/nginx文件夹下的nginx配置 (略简单，可自行拓展)。也可以在后端设置cors来避免跨域问题。
    
#### 四，项目启动      
* 开发环境    
     
```     
npm run dev  或者 yarn dev
```   
     
* 正式环境 (打包构建)    
     
```   
npm start 或者 yarn start  
```   
```    
<!-- 
注意，由于使用了dllPlugin将react、react-dom等公共包抽离了出来(具体打包在build/dll目录下)，
如果你的公共模块有升级，请执行yarn dll或npm run dll来构建新的公共包。
被抽离的公共包有：react、react-dom、material-ui、dva。    
-->   
```

#### 五，如何开启redux调试？
 dva封装了redux-logger，可用于调试，默认不开启，当你想要使用时也很简单    

 修改/src/index.js， 把24行的注释去掉即可
```
const app = dva({
  history:browserHistory,
  //onAction: createLogger(),  // 去掉注释可开启redux调试
  onError(e){
     // dva提供的统一错误处理机制
     // 由于在/src/utils/request做了统一处理，这里不再做处理
  }
});
```

#### 六，项目部署

* 脚本化一键发布 ，使用rsync ，同步代码到远程服务器 .(mac和linux)      
   
```
# 使用前，请根据你的服务器配置，修改脚本release.sh的配置 
sh release.sh
```

* 如果你使用的是window，需安装[cwrsync](https://www.itefix.net/cwrsync)，命令执行同上 .      
      
* nginx部署       
    
  推荐使用nginx做前端部署，具体配置可参考/nginx文件夹下的相关配置(略简单，可自行拓展) .    
      
## 关于 webpack

* 构建脚本:   webpack.config.js、 webpack.dll.config.js、/build/* 

* 使用dllPlugin和commonsChunkPlugin做双重拆分，构建速度快，支持热更新。

* 后续考虑加入[tree-shaking](https://webpack.js.org/guides/tree-shaking/#components/sidebar/sidebar.jsx) 和 [prepack](https://prepack.io/)  
* 后续尝试在现有基础上，按功能模块进行拆分打包，极致优化

## 关于 dva 和 redux  
#### 一，[dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)是什么？为什么不使用[redux](http://cn.redux.js.org/index.html)？ 
     
 也许很多人不知道dva。  
[dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)是蚂蚁金服开源的，基于 redux、redux-saga 和 react-router@2.x 的轻量级前端框架。另外蚂蚁金服还开源了可以说是目前为止综合性价比最高的react UI库——[ant design](https://github.com/ant-design/ant-design)    
     
简单来讲，[dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)是对redux方案的集成与拓展，它基于[elm](http://elm-lang.org/)概念形成一套相对完善的，基于react+redux生态的前端架构方案。     
     
相比于原生的redux，dva更轻盈，架构更清晰，开发起来也非常简单高效，避免了使用redux和redux-saga时很多繁杂的操作 。
              
它并不需要你考虑原本使用redux时需要考虑的，如何更好地处理异步，如何组织reducer和action，如何实现统一请求和错误处理等等，这些原本较为复杂繁杂的工作，[dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)已经帮你处理好了一切     
    
总的来讲，[dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)是蚂蚁金服前端团队对react+redux实践已久的成果，是目前为止react+redux的最佳实践方案

如果你使用redux方案，建议使用react+dva ，当然，你有必要理解redux的原理 。   

## 关于material-ui的实践体验
     
* [material-ui](http://www.material-ui.com/)是国外开源的一个基于谷歌[material](https://material.google.com/)设计理念的优秀的react UI库。     
    
* 与它类似的还有后起之秀[react-toolbox](http://react-toolbox.com/)     
     
这两个都是非常精美的UI库,  对于视觉的把握度非常高，同时提供了很多常用的组件，组件的可用性也非常的合理。
* 不足之处：    
    
  1，组件的性能相比[ant design](https://github.com/ant-design/ant-design) 等库逊色了不少，在移动端尤其糟糕。    
  2，灵活性较差。   
  3，主要输出UI层，很多逻辑层需要手动处理， 对于这点，[ant design](https://github.com/ant-design/ant-design)就显得更人性化一些。    
 4，可用组件不够丰富，类似于form，pagination，upload，message(消息提示)等常用基础组件一概没有，于是不得不寻找其他开源的组件，或手动封装来处理这些问题，这样就造成了UI风格不统一。
   
总的来讲[material-ui](http://www.material-ui.com/)是一个优秀的UI库，但在用户体验和功能性上略有不足。
    
## 未来规划    

*  在现有基础上，陆续推出更多的功能    

*  尝试按功能模块拆分打包，做更精细的优化 

*  开发react+node实现同构的 ssr 版本

*  使用react+GraphQL+node技术栈，开发GraphQL版本     
   
*  如果时间充裕，推出React Native移动端版本(安卓+ios)   
     
####  技术交流 
 开源重点在于技术分享和交流。
 如果你技术较好，有想法，我们可以一起做更好的开源项目。    
 个人邮箱：postmaster@boyagirl.com  或    liangfucheng@boyagirl.com
 非诚勿扰，HR可扰。
      
