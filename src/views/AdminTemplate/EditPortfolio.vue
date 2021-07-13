<template>
  <div>
    <loader v-if="isLoading"></loader>
    <v-card class="col-12 col-md-11 col-lg-10 mx-auto" v-if="!isLoading">
      <v-card-text style="min-height: 85vh">
        <v-form>
          <v-card width="200" height="200">
            <v-img :src="showImage" height="200" width="200"></v-img>
          </v-card>
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
            @click="updateFormData"
            outlined
            class="my-2 mx-auto"
            color="primary"
            ><v-icon left>mdi-content-save</v-icon> Güncelle
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
      showImage: "",
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
      getData(){
          this.isLoading = true;
    Promise.all([
      this.$store.dispatch("PortfolioModule/findById", {
        id: this.$route.params.id,
      }),
      this.$store.dispatch("PortfolioCategoryModule/findAll"),
    ]).then((res) => {
      this.formData = res[0];
      this.content = res[0].description;
      this.showImage = res[0].image;
      this.isLoading = false;
    });
      },
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
    updateFormData() {
      this.formData.description = this.content;

      if (this.image) {
        var image = new FormData();
        image.append("file", this.image);

        serverClient
          .post("/file", image)
          .then((result) => {
            this.formData.image =
              "/storage/" + result.data.file; // Get url from response
            this.$store
              .dispatch("PortfolioModule/update", this.formData)
              .then(() => {
                this.$toast.success("Başarıyla kaydedildi", {
                  top: true,
                  right: true,
                });
                this.getData()
              })
              .catch((error) => {
                this.$toast.fail(`Kaydedilirken bir hata oluştu ${error}`, {
                  top: true,
                  right: true,
                });
              });
          })
          .catch((error) => {
            this.$toast.fail(`Kaydedilirken bir hata oluştu ${error}`, {
              top: true,
              right: true,
            });
          });
      } else {
        this.$store
          .dispatch("PortfolioModule/update", this.formData)
          .then(() => {
            this.$toast.success("Başarıyla kaydedildi", {
              top: true,
              right: true,
            });
            this.getData()
          })
          .catch((error) => {
            this.$toast.fail(`Kaydedilirken bir hata oluştu ${error}`, {
              top: true,
              right: true,
            });
          });
      }
    },
  },
  mounted() {
    this.getData()
  },
};
</script>

<style>
</style>