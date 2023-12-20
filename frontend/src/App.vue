<template>
  <div id="app">
    <button v-if="isLoggedIn" @click="logout" class="logout-button">Logout</button>
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
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}

.logout-button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
