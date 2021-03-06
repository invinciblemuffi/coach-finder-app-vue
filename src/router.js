import { createRouter, createWebHistory } from "vue-router";
// import UserAuth from "./pages/auth/UserAuth.vue";
// import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
// import CoachRegistration from "./pages/coaches/CoachRegistration.vue";
import NotFound from "./pages/NotFound.vue";
// import ContactCoach from "./pages/requests/ContactCoach.vue";
// import RequestsReceived from "./pages/requests/RequestsReceived.vue";
import store from "./store/index";

const CoachRegistration = () => import("./pages/coaches/CoachRegistration.vue");
const CoachDetail = () => import("./pages/coaches/CoachDetail.vue");
const ContactCoach = () => import("./pages/requests/ContactCoach.vue");
const RequestsReceived = () => import("./pages/requests/RequestsReceived.vue");
const UserAuth = () => import("./pages/auth/UserAuth.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true,
      children: [{ path: "contact", component: ContactCoach }], // /coaches/id/contact
    },
    {
      path: "/register",
      component: CoachRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: "/requests",
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: "/login", component: UserAuth, meta: { requiresUnauth: true } },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

// Global Navigation Guards with meta info added on routes to be guarded
// `to` which route/page you are going and `from` which route/page you are coming to
router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    // Below line is equal to next(false)
    next();
  }
});

export default router;
