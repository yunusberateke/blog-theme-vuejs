<template>
  <div>
    <div class="col-12 my-5 ma-0 pa-0">
      <div
        class="col-12"
        v-for="item in comments.slice(0, commentsPeerPage * commentsPage)"
        :key="item.id"
      >
        <p class="text-subtitle font-weight-bold my-auto">{{ item.name }}</p>
        <span class="text-overline">{{
          new Date(item.created_at).toLocaleString("tr-TR")
        }}</span>
        <p class="text-caption">{{ item.content }}</p>
      </div>
      <div class="col-12 row" v-if="!newCommentStatus">
        <div class="mx-auto">
          <v-btn x-small icon color="primary" @click="newCommentStatus = true">
            <v-icon left>mdi-plus</v-icon>
            <span>Yorum Yap</span>
          </v-btn>
        </div>
      </div>
    </div>
    <v-row class="my-5" v-if="comments.length > commentsPage * commentsPeerPage">
      <v-btn
        class="mx-auto"
        depressed
        rounded
        small
        @click="commentsPage = commentsPage + 1"
        >Daha Fazla Göster</v-btn
      >
    </v-row>

    <div v-if="newCommentStatus" class="col-12 col-lg-9 mx-auto">
      <v-form>
        <v-text-field
          v-model="formData.name"
          type="text"
          label="İsminiz"
          outlined
          append-icon="mdi-account"
        ></v-text-field>
        <v-text-field
          v-model="formData.email"
          type="email"
          label="Mail"
          outlined
          append-icon="mdi-email"
        ></v-text-field>
        <v-textarea
          v-model="formData.content"
          outlined
          append-icon="mdi-message"
          label="Yorum"
        ></v-textarea>
        <v-btn @click="sendComment" color="primary darken-1" block class="my-2"
          >Yorum Yap</v-btn
        >
        <v-btn
          dark
          color="grey darken-2"
          block
          @click="newCommentStatus = false"
          >Vazgeç</v-btn
        >
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comments", "postId"],
  methods: {
    sendComment() {
      this.success = false;
      this.fail = false;
      this.$store
        .dispatch("CommentModule/save", this.formData)
        .then(() => {
          this.success = true;
          this.formData = {
            email: null,
            name: null,
            content: null,
            verify: false,
            postId: this.postId,
          };
        })
        .catch(() => {
          this.fail = false;
        });
    },
  },
  data() {
    return {
      newCommentStatus: false,
      valid: true,
      success: false,
      fail: false,
      commentsPage: 1,
      commentsPeerPage: 3,
      formData: {
        email: null,
        name: null,
        content: null,
        verify: false,
        postId: this.postId,
      },
    };
  },
};
</script>

<style>
</style>
