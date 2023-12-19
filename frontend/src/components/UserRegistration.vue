<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="register">
      <label for="username">Username:</label>
      <input type="text" v-model="username" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" v-model="password" required minlength="5">
      <br>
      <label for="password2">Confirm Password:</label>
      <input type="password" v-model="password2" required minlength="5">
      <br>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      password2: "",
    };
  },
  methods: {
    register() {
      if (this.password !== this.password2) {
        alert("Passwords do not match");
        return;
      }

      this.performRegistration();
    },
    async performRegistration() {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/create/",
          {
            username: this.username,
            password: this.password,
          }
        );

        const token = response.data.token;
        localStorage.setItem("token", token);

      } catch (error) {
        console.error("Registration failed", error);
        if (error.response.data.username) {
          alert(error.response.data.username[0]);
        } else if (error.response.data.password) {
          alert(error.response.data.password[0]);
        } else if (error.response.data.non_field_errors) {
          alert(error.response.data.non_field_errors[0]);
        } else {
          alert("An error occurred");
        }
      }
    },
  },
};
</script>