export default {
  async registerCoachAction(context, data) {
    const userId = context.rootGetters.userId;
    const newCoachData = {
      firstName: data.fName,
      lastName: data.lName,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const token = context.rootGetters.getToken;

    const resp = await fetch(
      `https://coach-finder-de40b-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify(newCoachData),
      }
    );

    const respData = await resp.json();
    console.dir(respData);

    if (!resp.ok) {
      throw new Error(respData.error.message || "Oops, An error occured!");
    }

    context.commit("registerCoachMutation", { ...newCoachData, id: userId });
  },

  async loadAllCoachesAction(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const resp = await fetch(
      `https://coach-finder-de40b-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`
    );

    const respData = await resp.json();
    console.dir(respData);

    if (!resp.ok) {
      throw new Error(respData.error.message || "Failed to fetch data!");
    }

    const coaches = [];
    for (let key in respData) {
      const coach = {
        id: key,
        firstName: respData[key].firstName,
        lastName: respData[key].lastName,
        description: respData[key].description,
        hourlyRate: respData[key].hourlyRate,
        areas: respData[key].areas,
      };
      coaches.push(coach);
    }

    context.commit("getAllCoachesMutation", coaches);
    context.commit("getLastFetchedTimestamp");
  },
};
