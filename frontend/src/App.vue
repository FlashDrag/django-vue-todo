<template>
  <div id="app">
    <h1>Task Manager</h1>

    <!-- Toogle between login and register forms -->
    <div>
      {{ currentForm === "login"
        ? "If you don't have an account yet, please "
        : "If you already have an account, please " }}
      <a @click="toggleForm" href="#" class="toggle">
        {{ currentForm === "login" ? "Register" : "Login" }}
      </a>
    </div>

    <!-- Show login or register form -->
    <UserLogin v-if="currentForm === 'login'" />
    <UserRegistration v-else />

  </div>
</template>

<script>
import UserLogin from "./components/UserLogin.vue";
import UserRegistration from "./components/UserRegistration.vue";
export default {
  name: "App",
  components: {
    UserLogin,
    UserRegistration,
  },

  data() {
    return {
      currentForm: "login",
    };
  },
  methods: {
    toggleForm() {
      this.currentForm = this.currentForm === "login" ? "register" : "login";
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #994219;
  margin-top: 60px;
}
</style>
