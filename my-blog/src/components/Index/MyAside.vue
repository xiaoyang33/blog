<template>
    <div class="aside">
        <div class="head">
            <div class="title-img">
                <img :src="userInfo.userImg || require('../../assets/img/6.jpg')" alt="" />
            </div>
        </div>
        <div class="container">
            <h3>{{userInfo.userTitle}}</h3>
            <div class="desc">
                {{userInfo.userDesc}}
            </div>
            <div class="card-info">
                <div>
                    <p @click="goTimeLine">文章</p>
                    <p>{{totalArticle}}</p>
                </div>
                <div>
                    <p>分类</p>
                    <p>{{classIfyNum}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import operstion from '@/api/operations'
export default {
    data(){
        return {
            userInfo:{
                userDesc:'',
                userImg:'',
                userTitle:''
            },
            totalArticle:0,
            classIfyNum:0
        }
    },
    created(){
        this.getUserInfo()
    },
    methods:{
        goTimeLine(){
            this.$router.push('/timeLine')
        },
        getUserInfo(){
            operstion.getUserInfo().then(res=>{
                console.log(res);
                Object.assign(this.userInfo,res.data.user)
                this.totalArticle = res.data.total
                this.classIfyNum = res.data.classIfyNum
            })
        },
    }
};
</script>

<style lang="scss" scoped>
.aside{
    // border: 1px solid;
    height: 100%;
    box-sizing: border-box;
    box-shadow: 2px 3px 10px 2px #eee;
    border-radius: 5px;
    overflow: hidden;
    animation: floating 5s linear infinite;
}
.head {
    height: 180px;
    background: #4d4d4d;
    position: relative;
    .title-img {
        width: 128px;
        height: 128px;
        border-radius: 50%;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%,50%);
        img {
            width: 118px;
            height: 118px;
            border-radius: 50%;
        }
    }
}
.container{
    padding-top: 80px;
    display: flex;
    align-items: center;
    flex-direction: column;
    h3{
        color: #696969;
        font-size: 30px;
        font-weight: bold;
        text-align: center;
    }
    .desc{
        width: 70%;
        text-align: center;
        margin-top: 20px;
        color: #999;
        letter-spacing: 1px;
        font-size: 14px;
        line-height: 20px;
    }
    .card-info{
        width: 100%;
        display: flex;
        justify-content: center;
        div{
            cursor: pointer;
            text-align: center;
            &:first-child{
                margin-right: 20px;
            }
            &:hover{
                color: rgb(119, 101, 60);
            }
        }
    }
}
@keyframes floating {
    0% {
      transform: translateY(0px);
    }33%{
         transform: translateY(-10px);
    }
    70%{
         transform: translateY(10px);
    }
    100%{
         transform: translateY(0px);
    }
}
</style>