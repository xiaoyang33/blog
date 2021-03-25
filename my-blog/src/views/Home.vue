<template>
    <div class="main-container">
        <div class="article">
            <article-module-1
                v-for="(item,index) in article"
                :index="index"
                :articleInfo="item"
                :key="item._id"
            ></article-module-1>
            <pagination :pageNum.sync="query.pageNum" :pageSize="query.pageSize" :total="query.total"/>
        </div>
        <div class="aside">
            <aside-module-1>
                <template v-slot:title>标题</template>
            </aside-module-1>
        </div>
    </div>
</template>

<script>
import ArticleModule1 from "@/components/my-modules/ArticleModule1";
import AsideModule1 from "@/components/my-modules/AsideModule1";
import Pagination from "../components/common/Pagination.vue";
import operations from "@/api/operations";
export default {
    components: {
        ArticleModule1,
        AsideModule1,
        Pagination
    },
    data() {
        return {
            query: {
                pageSize:8,
                pageNum:1,
                total:0
            },
            article:[]
        };
    },
    created() {
        this.initList();
    },
    watch:{
        'query.pageNum'(n){
            this.initList();
        }
    },
    methods: {
        initList() {
            operations.getArticle({...this.query}).then((res) => {
                this.query.total = res.data.total
                this.article = res.data.data
                console.log(res,this.article,this.query);
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.main-container {
    display: flex;
    .article {
        margin-right: 30px;
        flex-shrink: 0;
        width: 70%;
    }
    .aside {
        // flex: 1;
        width: 30%;
    }
}
</style>