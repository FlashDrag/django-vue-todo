<template>
  <div id="app">
    <button v-if="isLoggedIn" @click="logout">Logout</button>
    <h1>Todo List</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isLoggedIn: localStorage.getItem("token") ? true : false,
    };
  },
  watch: {
    // Watch for changes in the route to update the isLoggedIn property
    $route() {
      this.isLoggedIn = localStorage.getItem("token") ? true : false;
    },
  },
  methods: {
    // Simulate a logout by removing the token from localStorage
    logout() {
      localStorage.removeItem("token");
      this.isLoggedIn = false; // Update the login status
      this.$router.push("/login");
    },
  },
};
</script>
