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
  shouldUpdate(state) {
    const lastFetched = state.lastFetched;
    if (!lastFetched) {
      return true;
    }
    const currentTimestamp = new Date().getTime();
    // Below line means the last fetched time and current time difference is more than a minute
    // If it's more than a minute than fetch data from server again.
    return (currentTimestamp - lastFetched) / 1000 > 60;
  },
};
