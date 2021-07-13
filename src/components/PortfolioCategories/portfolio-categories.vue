<template>
  <v-row class="mt-5 mx-1" >
    <a
      @click="$emit('update:currentIndex', key)"
      v-for="(item, key) in categories"
      :class="
        currentIndex == key
          ? 'text-caption mr-5'
          : 'text-caption mr-5 black--text'
      "
      :key="key"
      >{{ item.name }}</a
    >
  </v-row>
</template>
<script>
export default{
  props:["isLoading", "categories", "currentIndex"]
}
</script>
