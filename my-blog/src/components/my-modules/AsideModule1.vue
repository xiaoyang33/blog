<template>
    <div class="container">
        <div class="title">
            <slot name="title" />
        </div>
        <div class="main">
           <slot name="content">
                <ul class="article-list">
                <li v-for="item in article" :key="item._id">
                    <img src="../../assets/img/6.jpg" alt="" />
                    <div>
                        <p>{{item.articleTitle}}</p>
                        <p>{{formateUnix( item.createDate) }}</p>
                    </div>
                </li>
            </ul>
           </slot>
        </div>
    </div>
</template>

<script>
import { formateUnix } from "@/utils/formateDay";
export default {
    props:{
        article:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
            title: "标题1",
        };
    },
    methods:{
        formateUnix
    }
};
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    opacity: 0.95;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    background: #fff;
    box-shadow: 2px 3px 10px 2px #eee;
    overflow: hidden;
    margin-bottom: 20px;
    cursor: pointer;
    padding: 20px;
    box-sizing: border-box;
    &:hover {
        box-shadow: 2px 3px 20px 2px #e0e0e0;
    }
    .title {
        margin-bottom: 10px;
    }
    .main {
        .article-list {
            li {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                img {
                    $size: 50px;
                    width: $size;
                    height: $size;
                    margin-right: 20px;
                    border-radius: 3px;
                }
                div {
                    width: 100%;
                    p {
                        line-height: 1.3;
                        font-size: 14px;
                        color: #666;
                        margin: 0;
                        width: 70%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;

                        &:first-child {
                            margin-bottom: 10px;
                            color: #333;
                        }
                    }
                }
            }
        }
    }
}
</style>