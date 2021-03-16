<template>
    <div class="box">
        <div class="contatiner">
            <div class="title">MrYang</div>
            <div class="item">
                <!-- <div>账号:</div> -->
                <input type="text" placeholder="请输入账号" @focus="handleFocus" :class="{'error':rules.username}" v-model="userInfo.username"/>
                <span class="left"></span>
                <span class="right"></span>
                <span class="top"></span>
                <span class="bottom"></span>
                <div class="tips" v-if="rules.username">账号不能为空</div>
            </div>
            <div class="item">
                <!-- <div>密码:</div> -->
                <input type="password" placeholder="请输入密码" @focus="handleFocus" :class="{'error':rules.password}" v-model="userInfo.password"/>
                <span class="left"></span>
                <span class="right"></span>
                <span class="top"></span>
                <span class="bottom"></span>
                <div class="tips" v-if="rules.password">密码不能为空</div>
            </div>
            <div class="item">
                <Button type="primary" @click="handleClicl">登录</Button>
            </div>
        </div>
    </div>
</template>

<script>
import {login} from '@/api/login'
export default {
    data(){
        return {
            userInfo:{
                username:'',
                password:''
            },
            rules:{
                username:false,
                password:false
            }
        }
    },
    methods:{
        handleClicl(){
           if( !this.checkTrim()) return 
            // console.log(this.userInfo);
            login(this.userInfo).then(res=>{
                console.log(res);
                if(res.data.token){
                    this.$Message.success({
                        content:res.data.msg,
                        duration:0.7,
                        onClose:()=>{
                            this.setStorage('token',res.data.token)
                            this.$router.push('/index')
                        }
                    })
                    
                }
            })
        },
        checkTrim(){
            if(this.userInfo.username.trim() ===''){
                 this.rules.username = true
                 return false
            }
            if(this.userInfo.password.trim() ===''){
                this.rules.password = true
                return false
            }
            return true
        },
        handleFocus(){
            this.rules.username = false
            this.rules.password = false
        }
    }
};
</script>

<style lang="scss" scoped>
$lineSize:2px;
$width:320px;
.box {
    width: 100vw;
    height: 100vh;
    background: #282c34;
    .contatiner {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .title{
            font-size: 50px;
            color: #2b85e4;
            margin-bottom: 10px;
        }
        .item {
            margin-bottom: 15px;
            color: #fff;
            // overflow: hidden;
            display: flex;
            align-items: center;
            position: relative;
            input {
                width: $width;
                height: 36px;
                padding-left: 10px;
                color: #61dafb;
                position: relative;
                &::placeholder {
                    color: rgba(0, 0, 0, 0.3);
                    font-size: 13px;
                }

                &:focus~.right{
                    transform: scaleY(1);
                    transform-origin: bottom center !important;
                }
                &:focus~.top{
                    transform: scaleX(1);
                    transform-origin: right center !important;
                }
                &:focus~.left{
                    transform: scaleY(1);
                    transform-origin: top center !important;
                }

                &.error~span{
                    background: red;
                }
            }

            span {
                position: absolute;
                background-color: #61dafb;
                transition: transform 0.3s ease-in-out;
                &.left,&.right{
                    width: $lineSize;
                    height: 100%;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    transform: scaleY(0);
                    transform-origin: top center;
                }
                &.left{
                    left: 0;
                    transform-origin: bottom center;
                    transition-delay: .3s;
                }
                &.bottom,&.top{
                    left: 0;
                    right: 0;
                    height: $lineSize;
                }
                &.top{
                    transform: scaleX(0);
                    top: 0;
                    transition-delay: .2s;
                    transform-origin:left center ;
                }
                &.bottom{
                    bottom: 0 ;
                }
            }
            & /deep/ .ivu-btn{
                width: 100px;
            } 

            .tips{
                position: absolute;
                right: -95px;
                color: #b64023;
            }
        }
    }
}
</style>