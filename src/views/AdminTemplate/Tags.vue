<template>
  <div>
    <add-tag-dialog :dialog.sync="editDialog" v-if="editDialog" :edit="true" :tagId="editItem.id"></add-tag-dialog>
    <v-dialog v-model="dialog" v-if="dialog" width="300">
      <v-card>
        <v-card-title style="background-color: grey">
          Emin misin?
        </v-card-title>
        <v-card-text> {{ deleteItem.name }} isimli tag silinecek </v-card-text>
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
        

        <template v-slot:item.created_at_show="{ item }">
          {{ new Date(item.created_at).toLocaleString("tr-TR") }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn icon @click="changeEditDialog(item)">
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
import addTagDialog from '../../components/AddTagDialog/add-tag-dialog.vue';
export default {
  components: { addTagDialog },
  data() {
    return {
      editDialog:false,
      editItem:null,
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
          value: "name",
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
        this.$store.dispatch("TagModule/findAll", { page: page }),
        this.$store.dispatch("TagModule/count"),
      ]).then(() => {
        this.isLoading = false;
      });
    },
    changeDialog(item) {
      this.deleteItem = item;
      this.dialog = true;
    },
    changeEditDialog(item){
      this.editItem = item;
      this.editDialog = true;

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
      this.$store.dispatch("TagModule/delete", {id:this.deleteItem.id}).then(()=>{
        this.$toast.success("Başarıyla Silindi")
      }).catch(()=>{
        this.$toast.error("Silinirken bir hata oluştu")
      })
    }
  },
  computed: {
    data() {
      return this.$store.state.TagModule.tags;
    },
    count() {
      return Math.ceil(this.$store.state.TagModule.count / 6);
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