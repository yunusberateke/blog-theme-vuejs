<template>
  <v-row class="px-2 py-10 pb-15">
    <div class="col-12 col-lg-6 pb-10">
      <v-row class="pa-0 ma-0">
        <v-avatar color="primary" class="ml-6" left>
          <v-icon color="black"> mdi-briefcase </v-icon>
        </v-avatar>
        <h3 class="my-auto ml-5">İş Geçmişim</h3>
      </v-row>
      <v-timeline dense clipped>
        <v-timeline-item small
          ><div class="pt-1">
            <h4>Saybersoft Software Informatics LLC.</h4>
            <h6 class="text-caption">Eyl 2020 - Devam</h6>
            <v-chip class="my-2">
              <v-icon small left>mdi-map-marker</v-icon> İstanbul   
            </v-chip>
            <p class="text-body-2 mt-1">
              CTO, Frontend Developer
            </p>
          </div>
        </v-timeline-item>
        <v-timeline-item small
          ><div class="pt-1">
            <h4>Terra Software Informatics LLC.</h4>
            <h6 class="text-caption">May 2018 - Eyl 2020</h6>
            <v-chip class="my-2">
              <v-icon small left>mdi-map-marker</v-icon> Konya
            </v-chip>
            <p class="text-body-2 mt-1">
              System Administrator, Javascript Developer
            </p>
          </div>
        </v-timeline-item>
      </v-timeline>
    </div>
    <div class="col-12 col-lg-6">
      <v-row class="pa-0 ma-0">
        <v-avatar color="primary" class="ml-6" left>
          <v-icon color="black"> mdi-school </v-icon>
        </v-avatar>
        <h3 class="my-auto ml-5">Eğitim Geçmişim</h3>
      </v-row>
      <v-timeline dense clipped>
        <v-timeline-item small
          ><div class="pt-1">
            <h4>Necmettin Erbakan Üniversitesi</h4>
            <h6 class="text-caption">2015-2020</h6>
            <v-chip class="my-2">
              <v-icon small left>mdi-map-marker</v-icon> Konya
            </v-chip>
            <p class="text-body-2 mt-1">
              Matematik & Bilgisayar Bilimleri Bölümü
            </p>
          </div>
        </v-timeline-item>
        <v-timeline-item small
          ><div class="pt-1">
            <h4>Orhangazi Anadolu Lisesi</h4>
            <h6 class="text-caption">2011-2015</h6>
            <v-chip class="my-2">
              <v-icon small left>mdi-map-marker</v-icon> Kocaeli
            </v-chip>
          </div>
        </v-timeline-item>
      </v-timeline>
    </div>
  </v-row>
</template>

<script>
export default {};
</script>

<style>
</style>