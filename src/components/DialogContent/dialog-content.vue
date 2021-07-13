<template>
  <v-card class="row">
    <div class="col-12 row ma-0 pa-10">
      <v-spacer></v-spacer>
      <slot></slot>
    </div>
    <div class="col-12 col-md-6 mx-auto">
      <v-img
        class="mx-auto"
        :src="image"
        height="400"
      ></v-img>
    </div>
    <div class="col-12 col-md-8 mx-auto">
      <h1 class="text-center black--text my-10">{{ title }}</h1>
      <div v-html="description"></div>
      <div class="row">
        <v-btn class="primary black--text mx-auto mt-5 mb-15" rounded
          >Github Linki</v-btn
        >
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    image:{
      type:String,
    },
    title: {
      type: String,
    },
    description: {
      type: String
    },
    github: {
      type: String,
    }
  }
}
</script>
