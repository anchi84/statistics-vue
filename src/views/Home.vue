<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <FieldsComponent msg="Welcome to Your Vue.js App" :homeRoute="homeRoute" :appGetData.sync="appGetData"/>
  </div>
</template>

<script>
// @ is an alias to /src
import FieldsComponent from '@/components/FieldsComponent.vue'

export default {
  name: 'Home',
  components: {
    FieldsComponent
  },
  data () {
    return {
      homeRoute: true,
      appGetData: {}
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$route.params.homeRoute = false
    this.homeRoute = this.$route.params.homeRoute
    to.params.appGetData = this.appGetData
    next()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$route.params.homeRoute = true
      vm.homeRoute = vm.$route.params.homeRoute
    })
  }
}
</script>
