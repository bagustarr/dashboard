import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Top10View from "@/views/Top10View.vue";
import AboutView from "@/views/AboutView.vue";
import NewsView from "@/views/NewsView.vue";
import PersonalView from "@/views/PersonalView.vue";
import SearchView from "@/views/SearchView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/top10",
    name: "top10",
    component: Top10View
  },
  {
    path: "/about",
    name: "about",
    component: AboutView
  },
  {
    path: "/news",
    name: "news",
    component: NewsView
  },
  {
    path: "/personal",
    name: "personal",
    component: PersonalView
  },
  {
    path: "/search",
    name: "search",
    component: SearchView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;