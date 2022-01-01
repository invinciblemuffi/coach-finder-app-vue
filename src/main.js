import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import Loader from "vue-spinner/src/BeatLoader.vue";
import store from "./store/index";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseBadge from "./components/ui/BaseBadge.vue";
import BaseModal from "./components/ui/BaseModal.vue";

const app = createApp(App);
app.use(router);
app.use(store);

app.component("loader", Loader);
app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-badge", BaseBadge);
app.component("base-modal", BaseModal);

app.mount("#app");
