<template>
  <div>
    <v-btn icon @click="$emit('update:dialog', true)"
      ><v-icon>mdi-plus</v-icon></v-btn
    >
    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2">Tag Ekle</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field label="İsim" v-model="formData.name"></v-text-field>
          </v-form>
        </v-card-text>
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
      type: Boolean,
      default: true,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    tagId: {
      type: Number,
      default: 1,
    }
  },
  methods: {
    closeDialog() {
      this.$emit("update:dialog", false);
    },
    save() {
      if (this.edit) {
        this.$store.dispatch("TagModule/update", this.formData).then(() => {
          this.$toast.success("Başarıyla Eklendi!", {
            position: "top-right",
          });
          this.$refs.form.reset();
          this.$store
            .dispatch("TagModule/findAll")
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
        this.$store.dispatch("TagModule/save", this.formData).then(() => {
          this.$toast.success("Başarıyla Eklendi!", {
            position: "top-right",
          });
          this.$refs.form.reset();
          this.$store
            .dispatch("TagModule/findAll")
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
  data() {
    return {
      dialogModel: this.dialog,

      formData: {
        name: null,
      },
    };
  },
  watch: {
    dialog() {
      this.dialogModel = this.dialog;
    },
  },
  created(){
    if(this.edit){
      this.$store.dispatch("TagModule/findById",{id:this.tagId}).then((e)=>{
        this.formData = e;
      })
    }
  }
};
</script>

<style>
</style>
