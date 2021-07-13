<template>
  <v-navigation-drawer v-model="drawerModel" app width="220" color="#FDFDFD">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Berat EKE Blog </v-list-item-title>
        <v-list-item-subtitle> Admin Paneli </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav color="#FFFFFF" class="ma-1">
      <v-list-item-group>
        <v-list-item link to="/iamboss46/dashboard">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/iamboss46/comments">
          <v-list-item-icon>
            <v-icon>mdi-comment-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Yorumlar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group link prepend-icon="mdi-book-open-page-variant">
          <template v-slot:activator>
            <v-list-item-title>Blog</v-list-item-title>
          </template>
          <v-list-item to="/iamboss46/posts">
            <v-list-item-title>Postlar</v-list-item-title>
          </v-list-item>
          <v-list-item to="/iamboss46/add-post">
            <v-list-item-title> Post Ekle</v-list-item-title>
          </v-list-item>
          <v-list-item to="/iamboss46/tags">
            <v-list-item-title>Tags</v-list-item-title>
          </v-list-item>
          <v-list-item to="/iamboss46/post-categories">
            <v-list-item-title>Post Kategorileri</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group link prepend-icon="mdi-history">
          <template v-slot:activator>
            <v-list-item-title>Portfolyo</v-list-item-title>
          </template>
          <v-list-item to="/iamboss46/portfolios">
            <v-list-item-title>Portfolyolar</v-list-item-title>
          </v-list-item>
          <v-list-item to="/iamboss46/add-portfolio">
            <v-list-item-title> Portfolyo Ekle</v-list-item-title>
          </v-list-item>
          <v-list-item to="/iamboss46/portfolio-categories">
            <v-list-item-title>Portfolyo Kategorileri</v-list-item-title>
          </v-list-item>
        </v-list-group>
        
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["drawer"],
  data() {
    return {
      drawerModel: this.drawer,
    };
  },
  watch: {
    drawer() {
      this.drawerModel = this.drawer;
    },
    drawerModel() {
      this.$emit("update:drawer", this.drawerModel);
    },
  },
};
</script>

<style>
</style>