<template>
  <div style="background-color:white" class="rounded-lg">
    <p class="pt-5 pl-5 font-weight-black">BERAT EKE</p>
    <p class="pl-5">FRONTEND DEVELOPER</p>
    <div
      style="
        background-color: teal;
        width: 100%;
        padding: 0px;
        margin: 0px;
        height: 250px;
        clip-path: polygon(0 10%, 100% 0, 100% 95%, 0 100%);
      "
      class="profil-photo"
    >
      <v-img src="/storage/files/7hwX3EaJ2XQjTbamuV3EpstUW7OIkwo801SDCqdO.jpg" style="width:100%; height:100%"></v-img>
    </div>
    <v-timeline dense clipped>
      <v-timeline-item fill-dot small icon="mdi-map-marker">
        <v-row class="pt-3">
          <v-col>
            <strong>Şehir</strong>
            <div class="caption">İstanbul</div>
          </v-col>
        </v-row>
      </v-timeline-item>
      <v-timeline-item fill-dot small icon="mdi-calendar">
        <v-row class="pt-3">
          <v-col>
            <strong>Doğum Tarihi</strong>
            <div class="caption">25 Aralık 1996</div>
          </v-col>
        </v-row>
      </v-timeline-item>
      <v-timeline-item fill-dot small icon="mdi-email">
        <v-row class="pt-3">
          <v-col>
            <strong>Email</strong>
            <div class="caption">yunusberateke@gmail.com</div>
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
    <v-row class="my-5">
      <v-btn class="ma-2 mx-auto" color="primary" dark rounded @click="downloadFile">
        <span style="color: black">Cv İndir</span>
        <v-icon dark color="black" right> mdi-download </v-icon>
      </v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  methods: {
    downloadFile(){
      this.$store.dispatch("DefaultValuesModule/cvDownload").then((blobFile)=>{
        const file = new Blob(
        [blobFile], 
        {type: 'application/pdf'});
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
    }
  }
};
</script>


<style scoped>

img {
  width: 100%;
  clip-path: polygon(0 13%, 100% 7%, 100% 86%, 0 94%);
}
p {
  margin-block-start: 0em;
  margin-block-end: 0em;
}
</style>
