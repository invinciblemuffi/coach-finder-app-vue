export default {
  async loginAction(context, payload) {
    return context.dispatch("auth", { ...payload, mode: "login" });
  },

  async signUpAction(context, payload) {
    return context.dispatch("auth", { ...payload, mode: "signup" });
  },

  async auth(context, payload) {
    const mode = payload.mode;
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}`;
    if (mode === "signup") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_API_KEY}`;
    }
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const respData = await resp.json();
    console.dir(respData);

    if (!resp.ok) {
      //   console.log(resp);
      throw new Error(respData.error.message || "Something went wrong!");
    }

    localStorage.setItem("token", respData.idToken);
    localStorage.setItem("userId", respData.localId);

    context.commit("setUser", {
      token: respData.idToken,
      userId: respData.localId,
      tokenExpiration: respData.expiresIn,
    });
  },

  autoLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      context.commit("setUser", { token, userId, tokenExpiration: null });
    }
  },

  logoutAction(context) {
    context.commit("setUser", {
      userId: null,
      token: null,
      tokenExpiration: null,
    });
  },
};
