export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  // First _ is for state and second underscore is for rootState
  isCoachPresent(_, getters, _1, rootGetters) {
    const coaches = getters.coaches;
    const uId = rootGetters.userId;
    return coaches.some((coach) => coach.id === uId);
  },
};
