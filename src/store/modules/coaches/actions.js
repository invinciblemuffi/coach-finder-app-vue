export default {
  registerCoachAction(context, data) {
    const newCoachData = {
      id: context.rootGetters.userId,
      firstName: data.fName,
      lastName: data.lName,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    context.commit("registerCoachMutation", newCoachData);
  },
};
