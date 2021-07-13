<template>
  <v-form>
    <v-text-field label="İsim" outlined type="text" v-model="formData.name"></v-text-field>
    <v-text-field label="E-posta" outlined type="email" v-model="formData.email"></v-text-field>
    <v-text-field label="Başlık" outlined type="text" v-model="formData.title"></v-text-field>
    <v-textarea outlined label="Mesaj" rows="9" no-resize row-height="25" v-model="formData.content">
    </v-textarea>
    <v-row>
      <v-btn class="primary black--text mx-auto mt-5 mb-15" rounded @click="mailSend"
        >Gönder</v-btn
      >
    </v-row>
  </v-form>
</template>
<script>
export default{
  props:["success", "fail"],
  data(){
    return {
      formData: {
        title: null,
        name: null,
        email: null,
        content: null
      }
    }
  },
  methods: {
    mailSend(){
      this.$store.dispatch("SendMailModule/sendMail", this.formData).then(()=>{
        this.$emit("update:success",true);
        this.formData = {
          title: null,
          name: null,
          email: null,
          content: null
        }
        setTimeout(()=>{
          this.$emit("update:success",false);
        }, 1000)
      }).catch(()=>{
        this.$emit("update:fail",true);
        setTimeout(()=>{
          this.$emit("update:success",false);
        }, 1000)
      });
    }
  },
}
</script>
