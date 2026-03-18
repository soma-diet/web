import { createApp } from "vue";
import "./app.css";

import App from "./App.vue";
import router from "./router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/infra/firebase";

let app: any;
onAuthStateChanged(auth, () => {
  if (app) return;
  app = createApp(App);
  app.use(router);
  app.mount("#app");
});
