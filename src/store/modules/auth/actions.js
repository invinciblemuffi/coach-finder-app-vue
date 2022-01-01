export default {
  login() {},

  async signUpAction(context, payload) {
    const resp = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const respData = await resp.json();
    console.dir(respData);

    if (!resp.ok) {
      //   console.log(resp);
      throw new Error(
        respData.error.message || "Something went wrong while signing up!"
      );
    }

    context.commit("setUser", {
      token: respData.idToken,
      userId: respData.localId,
      tokenExpiration: respData.expiresIn,
    });
  },
};
