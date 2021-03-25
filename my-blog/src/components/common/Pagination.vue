<template>
    <ul class="pagination" v-if="total > 0">
        <li @click="preOne" :style="{visibility: currentIndex !== 1 ?  'visible' : 'hidden'}">
            <i class="el-icon-arrow-left"></i>
        </li>
        <li
            v-for="item in pages"
            :style="{ background: backColor }"
            :class="{ selected: currentIndex === item }"
            :key="item"
            @click="handlePageClick(item)"
        >
            {{ item }}
        </li>
        <li @click="nextOne"  :style="{visibility: !isLastPage ?  'visible' : 'hidden'}">
            <i class="el-icon-arrow-right"></i>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            currentIndex: 1
        };
    },
    props: {
        pageNum: {
            type: Number,
            default: 1,
        },
        pageSize: {
            type: Number,
            default: 10,
        },
        total: {
            type: Number,
            default: 0,
        },
        maxMenu: {
            type: Number,
            default: 5,
        },
        backColor: {
            type: String,
            default: "#00c4b6",
        },
    },
    computed: {
        totalPage() {
            let num = Math.ceil(this.total / this.pageSize);
            return num 
        },
        isLastPage() {
            return this.totalPage === this.currentIndex
        },
        minPage(){
            let menu = Math.floor(this.maxMenu / 2)
            let minP = this.currentIndex - menu
            if(minP <= 0){
                minP = 1
            }else if(minP > Math.floor(this.totalPage / 2) ){
                minP = Math.floor(this.totalPage / 2) 
            }
            return minP
        },
        maxPage(){
            let max = this.minPage + this.maxMenu - 1
            if(max > this.totalPage) max = this.totalPage
            return max
        },
        pages(){
            let arr = []
            for(let i = this.minPage ; i <= this.maxPage ;i++){
                arr.push(i)
            }
            // console.log(arr,this.currentIndex,this.totalPage)
            return arr
        }
    },
    methods: {
        preOne() {
            if (this.currentIndex === 1) return;
            this.currentIndex--;
            this.$emit("update:pageNum",this.currentIndex)
        },
        nextOne() {
            if (this.isLastPage) return;
            this.currentIndex++;
            this.$emit("update:pageNum",this.currentIndex)
        },
        handlePageClick(index){
            this.currentIndex = index
            this.$emit("update:pageNum",this.currentIndex)
        }
    },
};
</script>

<style lang="scss" scoped>
.pagination {
    display: flex;
    padding: 20px 0;
    justify-content: center;
    li {
        transition: .3s;
        $liSize: 30px;
        width: $liSize;
        height: $liSize;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0px 10px;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        &.selected {
            background: rgb(196, 81, 32) !important;
        }
    }
}
</style>