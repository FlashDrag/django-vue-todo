<template>
    <div>
      <h2>Tasks</h2>
      <ul v-if="tasks.length > 0">
        <li v-for="task in tasks" :key="task.id">{{ task.title }}</li>
      </ul>
      <p v-else>No tasks available.</p>
    </div>
  </template>

<script>
import axios from 'axios';
    export default {
        data() {
            return {
                // tasks
                tasks: ['']
            }
        },
        methods: {
            async getData() {
                try {
                    // fetch tasks
                    const response = await axios.get('http://localhost:8000/api/todos');
                    // set the data returned as tasks
                    console.log(response.data);
                    this.tasks = response.data;
                } catch (error) {
                    // log the error
                    console.log(error.response.data);
                }
            },
        },
        created() {
            // Fetch tasks on page load
            this.getData();
        }
    }
</script>