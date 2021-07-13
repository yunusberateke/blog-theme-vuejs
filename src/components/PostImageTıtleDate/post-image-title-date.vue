<template>
  <div>
    <v-img :src="image" width="100%" height="400"  class="col-12 mx-auto"></v-img>
    <v-row class="col-12 container">
      <v-spacer></v-spacer>
      {{new Date(date).toLocaleString("tr-TR").slice(0, 10)}}
    </v-row>
    <h2 class="my-5">{{title}}</h2>
  </div>
</template>

<script>
export default {
  props:["image", "date", "title"]
}
</script>

<style>

</style>
