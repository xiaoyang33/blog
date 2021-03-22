<template>
  <div style="width:80%">
      <page-module-1 v-for="i in 10" :index="i"></page-module-1>
  </div>
</template>

<script>
import PageModule1 from '../components/my-modules/PageModule1.vue'
export default {
    components: { PageModule1 },

}
</script>

<style>

</style>