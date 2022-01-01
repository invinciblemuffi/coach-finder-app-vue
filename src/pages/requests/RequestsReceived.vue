<template>
  <div>
    <base-modal
      :show="!!hasError"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ hasError }}</p>
    </base-modal>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <div v-if="isLoding" class="loaderContainer">
          <loader v-if="isLoading" :size="'100'" :color="dotColor"></loader>
        </div>
        <ul v-else-if="hasRequests && !isLoading">
          <request-item
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
          ></request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from "../../components/requests/RequestItem.vue";

export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      isLoading: true,
      hasError: null,
    };
  },
  computed: {
    dotColor() {
      return "#3d008d";
    },
    receivedRequests() {
      return this.$store.getters["requests/allRequests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/loadAllMessagesAction");
      } catch (error) {
        this.hasError = error.message || "Dispatch failed to get data";
      }
      this.isLoading = false;
    },
    handleError() {
      this.hasError = null;
    },
  },
  created() {
    this.loadRequests();
  },
};
</script>

<style scoped>
.loaderContainer {
  display: flex;
  justify-content: center;
  margin: 2rem auto;
}

header,
h3 {
  text-align: center;
}

ul {
  list-style-type: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}
</style>