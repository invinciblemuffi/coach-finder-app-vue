<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 2rem auto;
  padding: 1rem;
  max-width: 40rem;
}
</style>