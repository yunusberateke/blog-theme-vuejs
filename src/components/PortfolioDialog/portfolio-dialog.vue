<template>
  <v-dialog
    v-if="dialogModel"
    v-model="dialogModel"
    fullscreen
    hide-overlay
    persistent
    transition="dialog-bottom-transition"
  >
    <v-card class="row">
      <div class="col-12 row ma-0 pa-10">
        <v-spacer></v-spacer>
        <v-btn icon outlined v-if="admin" class="mr-2" @click="$router.push(`/iamboss46/portfolio-edit/${id}`)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon outlined class="mx-auto" @click="$emit('changeDialogModel')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="col-12 col-md-6 mx-auto">
        <v-img
          class="mx-auto"
          :src="image"
          height="400"
        ></v-img>
      </div>
      <div class="col-12 col-md-8 mx-auto" >
        <h1 class="text-center black--text my-10">{{ title }}</h1>
        <div v-html="description"></div>
        <div class="row">
          <v-btn class="primary black--text mx-auto mt-5 mb-15" rounded
            >Github Linki</v-btn
          >
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialogModel: {
      type:Boolean,
      default: true
    },
    image: {
      type:String,
    },
    title: {
      type:String,
    },
    description: {
      type:String,
    },
    id: {
      type: Number
    },
    admin: {
      type:Boolean,
      default:false
    }

  },

  watch: {
    dialogModel(){
      this.$emit("changeDialogModel");
    }
  }
}
</script>

<style>

</style>
