<template>
    <div class="page" @click="pageClick">
        <el-container>
            <el-aside width="300px">
                <my-aside/>
            </el-aside>
            <el-container>
                <vue-particles
                    class="back"
                    color="#fff"
                    :particleOpacity="0.7"
                    :particlesNumber="80"
                    shapeType="star"
                    :particleSize="4"
                    linesColor="#fff"
                    :linesWidth="2"
                    :lineLinked="true"
                    :lineOpacity="0.4"
                    :linesDistance="150"
                    :moveSpeed="3"
                    :hoverEffect="true"
                    hoverMode="grab"
                    :clickEffect="true"
                    clickMode="push"
                >
                </vue-particles>
                <el-header>
                   <my-header/>
                </el-header>
                <el-main>
                    <div class="main">
                        <transition name="fold-left">
                             <router-view></router-view>
                        </transition>
                    </div>
                    <a class="bei" href="https://beian.miit.gov.cn">豫ICP备2021006859号-1</a>
                </el-main>
            </el-container>
        </el-container>
        
            <!-- <click-bubbles :x="bubblesX" :y="bubblesY"></click-bubbles> -->
    </div>
</template>

<script>
import MyHeader from '../components/Index/MyHeader.vue';
import MyAside from '../components/Index/MyAside'
import ClickBubbles from '../components/common/ClickBubbles.vue';
export default {
    data(){
       return {
            bubblesX:0,
            bubblesY:0
       }
    },
    components:{
        MyAside,
        MyHeader,
        ClickBubbles
    },
    methods:{
        pageClick(e){
            // console.log(e);
            this.bubblesX = e.pageX
            this.bubblesY = e.pageY
        }
    }
};
        
</script>

<style lang="scss" scoped>
.page{
    width: 100vw;
    height: 100vh;
}
.el-aside{
    padding: 10px;
    box-sizing: border-box;
}
.el-aside,.el-container{
    height: 100vh;
    position: relative;
}
.el-header{
    padding:0 ;
}
.back{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        // z-index:0;
        height: 100%;
    }
.el-main{
    background: skyblue;
    padding: 20px 50px;
    min-height:calc(100vh - 60px) ;
    
    .main{
        min-height: 97%;
        position: relative;
    }
    .bei{
        position: relative;
        bottom: 0;
        left: 41%;
        transform: translateX(-50%);
        color:rgb(167, 37, 59);
    }
}
.fold-left-enter-active {
    animation-name: fold-left-in;
    animation-duration: .4s;
}
@keyframes fold-left-in {
    0% {
     transform: scale(.5) translateY(80%);
      opacity: 1;
    }
    100% {
      transform: scale(1) translateY(0%);
      opacity: 1;
    }
  }
</style>