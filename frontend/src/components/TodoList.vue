<template>
  <div>
    <form @submit.prevent="createTask">
      <label for="title">Title:</label>
      <input type="text" v-model="title" required />
      <br />
      <label for="description">Description:</label>
      <input type="text" v-model="description" required />
      <br />
      <button type="submit">Submit</button>
    </form>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <h2>{{ task.title }}</h2>
        <p>{{ task.description }}</p>
        <button @click="deleteTask(task)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config";

export default {
  data() {
    return {
      tasks: [],
      title: "",
      description: "",
    };
  },
  mounted() {
    this.getTodoList();
  },
  methods: {
    async getTodoList() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${config.backendUrl}/api/todos/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        this.tasks = response.data;
      } catch (error) {
        console.error("Error fetching todo list", error);
      }
    },
    async createTask() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          `${config.backendUrl}/api/todos/`,
          {
            title: this.title,
            description: this.description,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        this.tasks.push(response.data);
        this.title = "";
        this.description = "";
      } catch (error) {
        console.error("Error creating task", error);
      }
    },
    async deleteTask(task) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`${config.backendUrl}/api/todos/${task.id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      } catch (error) {
        console.error("Error deleting task", error);
      }
    },
  },
};
</script>
