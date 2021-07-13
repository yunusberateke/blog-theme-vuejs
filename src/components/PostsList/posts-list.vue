<template>
  <v-row class="col-12">
    <div
     class="col-12 col-lg-4 col-md-6"
      v-for="(item, key) in showItems"
      :key="key"
    >
      <a @click="$router.push(`/blog/${item.id}`)">
        <v-card class="rounded-lg elevation-2">
          <v-img
            :src="item.image"
            height="170"
            class="pa-0 ma-0 rounded-lg"
          ></v-img>
          <v-row class="col-12 pa-0 ma-0 px-2">
            <v-icon small left>mdi-message-outline</v-icon><span class="text-caption">37</span>
            <v-icon small left class="ml-2">mdi-heart-outline</v-icon><span class="text-caption">42</span>
            <v-spacer></v-spacer>
            <p class="text-caption pa-0 ma-0 text-right">{{new Date(item.created_at).toLocaleString("tr-TR").slice(0, 10)}}</p>
          </v-row>
          <v-card-text>
            <h4>{{ item.title }}</h4>
          </v-card-text>
        </v-card>
      </a>
    </div>
    <div class="col-12"></div>

    <v-btn
      v-if="hideShowMoreButton"
      class="primary black--text mx-auto mt-5 mb-15"
      :loading="isLoadingShowMore"
      rounded
      @click="$emit('clickMoreItems')"
      >Daha Fazla Göster</v-btn
    >
  </v-row>
</template>
<script>
export default{
  props: ["showItems", "hideShowMoreButton", "isLoadingShowMore",],
}
</script>
