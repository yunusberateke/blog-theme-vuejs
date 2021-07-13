<template>
  <div>
    <add-portfolio-category-dialog v-if="editDialog" :dialog.sync="editDialog" :categories="data" :edit="true" :categoryId="editedItem.id"></add-portfolio-category-dialog>
    <div class="col-12" v-if="isLoading">
      <v-progress-circular
        color="primary"
        indeterminate
        class="mx-auto"
      ></v-progress-circular>
    </div>
    <div v-else>
      <div class="col-10 mx-auto">
        <v-data-table
          class="mx-auto elevation-1"
          :page.sync="page"
          :headers="headers"
          :items-per-page="itemsPerPage"
          :items="data"
          hide-default-footer
          @page-count="pageCount = $event"
        >
          <template v-slot:item.actions="{ item }" >
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="getData"> Reset </v-btn>
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addPortfolioCategoryDialog from '../../components/AddPortfolioCategoryDialog/add-portfolio-category-dialog.vue';
export default {
  components: { addPortfolioCategoryDialog },
  methods: {
    editItem(item) {
      this.editDialog=true;

      this.editedIndex = this.data.indexOf(item);
      this.editedItem = item;


    },
    deleteItem(item) {
      this.editedIndex = this.data.indexOf(item);

    },
    getData() {
      this.isLoading = true;
      this.$store.dispatch("PortfolioCategoryModule/findAll").then(() => {
        this.isLoading = false;
      });
    },
  },

  computed: {
    data() {
      return this.$store.state.PortfolioCategoryModule.portfolio_category;
    },
  },

  data() {
    return {
      isLoading: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      editDialog:false,
      editedIndex: 0,
      editedItem:{
        name:"",
        description:"",
        parent:""
      },
      headers: [
        {
          text: "İsim",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "description",
          align: "start",
          sortable: false,
          value: "description",
        },
        {
          text: "Üst Kategori Id",
          align: "start",
          sortable: false,
          value: "parent",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>