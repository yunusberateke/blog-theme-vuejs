<template>
  <v-row class="col-12 ma-0 pa-0">
    <v-chip class="mx-1 my-1" v-for="item in tags" :key="item.id">
      {{item.name}}
    </v-chip>

  </v-row>
</template>

<script>
export default {
  props:["tags"]
}
</script>

<style>

</style>
