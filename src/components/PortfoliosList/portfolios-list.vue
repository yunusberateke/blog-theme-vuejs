<template>
  <v-row class="col-12">
    <div
      class="col-12 col-lg-4 col-md-6"
      v-for="(item, key) in showItems"
      :key="key"
    >
      <v-hover v-slot="{ hover }">
        <a @click="changeDialog(item)">
          <v-card class="rounded-lg elevation-2">
            <v-img
              :src="item.image"
              height="170"
              class="pa-0 ma-0 rounded-lg"
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="pa-0 ma-0 d-flex transition-fast-in-fast-out v-card--reveal display-3 white--text"
                  style="height: 100%; width: 100%"
                >
                  <v-avatar class="mx-auto my-auto" color="primary">
                    <v-icon> mdi-file-document </v-icon>
                  </v-avatar>
                </div>
              </v-expand-transition>
            </v-img>
            <v-card-text class="mt-2">
              <h4>{{ item.title }}</h4>
              <p class="text-caption">
                Lorem ipsum dolor sit amet consectetur adipisicing
              </p>
            </v-card-text>
          </v-card>
        </a>
      </v-hover>
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
  props: ["showItems", "hideShowMoreButton", "isLoadingShowMore", "dialogModel", "dialogItem"],
  methods: {
    changeDialog(item) {
      this.$emit('update:dialogModel', true);
      this.$emit('update:dialogItem', item);

    },
  }
}
</script>
