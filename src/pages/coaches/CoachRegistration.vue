<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="getFormData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm.vue";

export default {
  components: {
    CoachForm,
  },
  methods: {
    getFormData(newCoachData) {
      this.$store.dispatch("coaches/registerCoachAction", newCoachData);
      this.$router.replace("/coaches");
    },
  },
};
</script>