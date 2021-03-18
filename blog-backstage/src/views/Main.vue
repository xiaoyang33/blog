<template>
    <div class="page">
        <el-container>
            <el-aside width="160px">
                <div class="title">落鲸</div>
                <!-- @open="handleOpen"
                    @close="handleClose" -->
                <el-menu
                    :uniqueOpened="true"
                    :default-active="$route.path"
                    class="el-menu-vertical-demo"
                    background-color="transparent"
                    text-color="#fff"
                    router
                    active-text-color="#ffd04b"
                >
                    <template v-for="(item, index) in routerEnums">
                        <el-menu-item
                            :index="item.path"
                            v-if="!item.children"
                            :key="index"
                        >
                            <i :class="item.icon"></i>
                            <template #title>{{ item.title }}</template>
                        </el-menu-item>
                        <el-submenu index="1" :key="index" v-if="item.children">
                            <template #title>
                                <i class="el-icon-location"></i>
                                <span>{{ item.title }}</span>
                            </template>
                            <template v-for="(ite, ind) in item.children">
                                <el-menu-item :index="ite.path" :key="ind">
                                    <i :class="ite.icon"></i>
                                    <template #title>{{ ite.title }}</template>
                                </el-menu-item>
                            </template>
                        </el-submenu>
                    </template>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header height>
                    <div class="left"></div>
                    <div class="right">
                        <img src="@/assets/images/user.png" alt="">
                       <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                admin<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </el-header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import routerEnums from "@/enums/routes";
export default {
    data() {
        return {
            routerEnums,
        };
    },
    methods:{
        loginOut(){
            this.removeStorage('token')
            this.$router.push('/login')
        }
    }
};
</script>

<style lang="scss" scoped>
$headerHeight: 80px;
.page {
    height: 100vh;
    width: 100vw;
    background: #efe;
}
.el-aside {
    background: #788269;
    height: 100vh;
    .title {
        height: $headerHeight;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        color: #FAEFD3;
    }
    .el-menu-vertical-demo {
        height: calc(100vh - #{$headerHeight});
    }
}
.el-header {
    background:#788269;
    width: 100%;
    height: $headerHeight;
    display:flex;
    align-items: center;
    .left{
        flex: 1;
    }
    .right{
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }
    }
    .el-dropdown-link{
        cursor: pointer;
        color:#FAEFD3;
    }
}
.el-main {
    width: 100%;
    height: 100%;
    // background:yellow;
}
</style>