<template>
  <div>
    <loader v-if="isLoading"></loader>
    <v-card class="col-12 col-md-11 col-lg-10 mx-auto" v-if="!isLoading">
      <v-card-text style="min-height: 85vh">
        <v-form>
          <v-file-input
            v-model="image"
            prepend-icon="mdi-camera"
            accept="image/png, image/jpeg, image/bmp"
            label="Resim"
          ></v-file-input>
          <v-text-field label="İsmi" v-model="formData.title"></v-text-field>
          <v-row class="ma-0 pa-0">
            <v-autocomplete
              item-text="name"
              item-value="id"
              :items="categories"
              v-model="formData.category_id"
              label="Kategori"
            ></v-autocomplete>
            <add-portfolio-category-dialog
              class="my-auto ml-2"
              :dialog.sync="dialog"
              :categories="categories"
            ></add-portfolio-category-dialog>
          </v-row>
          <v-text-field
            label="Github Url"
            v-model="formData.github_url"
          ></v-text-field>
        </v-form>
        <vue-editor
          placeholder="İçerik"
          id="editor"
          use-custom-image-handler
          @image-added="handleImageAdded"
          v-model="content"
          lang="tr"
          style="mim-height: 63vh"
        >
        </vue-editor>
        <v-row class="my-5">
          <v-btn
            @click="saveFormData"
            outlined
            class="my-2 mx-auto"
            color="primary"
            ><v-icon left>mdi-content-save</v-icon> Kaydet
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import serverClient from "@/store/http_client";
import Loader from "@/components/Loader/loader.vue";
import AddPortfolioCategoryDialog from "@/components/AddPortfolioCategoryDialog/add-portfolio-category-dialog.vue";
export default {
  components: { VueEditor, Loader, AddPortfolioCategoryDialog },
  data() {
    return {
      content: "",
      image: null,
      formData: {
        title: null,
        category_id: null,
        github_url: null,
      },
      isLoading: false,
      dialog: false,
    };
  },
  computed: {
    categories() {
      return this.$store.state.PortfolioCategoryModule.portfolio_category;
    },
  },
  methods: {
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);

      serverClient
        .post("/file", formData)
        .then((result) => {
          let url = "/storage/" + result.data.file; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveFormData() {
      this.formData.description = this.content;
      var image = new FormData();
      image.append("file", this.image);

      serverClient
        .post("/file", image)
        .then((result) => {
          this.formData.image =
            "/storage/" + result.data.file; // Get url from response
          this.$store
            .dispatch("PortfolioModule/save", this.formData)
            .then(() => {
              this.$toast.success("Başarıyla kaydedildi", {
                top: true,
                right: true,
              });
            })
            .catch((error) => {
              this.$toast.error(`Kaydedilirken bir hata oluştu ${error}`, {
                top: true,
                right: true,
              });
            });
        })
        .catch((error) => {
          this.$toast.error(`Kaydedilirken bir hata oluştu ${error}`, {
            top: true,
            right: true,
          });
        });
    },
  },
  mounted() {
    this.isLoading = true;
    this.$store.dispatch("PortfolioCategoryModule/findAll").then(() => {
      this.isLoading = false;
    });
  },
};
</script>

<style>
</style>