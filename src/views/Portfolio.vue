<template>
  <div class="px-10 py-10">
    <portfolio-dialog
      v-if="dialogModel"
      :dialog="dialogModel"
      :image="dialogItem.image"
      :title="dialogItem.title"
      :description="dialogItem.description"
      @changeDialogModel="dialogModel = false"
    >
    </portfolio-dialog>
    <h3>Portfolyo </h3>
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
    <portfolios-list
      v-if="!isLoading"
      :showItems="showItems"
      :hideShowMoreButton="hideShowMoreButton"
      :isLoadingShowMore="isLoadingShowMore"
      :dialogItem.sync="dialogItem"
      :dialogModel.sync="dialogModel"
      @clickMoreItems="moreItems"
    >
    </portfolios-list>
  </div>
</template>

<script>
import PortfolioDialog from "@/components/PortfolioDialog/portfolio-dialog"
import PortfolioCategories from "@/components/PortfolioCategories/portfolio-categories"
import PortfoliosList from "@/components/PortfoliosList/portfolios-list"

export default {
  components: {
    PortfolioDialog, PortfolioCategories, PortfoliosList
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
      dialogItem:null,
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
