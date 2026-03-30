import { createApp } from "vue";
import "./assets/styles/main.css";

import App from "./App.vue";
import router from "./router/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./infra/firebase";

let app: any;
// build app only after firebase auth loads
onAuthStateChanged(auth, () => {
  if (app) return;
  app = createApp(App);
  app.use(router);
  app.mount("#app");
});
