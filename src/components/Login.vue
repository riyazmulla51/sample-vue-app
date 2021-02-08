<template>
  <v-row class="login__bgImages" justify="center" align="center">
    <v-flex xs8 sm6 md4 lg3 xl3>
      <v-row justify="center" align="center">
        <v-avatar size="150">
          <img src="@/assets/businessman-profile.jpg" />
        </v-avatar>
      </v-row>
      <br />
      <v-card flat class="pa-4 mt-4" color="#E8EAF6" elevation="4">
        <v-card-text class="pa-0 pt-6">
          <v-form>
            <!-- Username Field -->
            <v-text-field
              v-model="username"
              label="Username"
              name="username"
              data-qa="userID"
              :rules="loginRules"
              :error="errorLogin"
              prepend-inner-icon="mdi-account-outline"
              type="text"
              counter
              maxlength="10"
              minlength="6"
              @input="checkCredentials"
              @keyup.enter="username.length > 0 ? login() : false"
            />
            <!-- Password Field -->
            <v-text-field
              v-model="userPassword"
              label="Password"
              name="userPassword"
              data-qa="password"
              :rules="loginRules"
              :error="errorLogin"
              :error-messages="errorMessage"
              prepend-inner-icon="mdi-lock-outline"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (showPassword = !showPassword)"
              :type="showPassword ? 'text' : 'password'"
              counter
              maxlength="12"
              minlength="6"
              @input="checkCredentials"
              @keyup.enter="userPassword.length > 0 ? login() : false"
            />
          </v-form>
        </v-card-text>
        <!-- Login Button -->
        <v-btn
          block
          id="loginButton"
          aria-label="loginButton"
          class="home__login-btn primary mt-5 text-capitalize"
          rounded
          depressed
          large
          v-bind:disabled="loginBtnDisable"
          @click="login"
        >
          <v-icon left small class="px-2">mdi-arrow-right</v-icon>
          Login
        </v-btn>
      </v-card>
    </v-flex>
  </v-row>
</template>

<script>
import "@/styles/login.scss";

export default {
  name: "login",
  data() {
    return {
      username: "",
      userPassword: "",
      loginBtnDisable: true,
      loginRules: [(v) => Boolean(v)],
      errorLogin: false,
      errorMessage: undefined,
      showPassword: false,
    };
  },
  methods: {
    login() {
      if (this.username === "Riyaz" && this.userPassword === "Password123$") {
        this.$router.push("/home");
      } else {
        this.errorLogin = true;
        this.errorMessage = "Invalid username or password";
      }
    },
    checkCredentials() {
      if (this.username && this.userPassword) {
        this.loginBtnDisable = false;
      } else {
        this.loginBtnDisable = true;
      }
    },
  },
};
</script>
