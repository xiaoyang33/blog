<template>
    <div>
        <div class="head">
            <div class="title-img">
                <img src="~@/assets/img/wor1.jpg" alt="" />
            </div>
        </div>
        <div class="container">
            <h3>落鲸</h3>
            <div class="desc">
                要确信自己可以这样你才真的可以
            </div>
            <div class="card-info">
                <div>
                    <p>文章</p>
                    <p>30</p>
                </div>
                <div>
                    <p>分类</p>
                    <p>7</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.head {
    height: 180px;
    background: #4d4d4d;
    position: relative;
    .title-img {
        width: 128px;
        height: 128px;
        border-radius: 50%;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%,50%);
        img {
            width: 118px;
            height: 118px;
            border-radius: 50%;
        }
    }
}
.container{
    padding-top: 80px;
    display: flex;
    align-items: center;
    flex-direction: column;
    h3{
        color: #696969;
        font-size: 30px;
        font-weight: bold;
        text-align: center;
    }
    .desc{
        width: 70%;
        text-align: center;
        margin-top: 20px;
        color: #999;
        letter-spacing: 1px;
        font-size: 14px;
        line-height: 20px;
    }
    .card-info{
        width: 100%;
        display: flex;
        justify-content: center;
        div{
            cursor: pointer;
            text-align: center;
            &:first-child{
                margin-right: 20px;
            }
            &:hover{
                color: rgb(119, 101, 60);
            }
        }
    }
}
</style>