<template>
  <div class="px-10 py-10">
    <contact-error-success-message
      :fail="fail"
      :success="success"
    >
    </contact-error-success-message>
    <v-row>
      <div class="col-12 col-lg-6">
        <contact-form
          :success.sync = "success"
          :fail.sync = "fail"
        >
        </contact-form>
      </div>
      <div class="col-12 col-lg-6 pa-0 ma-0">
        <contact-my-about></contact-my-about>
      </div>
    </v-row>
  </div>
</template>

<script>
import ContactErrorSuccessMessage from "@/components/ContactErrorSuccessMessage/contact-error-success-message"
import ContactMyAbout from "@/components/ContactMyAbout/contact-my-about"
import ContactForm from "@/components/ContactForm/contact-form"

export default {
  components: {
    ContactErrorSuccessMessage, ContactMyAbout, ContactForm
  },
  data(){
    return {
      success: false,
      fail: false,
    }
  }
};
</script>
