<template>
    <div class="page">
        <el-container>
            <el-aside width="300px">
                <my-aside/>
            </el-aside>
            <el-container>
                <el-header>
                   <my-header/>
                </el-header>
                <el-main>
                    <div class="main">
                        <router-view></router-view>
                    </div>
                    <a class="bei" href="https://beian.miit.gov.cn">豫ICP备2021006859号-1</a>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import MyHeader from '../components/Index/MyHeader.vue';
import MyAside from '../components/Index/MyAside'
export default {
    components:{
        MyAside,
        MyHeader
    }
};
        
</script>

<style lang="scss" scoped>
.page{
    width: 100vw;
    height: 100vh;
}
.el-aside{
    height: 100vh;
    // background: red;
}
.el-header{
    padding:0 ;
}
.el-main{
    background: skyblue;
    padding: 20px 50px;
    height:calc(100vh - 60px) ;
    .main{
        min-height: 97%;
    }
    .bei{
        position: relative;
        bottom: 0;
        left: 41%;
        transform: translateX(-50%);
        color:rgb(167, 37, 59);
    }
}
</style>