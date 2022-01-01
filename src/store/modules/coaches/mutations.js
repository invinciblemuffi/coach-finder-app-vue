export default {
  registerCoachMutation(state, payload) {
    state.coaches.unshift(payload);
  },

  getAllCoachesMutation(state, payload) {
    state.coaches = payload;
  },
};
