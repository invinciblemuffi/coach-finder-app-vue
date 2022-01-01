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

    const resp = await fetch(
      `https://coach-finder-de40b-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(newCoachData),
      }
    );

    const respData = await resp.json();
    console.dir(respData);

    if (!resp.ok) {
      // error
    }

    context.commit("registerCoachMutation", { ...newCoachData, id: userId });
  },

  async loadAllCoachesAction(context) {
    const resp = await fetch(
      `https://coach-finder-de40b-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`
    );

    const respData = await resp.json();
    console.dir(respData);

    if (!resp.ok) {
      // error
      const err = new Error(respData.message || "Failed to fetch data!");
      throw err;
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
  },
};
