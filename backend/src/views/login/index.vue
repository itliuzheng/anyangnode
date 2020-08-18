<template>
  <div class="login-container">

    <div class="login-nav" style="z-index:999;">
      <div class="nav">
        <!--<h1 class="logo fl" :style="LogoCss"></h1>-->
        <ul class="nav-ul fr">
          <li>蜘点集团</li>
          <li>蜘点在线数字化风控平台</li>
          <li>帮助中心</li>
        </ul>
      </div>
    </div>
    <!--<div class="web_bg" :style="bodyCss"></div>-->
    <img class="web_gif" src="@/images/login/bj.png" alt="" style="z-index:1;">
    <img class="web_gif" src="@/images/login/bj_gif.gif" alt="" v-show="img_show" style="z-index:2;" @load="loadImg">


    <el-form
      class="login-form"
      style="z-index:3;"
      ref="loginForm"
      :model="loginForm"
      auto-complete="on"
      label-position="left"
      :rules="loginRules">

      <div class="title-container">
        <h3>{{lang.title}}</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container svg-container_login" >
          <svg-icon icon-class="user"></svg-icon>
        </span>
        <el-input
          v-model="loginForm.username"
          :placeholder="lang.username"
          name="username"
          type="text"
          auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container" >
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input
          v-model="loginForm.password"
          :placeholder="lang.password"
          name="passwod"
          type="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        ></el-input>
      </el-form-item>
      <p class="error" v-if="error">用户名或密码错误</p>
      <el-button class="login-button" :loading="loading" type="primary" @click.native.prevent="handleLogin" >{{lang.logIn}}</el-button>
    </el-form>
  </div>
</template>
<script>
  import tool from '@/components/component/tool'

  export default {
    metaInfo:{
      title:'系统登陆',
      meta:[
        {
          name:'keywords',
          content:'保理系统，登陆'
        },
        {
          name:'description',
          content:'保理系统的登陆界面'
        },
      ]
    },
    name:'login',
    data(){
      const validateUsername = (rule,value,callback) =>{
        let validate = tool.validateRealName(value);
        if(!validate.boolean){
          callback(new Error(validate.msg));
        }else{
          callback();
        }
      }
      const validatePassword = (rule,value,callback)=>{
        let validate = tool.validatePassword(value);
        if(!validate.boolean){
          callback(new Error(validate.msg));
        }else{
          callback();
        }
      }
      return {
        loginRules:{
          username:[{required:true,trigger:'blur',validator:validateUsername,message:'请填写用户名'}],
          password:[{required:true,trigger:'blur',validator:validatePassword}]
        },
        loginForm:{
          username:'',
          password:''
        },
        lang:{
          title:'欢迎进入保理后台管理系统',
          username:'用户名',
          password:'密码',
          logIn:'登录'
        },
        loading:false,
        redirect:null,
        error:null,
        LogoCss:{
          backgroundImage:"url("+require("../../images/login/logo.png")+")"
        },
        bodyCss:{
          backgroundImage:"url("+require("../../images/login/bj.png")+")"
        },
        img_show:false
      }
    },
    watch:{
      $route:{
        handler:function(route){   //其值是一个回调函数。即监听到变化时应该执行的函数
          this.redirect = route.query && route.query.redirect
        },
        // deep  其值是true或false；确认是否深入监听。（一般监听时是不能监听到对象属性值的变化的，数组的值变化可以听到。）
        immediate:true //其值是true或false；确认是否以当前的初始值执行handler的函数。
      }
    },
    methods:{
      loadImg(){
        this.img_show = true
      },
      handleLogin(){
        var _this = this;
        // _this.$router.push({path:_this.redirect||'/Home'});
        this.$refs.loginForm.validate(valid => {

          _this.error = false;
          if(valid){
            _this.loading = true;

            _this.$store.dispatch('LoginByUsername',_this.loginForm).then((res)=>{
              console.log(res);
              _this.loading = false;
              _this.$router.push({path:_this.redirect||'/Home'});
            }).catch((error)=>{
              _this.loading = false;
              _this.error = true;
            })

          }else{
            console.log('error submit!');
            return false;
          }
        })
      }
    }
  }
</script>


<style rel="stylesheet/scss"  lang="scss">
  /* 修复input 背景不协调 和光标变色 */

  $bg:#273e6e;
  $light_gray:#eee;
  $cursor: #fff;
    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
      .login-container .el-input input{
        color: $cursor;
        &::first-line {
          color: $light_gray;
        }
      }
    }

    /* reset element-ui css */
    .login-container {
      .el-form-item__content{
        text-align: left;
      }
      .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        input {
          background: transparent;
          border: 0px;
          -webkit-appearance: none;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $light_gray;
          height: 47px;
          caret-color: $cursor;
          &:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;  // 去掉默认点击input框背景颜色
            -webkit-text-fill-color: $cursor !important;
          }
        }
      }
      .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
      }
      .login-button{
        width: 100%;
        margin-top: 30px;
      }
    }

</style>


<style rel="stylesheet/scss"  scoped lang="scss">
$dark_gray:#889aa4;
$light_gray:#eee;


.login-nav{
  width: 100%;
  height:70px;
  background:linear-gradient(0deg,rgba(21,34,48,0.3) 0%,rgba(21,34,48,0.6) 100%);
  position:fixed;
  top: 0;
  left: 0;
  .logo{
    width: 118px;
    height: 70px;
    background-repeat: no-repeat;
    background-position-y: bottom;
    -webkit-background-size: 100% 45px;
    background-size: 100% 45px;
    margin: 0 auto;
  }
  .nav{
    width: 1200px;
    margin: 0 auto;
  }
  .nav-ul{
    li{
      display: inline-block;
      margin-left: 50px;
      font-size:16px;
      font-weight:400;
      color:rgba(225,225,225,1);
      line-height:70px;
      text-shadow:0px 3px 2px rgba(0, 0, 0, 0.42);
      cursor: pointer;
    }
  }
}
/*.web_bg{
  position:fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  min-height:1080px;
  z-index:-10;
  zoom: 1;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}*/
.web_gif{
  position:fixed;
  bottom: 0;
  left: 50%;
  width:100%;
  /*max-width: 1920px;*/
  -webkit-transform: translate(-50%, 0);
  -moz-transform: translate(-50%, 0);
  -ms-transform: translate(-50%, 0);
  -o-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  /*height: 100%;*/
  /*max-height:600px;*/
  z-index:-11;
}


  .login-container{
    position: fixed;
    width: 100%;
    height: 100%;

    background:linear-gradient(0deg,#0d3483 0%,#101828 100%);
    .title-container{
      text-align: center;
      color: #fff;
      font-weight: 500;
      margin-bottom: 30px;
    }
    .login-form{
      position: absolute;
      width: 480px;
      height: 430px;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      max-width: 100%;
      padding: 79px 64px 96px;
      background:rgba(43,69,123,1);
      box-shadow:0px 0px 24px 0px rgba(6,21,51,0.59);
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .error{
      text-align: center;
      color: #f56c6c;
      font-size: 12px;
      line-height: 1;
      height: 12px;
    }
  }

</style>
