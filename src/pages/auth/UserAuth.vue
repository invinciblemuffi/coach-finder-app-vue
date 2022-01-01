<template>
  <div>
    <base-modal
      :show="!!hasError"
      title="An error occured!"
      @close="handleError"
    >
      <p>{{ hasError }}</p>
    </base-modal>
    <base-modal :show="isLoading" title="Authenticating..." fixed>
      <div class="loaderContainer">
        <loader :color="dotColor"></loader>
      </div>
    </base-modal>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail</label>
          <input type="text" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password. Password must be atleast 6
          characters long.
        </p>
        <base-button>{{ submitBtnCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeBtnCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      hasError: null,
    };
  },
  computed: {
    dotColor() {
      return "#3d008d";
    },
    submitBtnCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeBtnCaption() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;

      const authPayload = {
        email: this.email,
        password: this.password,
      };
      try {
        if (this.mode === "login") {
          await this.$store.dispatch("loginAction", authPayload);
        } else {
          await this.$store.dispatch("signUpAction", authPayload);
        }
        const redirectUrl = "/" + (this.$route.query.redirect || "coaches");
        this.$router.replace(redirectUrl);
      } catch (error) {
        this.hasError = error.message || "Failed to signup.";
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    handleError() {
      this.hasError = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  display: block;
  width: 100%;
  border: 1px solid #eee;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.form-control:last-of-type input {
  margin-bottom: 2rem;
}

input:focus {
  border-color: #3d008d;
  background: #faf6ff;
  outline: none;
}

.loaderContainer {
  display: flex;
  justify-content: center;
  margin: 2rem auto;
}
</style>