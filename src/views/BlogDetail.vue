<template>
  <div class="px-10 py-10 ">
    <v-row style="height:40vh" v-if="isLoading">
      <v-progress-circular
        indeterminate
        color="primary"
        class="mx-auto my-auto"
      ></v-progress-circular>
    </v-row>
    <div class="col-12" v-if="!isLoading">
      <post-image-title-date
        :image="post.image"
        :date="post.created_at"
        :title="post.title"
      >
      </post-image-title-date>

      <post-chips
        :tags="tags">
      </post-chips>

      <v-row class="col-12" v-html="post.content">

      </v-row>


      <post-comments
        :comments="comments"
        :postId="post.id"
      >
      </post-comments>
    </div>
  </div>
</template>

<script>
import PostImageTitleDate from "@/components/PostImageTıtleDate/post-image-title-date"
import PostChips from "@/components/PostChips/post-chips"
import PostComments from "@/components/PostComments/post-comments"

export default {
  components: {
      PostImageTitleDate, PostChips, PostComments
  },

  created(){
    this.isLoading = true;
    var postId = this.$route.params.id;
    Promise.all([
      this.$store.dispatch("PostModule/findById",{"id":postId}),
      this.$store.dispatch("TagPostModule/findByPostId",{postId:postId}),
      this.$store.dispatch("CommentModule/findByPostId", {postId:postId})
    ]).then((data)=>{
      this.post = data[0];
      this.tags = data[1];
      this.comments = data[2];
      this.isLoading = false;
    }).catch(()=>{
      this.isLoading = false;
      this.$router.push("/404")
    })



  },
  data() {
    return {
      post:null,
      isLoading: false,
      tags:null,
      comments:null
    }
  }
}
</script>

<style>

</style>
