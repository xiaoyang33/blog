<template>
    <nav class="header">
        <div class="title">落鲸のBlog</div>
        <ul class="nav">
            <li
                class="nav-item"
                v-for="item in navEnums"
                :key="item.title"
                :class="{
                    overturn: item.icon2,
                    isSearch: item.path === 'search' && isSearchNow,
                }"
                :style="{color: item.path === $route.path ? '#008c8c': ''}"
                @click="navClick(item.path)"
            >
                <div
                    class="item"
                    :class="{ isSearch: item.path === 'search' && isSearchNow }"
                >
                    <template>
                        <i :class="item.icon1"></i>
                        <span v-if="item.path !== 'search' || !isSearchNow">{{
                            item.title
                        }}</span>
                        <template v-if="item.icon2">
                            <i :class="item.icon2"></i>
                            <ul class="floating">
                                <li v-for="ite in cate" :key="ite.articleClassIfy" @click.stop="goTimeLine(ite)">
                                    {{ ite.articleClassIfy }}
                                </li>
                            </ul>
                        </template>
                        <template v-if="item.path === 'search' && isSearchNow">
                            <input
                                type="text"
                                class="input"
                                placeholder="请输入搜索内容"
                            />
                            <i
                                i
                                class="el-icon-close"
                                @click.stop="closeSearch"
                            ></i>
                        </template>
                    </template>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>
import navEnums from "@/enums/navHeader";
import OtherApi from '@/api/otherApi'
export default {
    data() {
        return {
            navEnums,
            cate: [{ title: "Vue" }, { title: "Node" }, { title: "Web" }],
            isSearchNow: false,
        };
    },
    created(){
        this.getClassIfy()
    },
    methods: {
        navClick(path) {
            if (path === "search") {
                this.isSearchNow = true;
            } else {
                this.$router.push({
                    path
                });
            }
        },
        closeSearch() {
            this.isSearchNow = false;
        },
        getClassIfy(){
            OtherApi.getArticleClassIfy().then(res=>{
                console.log(res)
                this.cate = res.data
            })
        },
        goTimeLine(item){
            // console.log(item)
            this.$router.push({
                path:'/timeline',
                query:{
                    classIfy:item.articleClassIfy
                }
            })
        }
    },
};
</script>

<style lang="scss" scoped>
$liWidth: 73px;
.header {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    color: #eee;
    background: rgb(183, 216, 230);
    .title{
        flex-shrink: 0;
    }
    .nav {
        margin-left: auto;
        display: flex;
        height: 100%;
        .nav-item {
            height: 100%;
            display: flex;
            align-items: center;
            cursor: pointer;
            margin: 0 10px;
            transition: 0.3s;
            position: relative;
            width: $liWidth;
            .item {
                width: $liWidth;
                position: relative;
                display: flex;
                align-items: center;
                &::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    transition: 0.4s;
                    height: 3px;
                    left: 0;
                    right: 0;
                    background: #80c8f8;
                    width: 0;
                }
            }
            span {
                display: inline-block;
                padding: 10px 4px;
            }
            // 横条动画
            &:hover .item::after {
                width: 100%;
            }
            // 二级菜单
            &:hover .floating {
                display: flex;
                z-index:1;
                left: 0;
                opacity: 1;
                transition: 0.3s;
            }
            // 下面的箭头翻转
            &.overturn:hover {
                i {
                    &:nth-child(2) {
                        transform: rotate(180deg);
                    }
                }
            }
            i {
                transition: 0.4s;
                font-weight: bold;
            }
        }
    }
    .floating {
        position: absolute;
        top: 40px;
        left: -50px;
        display: flex;
        width: 100%;
        opacity: 0;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background:#eee;
        border-radius: 4px;
        color: #333;
        padding: 10px 0;
        li {
            padding: 5px 0;
            text-align: center;
            width: 100%;
            &:hover {
               background: cadetblue;
            }
        }
    }
    .isSearch {
        transition: 0.3s;
        width: 200px !important;
    }
    .input {
        background: transparent;
        margin-top: 4px;
        padding: 3px 5px;
        border-bottom: 1px solid #80c8f8;
        color: #999;
        &::placeholder {
            color: #eee;
            font-size: 13px;
        }
    }
}
</style>