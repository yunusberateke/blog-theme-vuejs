<template>
  <div>
    <v-dialog v-model="dialog" v-if="dialog" width="300">
      <v-card>
        <v-card-title style="background-color: grey">
          Emin misin?
        </v-card-title>
        <v-card-text> {{ deleteItem.title }} isimli post silinecek </v-card-text>
        <v-card-actions>
          <v-btn @click="deleteItemM"> Sil </v-btn>
          <v-btn @click="dialog = false">Vazgeç</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
              <v-list-item
                link
                v-for="(verifyItem, index) in verifyItems"
                :key="index"
              >
                <v-list-item-title @click="item.verify = index">{{
                  verifyItem.text
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-slot:item.show_image="{ item }">
          <v-card height="100" width="100" elevation="3">
            <v-img :src="item.image" width="200" height="200"></v-img>
          </v-card>
        </template>

        <template v-slot:item.created_at_show="{ item }">
          {{ new Date(item.created_at).toLocaleString("tr-TR") }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn icon @click="$router.push(`/iamboss46/post-edit/${item.id}`)">
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="changeDialog(item)">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
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
      deleteItem: null,
      dialog: false,
      page: 1,
      pageCount: Math.ceil(this.count / 6),
      verifyItems: [
        { text: "Onaylama", value: 0 },
        { text: "Onayla", value: 1 },
      ],
      headers: [
        {
          text: "İsim",
          align: "start",
          sortable: false,
          value: "title",
        },
        {
          text: "Resim",
          align: "dstart",
          sortable: false,
          value: "show_image",
        },
        {
          text: "Kategori Id",
          align: "start",
          sortable: false,
          value: "category_id",
        },
        {
          text: "Oluşturulma Tarihi",
          align: "start",
          sortable: false,
          value: "created_at_show",
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
        this.$store.dispatch("PostModule/findAll", { page: page }),
        this.$store.dispatch("PostModule/count"),
      ]).then(() => {
        this.isLoading = false;
      });
    },
    changeDialog(item) {
      this.deleteItem = item;
      this.dialog = true;
    },
    updateComment(item) {
      this.$store
        .dispatch("CommentModule/update", item)
        .then(() => {
          this.$toast.success("Başarıyla Kaydedildi");
        })
        .catch((error) => {
          this.$toast.error(`Kaydedilirken bir hata oluştu ${error}`);
        })
        .finally(() => {
          this.page = 1;
          this.getData();
        });
    },
    deleteItemM(){
      this.$store.dispatch("PostModule/delete", {id:this.deleteItem.id}).then(()=>{
        this.$toast.success("Başarıyla Silindi");
        this.dialog = false;
        this.getData(this.page);
      }).catch(()=>{
        this.$toast.error("Silinirken bir hata oluştu")
        this.dialog = false;
        this.getData(this.page);
      })
    }
  },
  computed: {
    data() {
      return this.$store.state.PostModule.posts;
    },
    count() {
      return Math.ceil(this.$store.state.PostModule.count / 6);
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