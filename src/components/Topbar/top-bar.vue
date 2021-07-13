<template>
  <v-app-bar app color="#FFFFFF" class="ma-3 elevation-2">
    <v-btn
      icon
      class="hidden-lg-and-up mr-5"
      @click="$emit('update:drawer', true)"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    {{ $route.name }}
    <v-spacer></v-spacer>
    <profile-menu></profile-menu>
  </v-app-bar>
</template>

<script>
import profileMenu from '../ProfileMenu/profile-menu.vue';
export default {
  components: { profileMenu },
  props: ["drawer"],
  data() {
    return {
      title: null,
    };
  },
  watch: {
    "$router.path"() {
      this.title = this.$route.name;
    },
  },
  mounted() {
    this.title = this.$route.name;
  },
};
</script>

<style>
</style>