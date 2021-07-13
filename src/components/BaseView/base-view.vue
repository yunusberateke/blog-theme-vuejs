<template >
  <v-app style="background-color: whitesmoke; background-image: url('https://images.unsplash.com/photo-1520762042279-ae3264026bd2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'); background-size: cover;">
    <div class="col-11 col-md-10 col-lg-8 mx-auto mt-lg-5 mt-10 mb-5">
      <v-row>
        <!-- Left Side -->
        <div
          class="col-md-4 col-lg-3 elevation-2 pb-5 rounded-lg"
          style="padding: 0px; margin: 0px; height: 695px; background-color:white"
        >
          <my-abaut-card></my-abaut-card>
        </div>
        <div class="col-12 col-md-8 col-lg-9 pl-md-10 pa-0 ma-0 ">
          <!-- Navbar -->
          <my-navbar></my-navbar>
          <section>
            <v-row
              class="pa-0 ma-0 mt-5 elevation-2 rounded-lg"
              style="min-height: 600px; background-color: white"
            >
              <div class="col-12 pa-0 ma-0">
                  <slot />
              </div>
            </v-row>
          </section>
          <v-footer class="mt-5 py-5 grey darken-3 rounded-lg" dark>
            <v-row>
              <div class="col-lg-4 col-md-12">Berat EKE</div>
              <div class="text-lg-end col-lg-8 col-md-12 text-caption pr-lg-10">
                © 2021 Tüm haklar saklıdır
              </div>
            </v-row>
          </v-footer>
        </div>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import myAbautCard from "@/components/MyAboutCard/my-abaut-card.vue";
import MyNavbar from "@/components/MyNavbar/my-navbar.vue";
export default {
  components: { myAbautCard, MyNavbar },
  name: "App",
  computed: {
    bgImage() {
      return this.$vuetify.theme.dark
        ? "url(" + require("@/assets/backgrounds/dark.jpg") + ")"
        : "url(" + require("@/assets/backgrounds/light.jpg") + ")";
    },
  },
  data: () => ({
    //
  }),
  created() {


  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
