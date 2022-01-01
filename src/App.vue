<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="routeTransition" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.routeTransition-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.routeTransition-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.routeTransition-enter-active {
  transition: all 0.3s ease-out;
}

.routeTransition-leave-active {
  transition: all 0.3s ease-in;
}

.routeTransition-enter-to,
.routeTransition-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
