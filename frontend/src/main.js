// main.js
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import UserLogin from "./components/UserLogin.vue";
import TodoList from "./components/TodoList.vue";
import UserRegistration from "./components/UserRegistration.vue";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: "/", component: TodoList, meta: { requiresAuth: true } },
    { path: "/login", component: UserLogin, meta: { requiresGuest: true } },
    {
      path: "/register",
      component: UserRegistration,
      meta: { requiresGuest: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  const requiresAuth = to.meta.requiresAuth;
  const requiresGuest = to.meta.requiresGuest;

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (requiresGuest && isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

createApp(App).use(router, axios).mount("#app");
