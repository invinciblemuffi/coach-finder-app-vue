<template>
  <section>FILTER</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as Coach</router-link>
    </div>
    <ul v-if="hasCoaches">
      <li v-for="coach in filteredCoaches" :key="coach.id">
        {{ coach.firstName }}
      </li>
    </ul>
    <h3 v-else>No Coaches found.</h3>
  </section>
</template>

<script>
export default {
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