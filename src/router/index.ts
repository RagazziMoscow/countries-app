import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { NavigationGuardNext, Route } from "vue-router/types/router";

import store from "@/store";
import HomeView from "@/views/HomeView.vue";
import Analytics from "@/views/Analytics.vue";
import Register from "@/views/Register.vue";
import Profile from "@/views/Profile.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/analytics",
    name: "analytics",
    component: Analytics
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/register",
    name: "register",
    component: Register
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
  const isRegisterRoute = to.name === "register";
  const isLoggedIn = store.state.isLoggedIn;

  if (!isRegisterRoute && !isLoggedIn) {
    next({ name: "register" });
  } else {
    next();
  }
});

export default router;
