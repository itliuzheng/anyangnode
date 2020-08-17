# 闫涵淘宝后台架构设计

## 功能点

### 前端：

	1. 登录注册页
 	2. 商品列表页
      	3. 支付页
         	4. 我的页面
       	1. 商品物流信息页
       	2. 退款页面
       	3. 客服（连接qq）
         	5. 后台页面
       	1. 订单管理
            	1. 查看订单
            	2. 分配订单
       	2. 物流管理
            	1. 发物流
       	3. 商品管理
            	1. 上下架商品
            	2. 改价
            	4. 退款管理

### 后端：

 	1. 用户管理
      	1. 登录
      	2. 注册
      	3. 修改密码
 	2. 订单管理
 	3. 物流管理
 	4. 商品管理

​	

## 数据库设计

### 用户表（user）

```json
{
    //用户名
    "loginName": {
        "type": String,
        "required": true
    },
    //手机号
    "mobile":{
        "type":String,
    },
    //密码
	"passwod":{          
    	"type":String,
        "required": true
    },
    //用户类型
    "userType":{
        "type":Number,
        "enum":[0,1,2],  //0-超级管理员 1-后台管理  2-用户
        "default":2
    },
    //创建时间
    "createDate":{
        "type":Date,
        "default":Date.now
    }
}
```

### 游戏产品表（product）

```json
{
    //商品名称
    "name":{
        "type":String,
        "required":true
    },
    //商品描述
    "description":{
        "type":String,
        "required":true
    },
    //商品图片
    "imgUrl":{
        "type":String,
        "default":''
    },
    //价格(元)
    "price":{
        "type":Number,
        "required":true
    },
    //商品上下架状态
    "status":{
        "type":Number,
        "enum":[0,1],  //0-下架  1-上架
        "default":0
    },
    //创建时间
    "createDate":{
        "type":Date,
        "default":Date.now
    },
    //修改时间
    "modifyDate":{
        "type":Date,
        "default":Date.now
    }
    
}
```

### 订单表（order）

```json
{
    //订单编号
    "orderNum":{
        "type":String,
        "required":true
    },
    //商品id
    "productId":{
        "type":String,
        "required":true
    },
    //创建时间
    "createDate":{
        "type":Date,
        "default":Date.now
    },
    
}
```

### 物流表（logistics）

```json
{
    //订单id    -> 对应的是  order表里的id
    "orderId":{
        "type":String,
        "required":true
    },
    //物流状态
    "status":{
        "type":Number,
        "enum":[0,1],  //0-未发货   1-已发货
        "default":0
    },
	//物流单号
	"logistics":{
        "type":String
    },
    //创建时间
    "createDate":{
        "type":Date,
        "default":Date.now
    }
}
```

### 网站信息表（webinfo）
```json
{
    //网站名称
    "name": {
        "type": String,
        "required": true
    },
    //网站网址
    "websiteUrl":{
        "type":String,
        "required": true
    },
    //logo
	"logo":{
    	"type":String,
        "required": true
    },
    //首页标题(Title)
	"title":{
    	"type":String,
        "required": true
    },
    //网站关键字(keywords)
	"keywords":{
    	"type":String,
        "required": true
    },
    //网站描述(Description)
	"description":{
    	"type":String,
        "required": true
    },
    //内页联系方式
	"insideContact":{
    	"type":String,
    },
    //网站底部HTML代码
	"footer":{
    	"type":String,
    },
    //联系电话
	"mobile":{
    	"type":String,
    },
    //创建时间`
    "createDate":{
        "type":Date,
        "default":Date.now
    },
    //修改时间`
    "modifyDate":{
        "type":Date,
        "default":Date.now
    }
}
```

