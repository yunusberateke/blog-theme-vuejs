<template>
  <div class="mr-2">
    <v-menu left offset-y max-width="250" min-width="250">
      <template v-slot:activator="{ on, attrs }">
        <v-avatar color="teal" v-bind="attrs" v-on="on">
          <v-img src="/storage/files/7hwX3EaJ2XQjTbamuV3EpstUW7OIkwo801SDCqdO.jpg" style="width:100%; height:100%"></v-img>
        </v-avatar>
      </template>
      <v-list>
        <v-list-item class="py-3 mx-2">
          <v-list-item-title>
            <v-row class="ma-0 pa-0">
              <v-avatar color="teal" class="ma-0 pa-0"></v-avatar>

              <div class="ml-4">
                <p class="ma-0 text-subtitle-1">Berat Eke</p>
                <p class="ma-0 text-caption">Admin</p>
              </div>
            </v-row>
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <div class="grey lighten-4 pa-2">
          <v-list-item link>
            <v-icon>mdi-account</v-icon>
            <span class="ml-5 my-auto">Profilim</span>
          </v-list-item>
          <v-list-item link>
            <v-icon>mdi-history</v-icon>
            <span class="ml-5 my-auto">Loglar</span>
          </v-list-item>
          <v-list-item link>
            <v-badge content="6" right>
              <v-icon>mdi-email-outline</v-icon>
            </v-badge>
            <span class="ml-5 my-auto">Mesajlar</span>
          </v-list-item>
          <v-list-item link>
            <v-badge content="6" right>
              <v-icon>mdi-bell-outline</v-icon>
            </v-badge>
            <span class="ml-5 my-auto">Bildirimler</span>
          </v-list-item>
          <v-row class="mt-1 mb-2">
            <div class="mx-auto">
              <v-btn icon>
                <v-icon>mdi-theme-light-dark</v-icon>
              </v-btn>
            </div>
          </v-row>
        </div>

        <v-divider class="pb-2"></v-divider>

        <v-list-item>
          <v-btn class="mx-auto" outlined color="warning">Çıkış Yap</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>