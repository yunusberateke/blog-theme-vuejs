<template>
  <div>
    <v-snackbar v-model="failModel" vertical color="error" top right app>
          <v-layout align-center pr-4>
              <v-icon class="pr-3" dark large>mdi-alert</v-icon>
              <v-layout column>
                  <div>
                      <strong>Mesaj gönderilirken bir hata ile karşılaşıldı.</strong>
                  </div>

              </v-layout>
          </v-layout>
      </v-snackbar>
      <v-snackbar v-model="successModel" vertical color="success" top right app>
          <v-layout align-center pr-4>
              <v-icon class="pr-3" dark large>mdi-check-all</v-icon>
              <v-layout column>
                  <div>
                      <strong>Mesajınız başarıyla gönderildi.</strong>
                  </div>

              </v-layout>
          </v-layout>
      </v-snackbar>
  </div>
</template>
<script>
export default{
  props: ["fail", "success"],
  data(){
    return{
        failModel:this.fail,
        successModel:this.success
    }
  },
  watch: {
    fail() {
      this.failModel = this.fail
    },
    success() {
      this.successModel = this.success
    }
  }
}
</script>
