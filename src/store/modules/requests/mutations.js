export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },

  setRequestsMutation(state, payload) {
    state.requests = payload;
  },
};
