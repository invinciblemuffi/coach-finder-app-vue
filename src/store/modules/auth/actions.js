let timer;

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

    // Using a plus in front to convert the string into a number
    // multiplying 3600 secs to 1000 to convert to milliseconds
    const expiresIn = +respData.expiresIn * 1000;
    // const expiresIn = 5000;
    // Current time + 3600secs coming from server set as expiration date.
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("token", respData.idToken);
    localStorage.setItem("userId", respData.localId);
    localStorage.setItem("tokenExpiration", expirationDate);

    // set a timer running from the time this function is called
    timer = setTimeout(() => context.dispatch("autoLogout"), expiresIn);

    context.commit("setUser", {
      token: respData.idToken,
      userId: respData.localId,
    });
  },

  autoLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    // If expiresIn value is still not reached 0 then the user can still be in logged in mode
    // Therefore we can set the timer again here to keep track
    // of the time remaining until automatically logging out

    timer = setTimeout(() => context.dispatch("autoLogout"), expiresIn);

    if (token && userId) {
      context.commit("setUser", { token, userId });
    }
  },

  logoutAction(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);

    context.commit("setUser", {
      userId: null,
      token: null,
    });
  },

  autoLogout(context) {
    context.dispatch("logoutAction");
    context.commit("setAutoLogout");
  },
};
