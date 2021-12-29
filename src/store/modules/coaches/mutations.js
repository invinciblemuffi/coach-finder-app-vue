export default {
  registerCoachMutation(state, payload) {
    state.coaches.unshift(payload);
  },
};
