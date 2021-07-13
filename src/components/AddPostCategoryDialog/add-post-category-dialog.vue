<template>
  <div>
    <v-btn icon @click="$emit('update:dialog', true)" v-if="!edit"
      ><v-icon>mdi-plus</v-icon></v-btn
    >

    <v-dialog v-model="dialogModel" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Post Kategori Ekle
        </v-card-title>
        <v-progress-circular
          v-if="isLoading"
          color="primary"
          indeterminate
        ></v-progress-circular>
        <v-card-text v-else>
          <v-form ref="form">
            <v-file-input
              v-model="image"
              prepend-icon="mdi-camera"
              accept="image/png, image/jpeg, image/bmp"
              label="Resim"
            ></v-file-input>
            <v-text-field label="İsim" v-model="formData.name"></v-text-field>
            <v-autocomplete
              item-text="name"
              item-value="id"
              :items="categories"
              label="Üst Kategorisi"
              v-model="formData.parent"
            ></v-autocomplete>
            <v-textarea
              label="Açıklama"
              v-model="formData.description"
            ></v-textarea>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="save"> Kaydet </v-btn>
          <v-btn color="error" text @click="closeDialog"> İptal </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import serverClient from "@/store/http_client";

export default {
  props: {
    dialog: {
      default: false,
    },
    categories: {
      default: [],
    },
    edit: {
      default: false,
    },
    categoryId: {
      type: Number,
    },
  },
  data() {
    return {
      dialogModel: this.dialog,
      isLoading: false,
      image: null,
      formData: {
        name: null,
        description: null,
        parent: null,
        image: null,
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:dialog", false);
    },

    save() {
      var image = new FormData();
      image.append("file", this.image);

      if (this.edit) {
        serverClient
          .post("/file", image)
          .then((result) => {
            this.formData.image =
              "/storage/" + result.data.file; // Get url from response
            this.$store
              .dispatch("CategoryModule/update", this.formData)
              .then(() => {
                this.$toast.success("Başarıyla Eklendi!", {
                  position: "top-right",
                });
                this.$refs.form.reset();
                this.$store
                  .dispatch("CategoryModule/findAll")
                  .then(() => {
                    this.closeDialog();
                  })
                  .catch((error) => {
                    this.$toast.error(
                      `Kaydedilirken bir hata oluştu ${error}`,
                      {
                        position: "top-right",
                      }
                    );
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
        serverClient
          .post("/file", image)
          .then((result) => {
            this.formData.image =
              "/storage/" + result.data.file; // Get url from response
            this.$store
              .dispatch("CategoryModule/save", this.formData)
              .then(() => {
                this.$toast.success("Başarıyla Eklendi!", {
                  position: "top-right",
                });
                this.$refs.form.reset();
                this.$store
                  .dispatch("CategoryModule/findAll")
                  .then(() => {
                    this.$toast.success(`Başarıyla eklendi`, {
                      position: "top-right",
                    });
                    this.closeDialog();
                  })
                  .catch((error) => {
                    this.$toast.error(
                      `Kaydedilirken bir hata oluştu ${error}`,
                      {
                        position: "top-right",
                      }
                    );
                  });
              });
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
    if (this.edit) {
      this.isLoading = false;
      this.$store
        .dispatch("CategoryModule/findById", this.categoryId)
        .then((e) => {
          this.formData = e;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    }
  },
  watch: {
    dialog() {
      this.dialogModel = this.dialog;
    },
  },
};
</script>

<style>
</style>