<template>
  <div>
    <v-btn icon @click="$emit('update:dialog', true)"
      v-if="!edit"><v-icon>mdi-plus</v-icon></v-btn
    >

    <v-dialog v-model="dialogModel" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Portfolyo Kategori Ekle
        </v-card-title>
        <v-progress-circular
          v-if="isLoading"
          color="primary"
          indeterminate
        ></v-progress-circular>
        <v-card-text v-else>
          <v-form ref="form">
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
      formData: {
        name: null,
        description: null,
        parent: null,
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:dialog", false);
    },

    save() {
      if (this.edit) {
        this.$store
          .dispatch("PortfolioCategoryModule/update", this.formData)
          .then(() => {
            this.$toast.success("Başarıyla Eklendi!", {
              position: "top-right",
            });
            this.$refs.form.reset();
            this.$store
              .dispatch("PortfolioCategoryModule/findAll")
              .then(() => {
                this.closeDialog();
              })
              .catch((error) => {
                this.$toast.error(`Kaydedilirken bir hata oluştu ${error}`, {
                  position: "top-right",
                });
              });
          });
      } else {
        this.$store
          .dispatch("PortfolioCategoryModule/save", this.formData)
          .then(() => {
            this.$toast.success("Başarıyla Eklendi!", {
              position: "top-right",
            });
            this.$refs.form.reset();
            this.$store
              .dispatch("PortfolioCategoryModule/findAll")
              .then(() => {
                this.closeDialog();
              })
              .catch((error) => {
                this.$toast.error(`Kaydedilirken bir hata oluştu ${error}`, {
                  position: "top-right",
                });
              });
          });
      }
    },
  },
  mounted() {
    if (this.edit) {
      this.isLoading = false;
      this.$store
        .dispatch("PortfolioCategoryModule/findById", this.categoryId)
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