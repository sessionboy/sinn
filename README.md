## SINN
  这是一个基于react+koa2技术栈开发的，纯手工、从零开始构建的个人开源博客，准确来说应该是一个小型社区，目前是一个雏形。   
  如果你有足够的时间和精力，完全可以把[sinn](http://sinn.boyagirl.com)拓展为一个比较完备的小型、中型社区。   

  前端基于react+dva架构，dva是基于redux、redux-saga 和 react-router@2.x 开发的轻量级前端框架

  测试demo: http://test.boyagirl.com   

  体验账号—用户: sinn  密码：123456

  已上线地址：http://sinn.boyagirl.com    

  如果觉得可以，右上角点颗星星噢~
  
## 主要技术栈
* 前端:   
```
webpack2, react ,react-router,  dva , material-ui, generator, markdown, fetch, es6, babel
``` 
* 后端:
```
nodejs, koa2, mongoose, es6/7,  async/await,  Resful API
```
*  部署/服务器
```
docker, nginx, linux, 阿里云ecs
```
* cdn存储
```
 阿里云oss,  七牛云存储
```
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
可根据你的运行环境，使用nginx做接口转发, 配置可参考/nginx文件夹下的nginx配置 (略简单，可自行拓展)
    
#### 四，启动
* 开发环境    
```
npm run dev
```
     
* 正式环境     
```
npm start
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

* 脚本化一键部署 ，使用rsync ，同步代码到远程服务器 .(mac和linux)      
   
```
# 使用前，请根据你的服务器配置，修改脚本release.sh的配置 
sh release.sh
```

* 如果你使用的是window，需安装[cwrsync](https://www.itefix.net/cwrsync)，命令执行同上 .      
      
* nginx部署       
    
  推荐使用nginx做静态资源访问部署，具体配置可参考/nginx文件夹下的相关配置(略简单，可自行拓展) .    
      
  put.sh脚本可将你的nginx配置同步到远程服务器    
      
  
```
 # 使用前，请根据你的服务器配置，修改脚本put.sh的配置 
 sh put.sh
```

## 关于 webpack

* 构建脚本在 /build/* 、 webpack.config.js

* 本项目使用webpack2，其实dva本身封装有一个webpak构建工具——[ant-tool](http://ant-tool.github.io/index.html)，
  这个工具对于复杂度不高的构建需求是非常好用方便的，可对于复杂度高，或是深度拓展的构建需求就显得有些吃力。

* 考虑到使[sinn](http://sinn.boyagirl.com)更具拓展性和普适性，这里没有使用[ant-tool](http://ant-tool.github.io/index.html)，
  而是以最原始的方式重新做了webpack2配置

* 同时也考虑到了方便以后配置[tree-shaking](https://webpack.js.org/guides/tree-shaking/#components/sidebar/sidebar.jsx)

* 另外使用了[react-hot-loader](https://github.com/gaearon/react-hot-loader)来实现热更新

## 关于 dva 和 redux  
#### 一，[dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)是什么？为什么不使用[redux](http://cn.redux.js.org/index.html)？ 
     
 [dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)是蚂蚁金服开源的，基于 redux、redux-saga 和 react-router@2.x 的轻量级前端框架，在其公司内外基于dva开发的项目已达上百+ 
     
除了dva，蚂蚁金服还开源了可以说是目前为止综合性价比最高的react UI库——[ant design](https://github.com/ant-design/ant-design)    
     
简单来讲，[dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)是对redux方案的集成与拓展，它基于[elm](http://elm-lang.org/)概念形成一套相对完善的，基于react+redux生态的前端架构方案。     
     
相比于原生的redux，dva更轻盈，架构更清晰，开发起来也非常简单高效，避免了使用redux和redux-saga时很多繁杂的操作 。
              
它并不需要你考虑原本使用redux时需要考虑的，如何更好地处理异步，如何组织reducer和action，如何实现统一请求和错误处理等等，这些原本较为复杂繁杂的工作，[dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)已经帮你处理好了一切     
    
总的来讲，[dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)是蚂蚁金服前端团队对react+redux实践已久的成果，是目前为止react+redux的最佳实践方案

如果你使用redux方案，建议直接使用react+dva ，当然，你有必要理解redux的原理    

## 关于material-ui的实践体验
     
* [material-ui](http://www.material-ui.com/)是国外开源的一个基于谷歌[material](https://material.google.com/)设计理念的优秀的react UI库。     
    
* 与它类似的还有后起之秀[react-toolbox](http://react-toolbox.com/)     
     
这两个都是非常精美的UI库,  对于视觉的把握度非常高，同时提供了很多常用的组件，这些组件的可用性也非常的合理。

   
* 不足之处：    
    
  1，封装了较多DOM,哪怕是一个小小的icon组件也有四五层的dom，再加上嵌套内联样式，组件的性能相对于[ant design](https://github.com/ant-design/ant-design) 等库逊色了不少    
      
  2，灵活性较差   

  3，主要输出UI层，逻辑层并没有做较好的处理， 对于这点，[ant design](https://github.com/ant-design/ant-design)就处理得非常好    
   
 4，组件仍不够丰富，对于form，pagination，upload，message(消息提示)等常用基础组件一概没有，于是我不得不寻找其他开源的组件，或自己封装来处理这些问题，这样就造成了UI风格不统一的问题
   

 总的来讲[material-ui](http://www.material-ui.com/)是一个优秀的UI库，但不能算是非常优秀的UI库，虽然长得帅以外，但和[ant design](https://github.com/ant-design/ant-design)比还逊色了一大截


## 说说几点遗憾的地方     
    
 * 本来打算实践下[relay](https://github.com/facebook/relay)+[graphql](https://github.com/facebook/graphql)，但考虑到其门槛较高，以及relay的局限性，暂时放弃 .     
    
*  没有搞服务端渲染   

* 管理后台本打算用react+dva+[ant design](https://github.com/ant-design/ant-design)再做一套,但为了省时间，就用了ejs直出
    
* 没有形成统一的css解决方案，本来采用[css modules](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)作为css解决方案，但由于需要import部分第三方组件的样式，只能放弃[css modules](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)   
    
  当然，如果你乐意，可以使用less/sass，甚至是[PostCSS](https://github.com/postcss/postcss)或[css in js](http://blog.namangoel.com/css-in-js-in-css)作为你的css解决方案
    
## 未来规划    
    
*  细节优化   

*  webpack2增加tree-shaking支持，减少打包体积   
    
*  去除左侧菜单栏，调整UI，推出纯社区版本     
    
*  开发话题功能模块 ，类似于知乎的话题    
   
*  推出React Native版本(安卓+ios)   
    
*  对sinn的markdown做整合，以及功能拓展，打造一个基于react的markdown编辑器，  

   涵盖发表文章，发表评论，发表动态等常用的textarea域基础设施。    

   并作为开源项目开源，风格类似于[mditor](https://github.com/Houfeng/mditor),但比[mditor](https://github.com/Houfeng/mditor)功能更多样 
     
#### 本人业余时间有限，所以这个过程也许会有点长    
    
如果你技术较好，有想法，可以申请加入这个开源项目，一起来创造。    
   
个人邮箱：postmaster@boyagirl.com

 



