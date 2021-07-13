<template>
  <div>
    <loader v-if="isLoading"></loader>
    <v-card class="col-12 col-md-11 col-lg-10 mx-auto" v-else>
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
            <add-post-category-dialog
              class="my-auto ml-2"
              :dialog.sync="dialog"
              :categories="categories"
            ></add-post-category-dialog>
          </v-row>
        </v-form>
        <v-row class="ma-0 pa-0">
          <v-combobox
            v-model="chips"
            :items="itemsTags"
            chips
            clearable
            label="Taglar"
            item-text="name"
            item-value="id"
            multiple
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="remove(item)"
              >
                <strong>{{ item.name }}</strong>
              </v-chip>
            </template>
          </v-combobox>
          <add-tag-dialog
            class="my-auto ml-2"
            :dialog.sync="dialogTag"
          ></add-tag-dialog>
        </v-row>
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
import AddPostCategoryDialog from "../../components/AddPostCategoryDialog/add-post-category-dialog.vue";
import loader from "../../components/Loader/loader.vue";
import serverClient from "@/store/http_client";
import { VueEditor } from "vue2-editor";
import AddTagDialog from "../../components/AddTagDialog/add-tag-dialog.vue";

export default {
  components: { loader, AddPostCategoryDialog, VueEditor, AddTagDialog },
  data() {
    return {
      isLoading: false,
      content: "",
      image: null,
      dialog: false,
      dialogTag: false,
      chips: [],
      savedTags: [],
      formData: {
        title: null,
        content: null,
        image: null,
        category_id: null,
      },
    };
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
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    saveFormData() {
      this.formData.content = this.content;
      var image = new FormData();
      image.append("file", this.image);

      serverClient
        .post("/file", image)
        .then((result) => {
          this.formData.image =
            "/storage/" + result.data.file; // Get url from response
          this.$store
            .dispatch("PostModule/save", this.formData)
            .then((e) => {
              this.chips.forEach((element) => {
                this.$store
                  .dispatch("TagPostModule/save", {
                    postId: e.id,
                    tagId: element.id,
                  })
                  .then(() => {
                    this.$toast.success(
                      `Başarıyla Tag Eklendi ${element.name}`,
                      {
                        top: true,
                        right: true,
                      }
                    );
                  });
              });
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
          this.$toast.fail(`Kaydedilirken bir hata oluştu ${error}`, {
            top: true,
            right: true,
          });
        });
    },
  },
  computed: {
    categories() {
      return this.$store.state.CategoryModule.post_category;
    },
    itemsTags() {
      return this.$store.state.TagModule.tags;
    },
  },
  mounted() {
    this.isLoading = true;
    Promise.all([
      this.$store.dispatch("CategoryModule/findAll"),
      this.$store.dispatch("TagModule/findAll"),
    ]).then(() => {
      this.isLoading = false;
    });
  },
};
</script>

<style>
</style>