<template>
  <div class="index">
    <MyHeader></MyHeader>
    <MyNav></MyNav>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyHeader from "./MyHeader"
import MyFooter from "./MyFooter"
import MyNav from "./MyNav"
export default {
  name: 'MyIndex',
  data () {
    return {
      msg: ''
    }
  },
  components: {MyHeader, MyFooter, MyNav}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
