import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      lastFetched: null,
      coaches: [
        {
          id: "c1",
          firstName: "Mufaddal",
          lastName: "Barwaniwala",
          areas: ["frontend", "backend", "career"],
          description:
            'I"m Mufaddal. I"ve worked as a freelance web developer for years.',
          hourlyRate: 30,
        },
        {
          id: "c2",
          firstName: "Max",
          lastName: "Gill",
          areas: ["frontend", "career"],
          description:
            'I"m Max. I"ve worked as a senior developer in a big tech company.',
          hourlyRate: 25,
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};
