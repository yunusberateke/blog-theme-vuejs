<template>
  <div>
    <v-row class="ma-0 pa-0" style="height:40vh" v-if="isLoading">
      <v-progress-circular
        indeterminate
        color="primary"
        class="mx-auto my-auto"
      ></v-progress-circular>
    </v-row>
    <div v-if="!isLoading">
      <about-me></about-me>
      <my-services></my-services>
      <use-programming-lenguage></use-programming-lenguage>
    </div>
  </div>
</template>

<script>
import AboutMe from "../components/AboutMe/about-me.vue";
import MyServices from "../components/MyServices/my-services.vue";
import UseProgrammingLenguage from "../components/UseProgrammingLanguage/use-programming-lenguage.vue";
export default {
  name: "Home",
  components: { AboutMe, MyServices, UseProgrammingLenguage },
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 300)
  },
};
</script>

<style scoped>
.section-title span {
  background-color: #ffb100 !important;
  position: absolute;
  height: 7px;
  width: 100%;
  bottom: 0;
  opacity: 0.4;
  left: 0;
}
</style>
