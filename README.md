# 笔记

## 安装vue-cli&了解文件夹
1. vue create app -- vue-cli脚手架初始化项目
    node + webpack + 淘宝镜像

2. 了解文件夹作用：
    node_modules文件夹：项目依赖文件夹

    public文件夹：一般放置一些静态资源（图片、视频...），需要注意的是，放在public中的静态资源，webpack进行打包的时候，会原封不动打包到dist文件夹中。

    src文件夹（程序员源代码文件夹）:{

    assets文件夹：一般也是放置静态资源（一般放置多个组件公用的静态资源） 需要注意，放置在assets文件夹里面的静态资源，在webpack打包时，webpack会把静态资源当作一个模块，打包到js文件里面。

    components文件夹：一般放置的是非路由组件（全局组件）

    App.vue：整个项目唯一的根组件，Vue当中的组件（.vue）

    main.js:程序的入口文件，也是整个程序中最先执行的文件

    }

    babel.config.js:配置文件

    package-jion:认为这是一个项目的“身份证”，记录项目叫什么，项目怎么运行，项目当中有哪些依赖。

    package-lock.jion:缓存性文件

    READEME.md:项目说明文件

## 项目其他配置

1. 项目运行起来的时候，让浏览器自动打开
---package.json
```js
    "scripts": {
        "serve": "vue-cli-service serve --open",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
     },
```
2. eslint校验功能关闭
    在根目录的vue.config.js文件中加一行代码，关闭语法提示：```lintOnSave:false```

3. src文件夹简写方法，配置别名。
    jsconfig.json配置别名@提示 【@代表的是src文件夹，这样将来文件过多，找的时候很方便】

## Header与Footer非路由组件
1. 非路由组件使用分为几步:
    第一步：定义
    第二步：引入
    第三步：注册
    第四步:使用

2. 项目采用的less样式,浏览器不识别less语法，需要一些loader进行处理，把less语法转换为CSS语法

    1：安装less less-loader@5
    切记less-loader安装5版本的，不要安装在最新版本，安装最新版本less-loader会报错，报的错误setOption函数未定义

    2: 需要在style标签的身上加上lang="less",不添加样式不生效

## 项目路由的分析
1. [vue-router]前端所谓路由：KV键值对。key:url（地址栏中的路径）,value:响应的路由组件

2. 路由组件：
    Home首页路由组件、Search路由组件、Login路由组件、Register路由组件。
    Header【出现在了首页、搜索页】
    Footer【出现在了首页、搜索页】，但是在登录和注册页面是没有的。

3. 安装路由
    cnpm install --save vue-router@3（vue2适用于3版本，新版4适用于vue3）
    --save:可以让你安装的依赖，在package.json文件当中进行记录

## 路由的搭建
1. vue-router 在上面分析的时候，路由组件应该有四个：Home、Search 、Login 、Register .
    components文件夹：经常放置非路由组件（公用全局组件）
    pages|views文件夹：经常放置路由组件

2. 配置路由：项目当中配置的路由一般放在router文件夹中

3. 总结
    路由组件与非路由组件的区别？
        1. 路由组件一般放置在pages|views文件夹，非路由组件一般放置components文件夹中。
        2. 路由组件一般需要在router文件夹中进行注册（使用的即为组件的名字），非路由组件使用的时候，一般都是以标签的形式使用。
        3. 注册完路由，不管是路由组件还是非路由组件，身上都有$route和$router属性 

    区分route、router
        $route:一般获取路由信息【路径、query、params等等】
        $router:一般进行编程式导航进行路由跳转【push|replace】

## 路由的跳转
1. 路由的跳转有两种形式：
    声明式导航router-link,可以进行路由的跳转

    编程式导航$router.push|replace,可以进行路由的跳转

    （声明式导航能做的，编程式导航都能做，但是编程式导航除了可以进行路由跳转，还可以进行一些其他的业务逻辑）

## Footer组件的显示与隐藏
1. 显示或者隐藏组件：v-if|v-show（这里使用v-show更好,v-if是频繁操作DOM节点）

    法一：我们可以根据组件身上的$route获取当前路由信息，通过路由路径判断Footer显示与隐藏。

    法二（推荐）：配置路由信息的时候，可以给路由添加路由原信息【meta】。路由配置对象时，key不能乱写。

## 路由传参
1. 路由跳转有几种方式？

    比如：A -> B 

    声明式导航：router-link(务必要有to属性),可以实现路由跳转。

    编程式导航：利用的是组件实例的$router.push|replace方法，可以实现路由的跳转。（还可以写一些业务逻辑）

2. 路由传参，传参有几种方法？

    params参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要占位。结合对象写法时，需要给路由命名name

    query参数：不属于路径当中的一部分， /home?k=123&m=3，不需要占位

3. 路由传参，传参有几种写法？
    1. 字符串拼接： ```this.$router.push('/search/' + this.keyWord + '?k=' + this.keyWord.toUpperCase()) ```

    2. 模板字符串： ``` this.$router.push(`/search/${this.keyWord}?k=${this.keyWord.toUpperCase()}`) ```

    3. 对象写法（最常用）：
    ```js
        this.$router.push({
                name:'search',
                params:{
                    keyword:this.keyWord
                },
                query:{
                    k:this.keyWord.toUpperCase()
                }
            })
    ```
## 路由方面常见面试题
1. 路由传递参数（对象写法）path是否可以结合params参数一起使用？

    路由跳转传参的时候，对象的的写法可以是name、path形式，但是需要注意，path不可以结合params参数一起使用,必须要结合name。

2. 如何指定params参数可传可不传？

    （如果路由要求传递params参数，但是你没有传递params参数，会发现一件事，url会有问题
        按理来说应该这样：http://localhost:8080/#/search?k=123
        实际是这样：http://localhost:8080/#/?k=123）
    
    指定params参数可以传递、或者不传递，在配置路由的时候，在占位的后面加上个一个问号【即表示params可以传参也可以不传参】

3. params参数可以传递可以不传递，但是如果传递的是空串，如何解决？

    undefined解决：params参数可以传递、不传递（空的字符串）
    ``` keyword:''|| undefined ```

4. 路由组件能不能传递props数据？

    可以。有三种传递方法：布尔值、对象、函数。

## 重写push与replace方法

1. 重写push||replace
    第一个参数location：告诉原来的push方法，要往哪里跳转
    第二个参数resolve：成功的回调
    第三个参数reject：失败的回调
    call与apply区别：
    相同点：都可以调用函数一次，都可以篡改函数的上下文(this)一次
    不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行需要传递数组。

    ```js
        // 先把VueRouter原型对象的push保存一份
        const originPush = VueRouter.prototype.push

        VueRouter.prototype.push = function(location,resolve,reject){
            if(resolve || reject){
                originPush.call(this,location,resolve,reject)
            }else{
                originPush.call(this,location,() => {},() => {})
            }
        }
        /* VueRouter.prototype.push = function(location){
            return originPush.call(this,location).catch(err => err)
        } */
        VueRouter.prototype.replace = function(location,resolve,reject){
            if(resolve || reject){
                originPush.careplacell(this,location,resolve,reject)
            }else{
                originPush.replace(this,location,() => {},() => {})
            }
        }
    ```

## axios二次封装
1. 为什么需要二次封装axios?
    请求拦截器、响应拦截器：请求拦截器，可以在发请求之前处理一些业务；响应拦截器，当服务器数据返回之后，可以处理一些事情

2. 在项目中经常看到API文件夹【axios】
    接口当中：路径都带有/api
    baseUrl:'/api'

## 接口统一管理

1. 项目很小：完全可以在组件的生命周期函数中发请求

2. 项目大： axios.get('xxx')

3. 跨域问题
    什么是跨域：协议、域名、端口号不同的请求，称为跨域
    http://localhost:8080/#/home ----前端项目本地服务器
    http://gmall-h5-api.atguigu.cn ----后台服务器

    解决：JSONP、CROS、代理

## nprogress进度条的使用
1. start:进度条开始
2. done:进度条结束
3. 进度条的颜色可以修改，找到源文件进行样式修改，然后重启服务器生效。

## vuex状态管理库
1. vuex是官方提供的一个插件，状态管理库，集中式管理项目中组件的共用数据
    切记，并不是全部的项目都需要vuex.如果项目很小，完全不需要vuex;如果项目很大，组件很多、数据很多、数据维护很费劲————vuex

## 函数的防抖与节流

1. 演示卡顿现象

    正常：事件触发非常频繁，而且每一次的触发，回调函数都要去执行（如果时间很短，而回调函数内部有计算，那么可能会出现浏览器卡顿）

2. 节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发。

3. 防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才触发，也就是说如果连续快速触发，只会执行一次。

## 三级联动总结

1. 商品分类的三级列表由静态变为动态显示形式【获取服务器数据：解决跨域问题】

2. 函数防抖与节流【面试频率很高】

3. 路由跳转：声明式导航（router-link组件、耗内存）、编程式导航
    编程式导航解决这个问题：自定义属性

## 开发Search模块中的TypeNav商品分类菜单（过渡动画效果）

1. 过渡动画：前提条件————元素务必要有v-if或v-show指令才能进行过渡动画

2. 对商品分类三级列表进行优化？
    在App根组件当中发请求【根组件mounted】执行一次

3. 合并params和query参数

4. 开发Home首页当中的ListContainer组件与Floor组件？

    ListContainer组件

    1.但是这里需要注意一件事情：服务器返回的数据（接口）只有商品分类菜单分类数据，对于ListContainer组件与Floor组件数据服务器没有提供

    https://docschina.org/
    2.mock（模拟）数据：如果你想mock数据，需要用到一个插件mockjs

        使用步骤

        1.在项目当中src文件夹创建mock文件夹

        2.准备JSON数据（mock文件夹中创建相应的文件）————格式化以下，别留有空格（跑不起来）

        3.把mock数据需要的图片放置到public文件夹中【public文件夹在打包的时候，会把相应的资源原封不动打包到dist文件夹当中】

        4.创建mockServe.js通过mockjs插件实现模拟数据

        5.mockServe.js文件在入口文件引入（至少需要执行一次，才能模拟数据）

    3.ListContainer组件开发重点

        安装swiper插件：安装5版本  npm i swiper@5

    4.轮播图最好的解决方案

        watch + nextTick：数据监听，监听已有数据变化

        $nextTick:在下次DOM更新 循环结束之后【v-for遍历完了，页面结构出来了】 执行延迟回调。在 修改数据之后【拿到了服务器的返回数据】 立即使用这个方法，获取更新后的DOM。

        $nextTick可以保证页面中的结构一定是有的，经常和很多插件一起使用【都需要DON存在了】


    Floor组件

    1.getFloorList这个actions在哪发，是需要在Home路由组件当中发，不能在Floor组件内部发————因为我们需要v-for遍历Floor组件，floor.json文件里有两组数据，在Floor组件内部发会变成两个数据一样的组件

    2.v-for也可以在自定义标签中使用

    3.组件通信mit可以实现子给父通信的方式有哪些？（面试）

        props:用于父子组件通信

        自定义事件：@on @e
        全局事件：$bus 全能

        pubsub-js:vue当中几乎不用 全能

        插槽

        vuex

    把首页当中的轮播图拆分为一个公用的全局组件
        切记：以后在开发项目组件的时候，如果看到某一个组件在很多地方都使用，把他变成全局组件。注册一次可以在任意地方使用【共用的组件|非路由组件放到components文件夹里】

## search模块开发

1. 模块开发步骤：
    1. 先写静态页面 + 静态组件差分出来

    2. 发请求(API)

    3. vuex（actions mutations state）

    4. 组件获取仓库数据，动态展示数据

2. 动态开发面包屑中的分类名

    编程式导航路由跳转【自己跳自己】

3. 动态开发面包屑中的关键字

    1.当面包屑中的关键字清除之后，需要让兄弟组件Header中的关键字清除。涉及到组件通信：

        props:父子
        自定义事件：子父
        vuex:万能
        插槽：父子
        pubsub-js:万能（react中使用多）
        $bus：全局事件总线

## 排序操作

1. order:服务器需要字段，代表的是排序方式
    order这个字段需要的是字符串（可以传递也可以不传递）
    1:代表综合
    2:代表价格
    3:asc代表升序
    4:desc代表降序
    告诉服务器排序方式有几种情况?
    "1:asc" "1:desc"  "2:asc"  "2:desc"

## 分页功能实现

1. 分页器展示，需要哪些数据（条件）

    需要知道当前是第几个:pageNo字段表示当前页数

    需要知道每一个展示多少条数据：pageSize字段进行代表

    需要知道整个分页器一共有多少条数据：total字段进行代表--【能获取到另外一条信息：一共有多少页】

    需要知道分页器连续的页码个数：5|7【奇数？对称！好看！】

    总结：对于分页器而言,自定义需要知道的四个前提条件
      
        1.pageNo：当前第几个
        2.pageSize：代表每一页展示多少条数据
        3.total：代表整个分页一共展示多少条数据
        4.continue：代表分页连续页码的个数

2. 自定义分页器，在开发的时候自己先传递假的数据进行调试，成功之后，在使用服务器的数据。

3. 对于分页器而言，很重要的一个地方即为【算出：连续页面连续页码起始数据和结束数据】

    当前是第8页 ...,6，7，8，9，10,...


## 加入购物车按钮

1. 路由跳转之前发请求

2. 成功路由跳转与参数传递（对于复杂的参数，这里涉及到了会话存储功能）

3. 失败提示失败信息

## addCartSucess

1. 查看商品详情

2. 查看购物车

## 购物车

1. 购物车静态组件-需要修改样式：

    调整css让各个组件对齐 删除第三项 15 35 10 17 10 13 

2. 向服务器发起ajax请求，获取购物车数据，操作vuex三连环、组件获取数据展示数据

    发现：发送请求的时候，获取不到购物车里面的数据，因为服务器不知道你是谁？

        uuid临时游客身份

3. 动态展示购物车

4. 修改购物车产品的数量（需要发请求：参数）

5. 修改产品个数【点击的频率太快——函数节流】

6. 删除某一个产品

7. 修改产品的状态

    注意：没有一次删除很多产品的接口，但是有通过ID可以删除产品的接口【删一个】

    Promise.all([p1,p2,p3])
    p1 p2 p3:每一个都是Promise对象，如果有一个Promise失败，都失败；如果成功，返回成功

8. 全选


## 登录注册

1. 登陆注册的静态组件

2. assets文件夹----放置全部组件的静态资源

3. 在样式当中也可以使用 @ 【src别名】符号，切记在前面加上 ~

### 注册业务

1. 注册业务、登录业务中表单验证先不处理

2. 获取验证码的接口  /api/user/passport/sendCode/{phone}

## 登录

1. 先注册---通过数据库存储用户信息（账号 密码）

2. 登录-----登录成功的时候，后台为了区分你这个用户是谁，服务器下发一个token【令牌：唯一标识符】

    当前登录接口做的不完美，一般登录成功，服务器会下发token,前台持久化存储token,带着token找服务器要用户的信息进行展示。

3. vuex仓库存储数据----不是持久化【刷新页面，数据会消失】

### 登录过后首页用户信息的展示

1. 当用户注册完成，用户登录【用户名 + 密码】向服务器发请求（组件派发action:userLoginInfo）。登录成功，获取到token,存储与仓库中【非持久化】，接着跳转到home首页。

2. 因此在首页当中（mounted）派发action:getUserInfo获取用户信息，以及动态展示header组件内容

3. 一刷新home首页，获取不到用户信息【token没了，因为不是持久化存储数据】

4. 持久化存储token

5. 存在的问题

    1）多个组件要展示用户信息
        1.需要在每一个组件的mounted中派发action【麻烦】
        2.放在app组件去派发action，但是登录完成跳转到首页需要再刷新一次才会出现用户信息

    2）用户已经登录了，但是修改网络地址还能登录————不应该再回登录页

6. 退出登录

## 导航守卫

1. 全局守卫

    你的项目当中只要发生路由变化，守卫都能监听到

    1）全局前置守卫(路由跳转之前进行判断)

    2）全局解析守卫

    3）全局后置守卫

2. 路由独享守卫

3. 组件内守卫

## 提交订单

1. 先把静态组件搞定

2. 点击提交按钮的时候，还需要向服务器发起一次请求【把支付一些信息传递给服务器】

## 获取支付信息

1. 别在生命周期中用async

## 支付

1. element-ui按需引入，配置文件发生变化，项目需要重启

2. 二维码

## 个人中心完成
1. 面试的时候：是否封装过什么组件————分页器、日历

## 未登录的导航守卫

1. 全局守卫

    未登录访问：交易相关trade、支付相关pay、paysuccess、用户中心center相关跳转到登录页面

2. 路由独享守卫

    只有从购物车界面才能跳转到交易页面【创建订单】
    只有从交易页面【创建订单】才能跳转到支付页面
    只有从支付页面才能跳转到支付成功页面

## vee-validate的使用

1. 插件安装与引用

    npm i vee-validate@2 --save 安装的插件为2版本

    import VeeValidate from 'vee-validate'

    import zh_CN from 'vee-validate/dist/locale/zh_CN'   // 引入中文 message

    Vue.use(VeeValidate)

2. 提示信息
    
    VeeValidate.Validator.localize('zh_CN', {
    messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: { // 给校验的 field 属性名映射中文名称
    phone: '手机号',
    code: '验证码',
    password:'密码',
    password1:'确认密码',
    isCheck:'协议'
    }
    })

3. 基本使用

    <input
          placeholder="请输入你的手机号"
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
    <span class="error-msg">{{ errors.first("phone") }}</span>

    const success = await this.$validator.validateAll(); //全部表单验证
    //自定义校验规则
    //定义协议必须打勾同意
    VeeValidate.Validator.extend('agree', {
    validate: value => {
    return value
    },
    getMessage: field => field + '必须同意'
    })

## 路由懒加载

1. 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对于的组件，这样就更加高效了。

## 打包上线

1. 打包num run build

    项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。

    有了map就可以像未加密的代码一样，准确的输出是哪一行那一列有错。
    
    所以该文件如果项目不需要是可以除掉的

    vue.config.js配置   productonSourceMap:false

## 购买服务器

1. 阿里云 腾讯云。。。

2. 设置安全组，让服务器一些端口打开

3. 利用xshell根据登录服务器

    linux :  /根目录

    linux常用指令：cd 跳转目录   ls查看   mkdir创建目录  pwd:查看绝对路径

## nginx

1. 为什么访问服务器的ip地址就可以访问项目

    http://43.142.177.61/

    刚刚在服务器上=>/root/project/www/shangpinhui/dist

2. 项目的数据来自于：http://gmall-h5-api.atguigu.cn

3. nginx配置

    1.来到xshell进入到根目录/下的etc

    2.进入etc目录，进入nginx(安装：yum install nginx)

    3.安装完nginx，你会发现在nginx目录下多了一个nginx.conf文件，在这个文件进行配置

    4.vim nginx.conf进行编辑

    解决第一个问题：
    location / {
           root /root/project/www/shangpinhui/dist;
           index index.html;
           try_files $uri $uri/ /index.html;
        }
    解决第二个问题：
    location /api {
        proxy_pass http://43.142.177.61;
    }

    5.nginx服务器跑起来
    service nginx start

