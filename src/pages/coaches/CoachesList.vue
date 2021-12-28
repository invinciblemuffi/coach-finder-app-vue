<template>
  <section>FILTER</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as Coach</router-link>
    </div>
    <ul v-if="hasCoaches">
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
  </section>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
export default {
  components: {
    CoachItem,
  },
  computed: {
    filteredCoaches() {
      // Since we are namespacing our coaches state in coaches/index.js,
      // we must use the registered namespace name which is coaches coming from,
      // store/index.js where we setup the modules. The second coaches below is the method name,
      // defined in getters.js
      return this.$store.getters["coaches/coaches"];
    },
    hasCoaches() {
      return this.$store.getters["coaches/hasCoaches"];
    },
  },
};
</script>

<style scoped>
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