<template>
  <div class="px-10 py-10">
    <v-dialog
      v-if="dialogModel"
      v-model="dialogModel"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <dialog-content
        :image="dialogItem.image"
        :title="dialogItem.title"
        :description="dialogItem.description"
        :github="dialogItem.github"
      >
        <slot>
          <v-btn icon outlined class="mx-auto" @click="dialogModel = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </slot>
      </dialog-content>
    </v-dialog>
    <h3>Portfolyo </h3>
    <v-row style="height:40vh" v-if="isLoading">
      <v-progress-circular
        indeterminate
        color="primary"
        class="mx-auto my-auto"
      ></v-progress-circular>
    </v-row>
    <v-row class="mt-5 mx-1" v-if="!isLoading">
      <a
        @click="currentIndex = key"
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
    <v-row v-if="!isLoading">
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
        @click="moreItems"
        >Daha Fazla Göster</v-btn
      >
    </v-row>
  </div>
</template>

<script>
import DialogContent from "@/components/DialogContent/dialog-content.vue"
//class="text-no-wrap primary" style="height:0.8rem; width:5rem; "
export default {
  components: {
    DialogContent
  },
  computed:{
    items(){
      return this.$store.state.PortfolioModule.portfolios
    },
    categories(){
      return [{name:"Hepsi"}].concat(this.$store.state.PortfolioCategoryModule.portfolio_category);
    }
  },
  methods: {
    changeDialog(item) {
      this.dialogItem = item;
      this.dialogModel = true;
    },

    getData() {
      this.isLoading = true;
      Promise.all([
        this.$store.dispatch("PortfolioModule/findAll", {page:this.page}),
        this.$store.dispatch("PortfolioCategoryModule/findAll")
      ]).then(() => {
        setTimeout(() => {
          this.showItems = this.items;
          this.isLoading = false;
          this.hideShowMoreButton = this.page < Math.ceil(this.count/6);
        }, 1000);
      })
    },

    moreItems() {
      this.isLoadingShowMore = true;
      this.page = this.page + 1;

      if (this.currentIndex == 0) {
        this.$store.dispatch("PortfolioModule/findAll", {page:this.page}).then(() => {
          setTimeout(() => {
            this.isLoadingShowMore = false;
            this.showItems = this.showItems.concat(this.items);
            this.hideShowMoreButton = this.page < Math.ceil(this.count/6);
          }, 1000);
        })
      } else {
        const categoryId = this.categories[this.currentIndex].id;
        this.$store.dispatch("PortfolioModule/findByCategoryId", {categoryId:categoryId, page:this.page}).then((data)=>{
          setTimeout(function(){
            this.isLoadingShowMore = false;
            this.showItems = this.showItems.concat(data);
            this.hideShowMoreButton = this.page < Math.ceil(this.count/6);
          }.bind(this), 500)
        })
      }
    },
  },
  mounted() {
    this.page=1;
    this.$store.dispatch("PortfolioModule/count").then((e)=>{
      this.count = e;
    });
    this.getData();
  },
  data() {
    return {
      count: null,
      isLoading: false,
      isLoadingShowMore:false,
      hideShowMoreButton:false,
      currentIndex: 0,
      showItems: [],
      searchItems: [],
      dialogModel: false,
      dialogItem: null,
      page:1,
    };
  },
  watch: {
    currentIndex(e) {
      this.page=1;
      if (e == 0) {
        this.$store.dispatch("PortfolioModule/count").then((e)=>{
          this.count = e;
        });
        this.getData();
      } else {
        this.isLoading = true;
        const categoryId = this.categories[e].id;
        this.$store.dispatch("PortfolioModule/countByCategoryId", {categoryId:categoryId}).then((e)=>{
          this.count = e;
        });
        this.$store.dispatch("PortfolioModule/findByCategoryId", {categoryId:categoryId, page:this.page}).then((data)=>{
          this.showItems = data;
          setTimeout(function(){
            this.isLoading=false;
            this.hideShowMoreButton = this.page < Math.ceil(this.count/6);
          }.bind(this), 500)
        })
      }
    },
  },
};
</script>

<style>
</style>
