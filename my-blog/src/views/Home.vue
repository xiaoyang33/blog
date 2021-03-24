<template>
    <div class="main-container">
        <div class="article">
            <article-module-1
                v-for="i in 10"
                :index="i"
                :key="i"
            ></article-module-1>
        </div>
        <div class="aside">
            <aside-module-1>
              <template v-slot:title>标题</template>
            </aside-module-1>
        </div>
    </div>
</template>

<script>
import ArticleModule1 from "@/components/my-modules/ArticleModule1.vue";
import AsideModule1 from "@/components/my-modules/AsideModule1.vue";
export default {
    components: {
        ArticleModule1,
        AsideModule1,
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