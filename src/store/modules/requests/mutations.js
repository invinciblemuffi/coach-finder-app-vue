export default {
  addRequest(state, payload) {
    state.requests.unshift(payload);
  },
};
