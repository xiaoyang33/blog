<template>
  <div class="bubbles" ref="bubbles">
      dasdasd
  </div>
</template>

<script>
export default {
    props:{
        x:Number,
        y:Number
    },
    watch:{
        x(n){
            console.log(n);
            this.showPosition()
        }
    },
    methods:{
        showPosition(){
            let el = this.$refs.bubbles
            // console.log(el)
            el.style.left = this.x +'px'
            el.style.top = this.y + 'px'
        }
    }
}
</script>

<style lang="scss" scoped>
.bubbles{
    position: absolute;
    top: 1px ;
    left: 1px;
}
</style>