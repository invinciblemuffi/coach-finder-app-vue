export default {
  allRequests(state, _, _1, rootGetters) {
    const coachId = rootGetters.userId;
    return state.requests.filter((coach) => coach.coachId === coachId);
  },
  hasRequests(_, getters) {
    return getters.allRequests && getters.allRequests.length > 0;
  },
};
