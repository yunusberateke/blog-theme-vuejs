<template>
  <div>
    <div v-if="isLoading">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </div>
    <div v-else class="col-12 col-md-11 col-lg-10 mx-auto">
      <v-data-table
        class="mx-auto elevation-1"
        :items="data"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        :headers="headers"
        hide-default-footer
      >
        <template v-slot:item.veritfy_manipulated="{ item }">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon v-if="item.verify" color="green">mdi-check</v-icon>
                <v-icon v-else color="error">mdi-close</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item link v-for="(verifyItem, index) in verifyItems" :key="index">
                <v-list-item-title @click="item.verify = index">{{verifyItem.text}}</v-list-item-title>
              </v-list-item>
              
            </v-list>
          </v-menu>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn icon @click="updateComment(item)"><v-icon>mdi-update</v-icon></v-btn>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="getData"> Reset </v-btn>
        </template>
      </v-data-table>
      <v-pagination v-model="page" :length="count"></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemsPerPage: 6,
      page: 1,
      pageCount: Math.ceil(this.count / 6),
      verifyItems:[
        {text:"Onaylama", value:0},
        {text:"Onayla", value:1},
      ],
      headers: [
        {
          text: "İsim",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "Yorum",
          align: "start",
          sortable: false,
          value: "content",
        },
        {
          text: "Onay",
          align: "start",
          sortable: false,
          value: "veritfy_manipulated",
        },
        {
          text: "Onay Tarihi",
          align: "start",
          sortable: false,
          value: "verify_date",
        },
        {
          text: "PostId",
          align: "start",
          sortable: false,
          value: "postId",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      isLoading: false,
    };
  },
  methods: {
    getData(page) {
      this.isLoading = true;
      Promise.all([
        this.$store.dispatch("CommentModule/findAll", { page: page }),
        this.$store.dispatch("CommentModule/count"),
      ]).then(() => {
        this.isLoading = false;
      });
    },
    updateComment(item){
      this.$store.dispatch("CommentModule/update", item).then(()=>{
        this.$toast.success("Başarıyla Kaydedildi");
      }).catch((error)=>{
        this.$toast.error(`Kaydedilirken bir hata oluştu ${error}`);
      }).finally(()=>{
        this.page = 1;
        this.getData()
      })
    }
  },
  computed: {
    data() {
      return this.$store.state.CommentModule.comments;
    },
    count() {
      return Math.ceil(this.$store.state.CommentModule.count / 6);
    },
  },

  created() {
    this.getData(1);
  },

  watch: {
    page(e) {
      this.getData(e);
    },
  },
};
</script>

<style>
</style>