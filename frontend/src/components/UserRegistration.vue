<template>
  <div class="container">
    <h2>Sign Up</h2>
    <form @submit.prevent="register" class="form-container">
      <label for="username">Username:</label>
      <input type="text" v-model="username" required />
      <br />
      <label for="password">Password:</label>
      <input type="password" v-model="password" required minlength="5" />
      <br />
      <label for="password2">Confirm Password:</label>
      <input type="password" v-model="password2" required minlength="5" />
      <br />
      <button type="submit" class="btn">Submit</button>
    </form>

    <p>Already have an account? <router-link to="/login">Sign in</router-link></p>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config";

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
        const response = await axios.post(`${config.backendUrl}/api/create/`, {
          username: this.username,
          password: this.password,
        });

        const token = response.data.token;
        localStorage.setItem("token", token);

        this.$router.push("/");
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
<style>
.container {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 20px 0;
}
.form-container {
  display: flex;
  flex-direction: column;
  max-width: 300px; /* Set your desired fixed width */
  margin-bottom: 20px;
}

.btn {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #709472;
  color: white;
  border: none;
  cursor: pointer;
}
label {
  display: block;
  text-align: left;
}
</style>