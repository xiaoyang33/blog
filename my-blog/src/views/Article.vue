<template>
    <div>
        <!-- 文章
        {{ this.$route.params.id }} -->
        <div class="article-title">
            <h3>{{article.articleTitle}}</h3>
            <div class="subtitle">
                <p><i class="el-icon-date"></i>{{formateUnix(article.createDate)}}</p>
                <p>已读次数:{{article.pageView}}</p>
                <!-- <p>评论:3</p> -->
            </div>
        </div>
        <div class="article" v-html="article.articleContent">
        </div>
        <div class="foot">
        -------------文章结束-------------
        </div>
    </div>
</template>

<script>
import operations from "@/api/operations";
import { formateUnix , isSameDay} from "@/utils/formateDay";
export default {
    data(){
        return {
            article:{}
        }
    },
    created(){
        let _id = this.$route.params.id
        operations.getArticleById({_id}).then(res=>{
            // console.log(res)
            this.article = res.data.data
        })
        let dateTag = this.getStorage(_id)
        if(!dateTag){
         this.setStorage(_id,new Date().getTime())
         this.upDatePageView()
        }else{
            if(isSameDay(dateTag)){
                return
            }else{
                 this.setStorage(_id,new Date().getTime())
                 this.upDatePageView()
            }
        }
        
    },
    methods:{
        formateUnix,
        upDatePageView(){
            operations.updataPageView({_id:this.$route.params.id}).then(res=>{
                console.log(res)
            })
        }
    }
};
</script>

<style lang="scss" scoped>
@import './css/article.scss';
.article-title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    h3 {
        font-size: 30px;
        color: #555;
        margin: 20px;
    }
    .subtitle{
        color:#777;
        display: flex;
        margin-top: 10px;
        p{
            margin: 0px 10px;
        }
    }
}
.foot{
    display:flex;
    justify-content: center;
    padding: 10px 0;
    color: #666;
    margin-bottom: 20px;
}
</style>