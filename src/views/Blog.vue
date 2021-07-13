<template>
  <div class="px-10 py-10">
      <h3 >Blog Yazılarım</h3>
      <v-row style="height:40vh" v-if="isLoading">
        <v-progress-circular
          indeterminate
          color="primary"
          class="mx-auto my-auto"
        ></v-progress-circular>
      </v-row>
      <portfolio-categories
        v-if="!isLoading"
        :currentIndex.sync="currentIndex"
        :categories="categories"
      >
      </portfolio-categories>
      <v-row>
      <posts-list
        v-if="!isLoading"
        :showItems="showItems"
        :hideShowMoreButton="hideShowMoreButton"
        :isLoadingShowMore="isLoadingShowMore"
        :dialogItem.sync="dialogItem"
        :dialogModel.sync="dialogModel"
        @clickMoreItems="moreItems"
      >
      </posts-list>
    </v-row>
  </div>
</template>

<script>
import PortfolioCategories from "@/components/PortfolioCategories/portfolio-categories"
import PostsList from "@/components/PostsList/posts-list"

export default {
  components: {
    PortfolioCategories, PostsList
  },
  computed: {
    items(){
      return this.$store.state.PostModule.posts
    },
    categories(){
      return [{name:"Hepsi"}].concat(this.$store.state.PostCategoryModule.post_category);
    }
  },
  methods: {
    getData() {
      this.isLoading = true;
      Promise.all([
        this.$store.dispatch("PostModule/findAll", {page:this.page}),
        this.$store.dispatch("PostCategoryModule/findAll")
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
        this.$store.dispatch("PostModule/findAll", {page:this.page}).then(() => {
          setTimeout(() => {
            this.isLoadingShowMore = false;
            this.showItems = this.showItems.concat(this.items);
            this.hideShowMoreButton = this.page < Math.ceil(this.count/6);
          }, 1000);
        })
      } else {
        const categoryId = this.categories[this.currentIndex].id;
        this.$store.dispatch("PostModule/findByCategoryId", {categoryId:categoryId, page:this.page}).then((data)=>{
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
    this.$store.dispatch("PostModule/count").then((e)=>{
      this.count = e;
    });
    this.getData();
  },
  data(){
    return{
      count: null,
      isLoading: false,
      isLoadingShowMore:false,
      hideShowMoreButton:false,
      currentIndex: 0,
      showItems: [],
      searchItems: [],
      dialogModel: false,
      dialogItem:null,
      page:1,
    }
  },
  watch: {
    currentIndex(e) {
      this.page=1;
      if (e == 0) {
        this.$store.dispatch("PostModule/count").then((e)=>{
          this.count = e;
        });
        this.getData();
      } else {
        this.isLoading = true;
        const categoryId = this.categories[e].id;
        this.$store.dispatch("PostModule/countByCategoryId", {categoryId:categoryId}).then((e)=>{
          this.count = e;
        });
        this.$store.dispatch("PostModule/findByCategoryId", {categoryId:categoryId, page:this.page}).then((data)=>{
          this.showItems = data;
          setTimeout(function(){
            this.isLoading=false;
            this.hideShowMoreButton = this.page < Math.ceil(this.count/6);
          }.bind(this), 500)
        })
      }
    },
  }
};
</script>

<style>

</style>
