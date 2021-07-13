<template>
  <div class="white rounded-lg">
    <v-dialog
      v-model="panel"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar flat color="primary">
          <v-spacer></v-spacer>
          <v-btn icon @click.native="panel = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.path"
            color="primary darken-2"
            @click="panel = false"
          >
            <v-list-item-action>
              <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
    <div class="hidden-lg-and-up mt-10"></div>
    <v-row class="pa-0 ma-0 elevation-2 rounded-lg">
      <router-link to="/">
        <v-btn color="primary" class="py-8 px-5 rounded-lg" dark>
          <v-icon dark color="black"> mdi-home </v-icon>
        </v-btn>
      </router-link>
      <div class="hidden-md-and-down my-auto">
        <router-link
          class="ml-5 hell"
          v-for="(item, key) in items"
          :key="key"
          :to="item.path"
        >
            <!-- font-weight-bold -->
          <a :class="$route.path.startsWith(item.path) ? 'text-uppercase text-subtitle-2  font-weight-bold' : 'text-uppercase text-subtitle-2 font-weight-bold  black--text'">{{
            item.text
          }}</a></router-link
        >
      </div>
      <v-spacer></v-spacer>
      <a class="my-auto" href="https://twitter.com/yunusberateke">
        <v-btn text icon>
          <v-icon small>mdi-twitter</v-icon>
        </v-btn>
      </a>
      <a class="my-auto" href="https://instagram.com/yunusberateke">
        <v-btn text icon>
          <v-icon small>mdi-instagram</v-icon>
        </v-btn>
      </a>
      <a class="my-auto" href="https://linkedin.com/in/berateke">
        <v-btn text icon>
          <v-icon small>mdi-linkedin</v-icon>
        </v-btn>
      </a>
      <v-divider vertical class="hidden-lg-and-up"> </v-divider>
      <v-btn icon class="ma-2 my-auto hidden-lg-and-up" @click="panel = true">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

    </v-row>
  </div>
</template>

<script>
export default {
  methods: {},
  data() {
    return {
      panel: false,
      items: [

        {
          text: "Özgeçmiş",
          icon: "mdi-history",
          path: "/result",
        },
        {
          text: "Portfolyo",
          icon: "mdi-file-document",
          path: "/portfolio",
        },
        {
          text: "Blog",
          icon: "mdi-pen",
          path: "/blog",
        },
        {
          text: "İletişim",
          icon: "mdi-message",
          path: "/contact",
        },
      ],
    };
  },
};
</script>

<style >
a {
  text-decoration: none;
}

.hell a:hover {
    border-bottom: 3px solid #FEC531;
}
</style>
