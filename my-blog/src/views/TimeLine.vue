<template>
    <div class="time-box">
        <div class="title">{{ title }}</div>
        <div class="time-line">
            <div class="time-title">已经完成了{{query.total}}篇博客,要继续加油哟</div>
            <div class="article-box">
                <div class="time-article" v-for="item in article" :key="item._id"  @click="goArticle(item)">
                    <div class="item">
                        <img :src="item.thumbnail || require('../assets/img/6.jpg')" alt="" />
                        <div>
                            <p class="article-title">{{item.articleTitle}}</p>
                            <p><i class="el-icon-date"></i>{{formateUnix(item.createDate)}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <pagination :total="query.total" :pageSize="query.pageSize" :pageNum="query.pageNum"/>
    </div>
</template>

<script>
import Pagination from "../components/common/Pagination.vue";
import operations from "@/api/operations";
import { formateUnix } from "@/utils/formateDay";
export default {
    components: { Pagination },
    data() {
        return {
            article: [],
            title: "总档",
            query: {
                pageNum: 1,
                pageSize: 6,
                total: 0,
            },
        };
    },
     watch:{
        'query.pageNum'(){
            this.initList();
        }
    },
    created(){
        this.initList()
    },
    beforeRouteUpdate (to,from,next){
        // console.log(to)
        this.initList()
        next()
    },
    methods:{
        formateUnix,
        initList(){
             let classIfy = this.$route.query.classIfy
            if(classIfy) this.title = classIfy
            operations.getArticle({...this.query,classIfy}).then((res) => {
                this.query.total = res.data.total
                this.article = res.data.data
            });
        },
        goArticle(item){
            this.$router.push('/article/' + item._id)
        }
    }
};
</script>

<style lang="scss" scoped>
$lineColor: #49b1f5;
$paddingDistance: 40px;
.time-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
        font-size: 30px;
        margin: 25px 0 40px;
    }
}
.time-line {
    width: 4px;
    margin-left: -350px;
    .time-title {
        position: relative;
        left: 10px;
        width: 500px;
        margin-bottom: 30px;
        padding-left: $paddingDistance;
        // 标题圆圈
        &::after {
            content: "";
            width: 10px;
            height: 10px;
            border: 6px solid #49b1f5;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            left: -20px;
            top: 50%;
            transform: translateY(-50%);
        }
        // 标题往下的线
        &::before {
            content: "";
            position: absolute;
            left: -10px;
            width: 3px;
            height: 60px;
            background: $lineColor;
        }
    }
    .article-box {
        border-left: 3px solid #49b1f5;
        padding-left: $paddingDistance;
    }
    .time-article {
        position: relative;
        margin-bottom: 25px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
            &::after {
                border-color: #ff7242;
            }
            img {
                transform: scale(1.1);
            }
            .article-title {
                color: $lineColor !important;
                transform: translateX(20px);
            }
        }
        &:last-child {
            &::before {
                height: 0;
            }
        }
        // 文章圆圈
        &::after {
            content: "";
            width: 10px;
            height: 10px;
            border: 3px solid $lineColor;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            left: -50px;
            top: 50%;
            transform: translateY(-50%);
        }

        .item {
            display: flex;
            align-items: center;
            width: 400px;
            img {
                $imgSize: 75px;
                width: 120px;
                height: $imgSize;
                border-radius: 4px;
                margin-right: 15px;
                transition: 0.3s;
                flex-shrink: 0;
            }
            div {
                width: 100%;
                p {
                    line-height: 1.3;
                    font-size: 14px;
                    color: #666;
                    margin: 0;
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;

                    &:first-child {
                        margin-bottom: 10px;
                        color: #333;
                        transition: 0.5s;
                    }
                }
            }
        }
    }
}
</style>