<template>
  <v-app>
    <top-bar :drawer.sync="drawer"></top-bar>
    <drawer :drawer.sync="drawer"></drawer>
    <v-main style="background-color: #f7f7f7">
      <section>
        <v-container fluid>
          <router-view class="col-12 py-5 pa-0 ma-0"></router-view>
        </v-container>
      </section>
    </v-main>
  </v-app>
</template>

<script>
import Drawer from '../components/Drawer/drawer.vue';
import topBar from '../components/Topbar/top-bar.vue';

export default {
  components: { topBar, Drawer },
  created() {
    this.$store.dispatch("AccountModule/login")
  },
  data(){
    return{
      drawer:true
    }
  }
};
</script>

<style>
</style>