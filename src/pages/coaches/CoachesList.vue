<template>
  <div>
    <base-modal
      :show="!!hasError"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ hasError }}</p>
    </base-modal>
    <coach-filter @change-filter="setFilters"></coach-filter>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="!isCoach && !isLoadingData" link to="/register"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoadingData" class="loaderContainer">
          <loader :isLoading="isLoadingData" :color="dotColor"></loader>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          ></coach-item>
        </ul>
        <h3 v-else>No Coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      isLoadingData: false,
      hasError: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    dotColor() {
      return "#3d008d";
    },
    filteredCoaches() {
      // Since we are namespacing our coaches state in coaches/index.js,
      // we must use the registered namespace name which is coaches coming from,
      // store/index.js where we setup the modules. The second coaches below is the method name,
      // defined in getters.js

      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoadingData && this.$store.getters["coaches/hasCoaches"];
    },
    isCoach() {
      return this.$store.getters["coaches/isCoachPresent"];
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refreshVal = false) {
      this.isLoadingData = true;
      // Since dispatch returns a promise
      // we can wait for the promise to complete and then set isLoadingData to false
      try {
        await this.$store.dispatch("coaches/loadAllCoachesAction", {
          forceRefresh: refreshVal,
        });
      } catch (error) {
        this.hasError = error.message || "Ooops! Something went wrong.";
      }
      this.isLoadingData = false;
    },
    handleError() {
      this.hasError = null;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
.loaderContainer {
  display: flex;
  justify-content: center;
  margin: 2rem auto;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>