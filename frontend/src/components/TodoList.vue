<template>
  <div class="container">
    <div>
      <h3>New Task</h3>
      <form @submit.prevent="createTask" class="form-container">
        <label for="title">Title:</label>
        <input type="text" v-model="title" required />
        <br />
        <label for="description">Description:</label>
        <textarea type="text" id="description" cols="30" rows="3" v-model="description"></textarea>
        <br />
        <button type="submit" class="btn">Submit</button>
      </form>
    </div>
    <div>
      <h3 class="title">List:</h3>
      <table class="task-table">
        <tr class="task-header">
          <th class="table-cell">Title</th>
          <th class="table-cell">Description</th>
          <th class="table-cell">Actions</th>
        </tr>
        <tr v-for="task in tasks" :key="task.id" class="task-row">
          <td class="table-cell">{{ task.title }}</td>
          <td class="table-cell">{{ task.description }}</td>
          <td class="table-cell">
            <button @click="deleteTask(task)" class="delete-button">Delete</button>
          </td>
        </tr>
      </table>
    </div>
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

.title {
  text-align: left;
  margin-top: 20px;
}

.task-table {
  border-collapse: collapse;
  width: 100%;
}

.task-table td, .task-table th {
  border: 1px solid #ddd;
  padding: 8px;
}

.task-table tr:nth-child(even){background-color: #f2f2f2;}

.task-table tr:hover {background-color: #ddd;}

.task-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4fbb93;
  color: white;
}

.delete-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
