<template>
    <div class="container">
        <template v-for="item in sort">
            <div class="img" :key="item" v-if="item == '1'">
                <img src="~@/assets/img/6.jpg" alt="" />
            </div>
            <div class="article-container" :key="item"  v-if="item == '2'">
                <h3>{{articleInfo.articleTitle}}</h3>
                <div class="info">
                    <div class="is-top" v-if="item.isChangeTop === 1">
                        <i class="el-icon-star-on"></i>
                        置顶
                    </div>
                    <div class="time">
                        发表于{{ formateUnix(articleInfo.createDate) }}
                    </div>
                </div>
                <div class="desc">
                    {{articleInfo.articleContent}}
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { formateUnix } from "@/utils/formateDay";
export default {
    props: {
        articleInfo: {},
        index:{
            type:Number,
            default:0
        }
    },
    computed:{
        sort(){
            if(this.index % 2 === 1){
                return ['1','2']
            }else{
                 return ['2','1']
            }
        }
    },
    mounted() {
        // let data = new Date().getTime();
        // console.log(formateUnix(data), data);
    },
    methods: {
        formateUnix,
    },
};
</script>

<style lang="scss" scoped>
$imgHeight: 180px;
$imgWidth: 250px;
.container {
    opacity: .95;
    display: flex;
    border-radius: 5px;
    background: #fff;
    box-shadow: 2px 3px 10px 2px #eee;
    overflow: hidden;
    margin-bottom: 20px;
    cursor: pointer;
    max-height: $imgHeight;
    &:hover {
        box-shadow: 2px 3px 20px 2px #e0e0e0;
        .img img {
            transform: scale(1.1);
        }
    }
    .img {
        height: $imgHeight;
        width: $imgWidth;
        overflow: hidden;
        img {
            transition: 0.3s;
            height: $imgHeight;
            width: $imgWidth;
        }
    }
    .article-container {
        padding: 25px;
        box-sizing: border-box;
        width: calc(100% - #{$imgWidth});
        h3 {
            font-size: 20px;
            color: #666;
            cursor: pointer;
            &:hover {
                color: #49b1f5;
            }
        }
        .info {
            display: flex;
            align-items: center;
            margin-top: 10px;
            .is-top {
                display: flex;
                align-items: center;
                color: #ff7242;
                margin-right: 10px;
                i {
                    font-size: 20px;
                }
            }
        }
        .time {
            font-size: 14px;
            color: #999;
            margin: 10px 0 0;
        }
        .desc {
            margin-top: 10px;
            width: 70%;
            font-size: 14px;
            line-height: 25px;
            color: #999;
            // max-width: 300px;

            // 溢出省略
            overflow: hidden;
            white-space: normal;
            text-overflow: ellipsis;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            display: -webkit-box;
        }
    }
}
</style>