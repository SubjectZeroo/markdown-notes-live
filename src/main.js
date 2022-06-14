import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "tailwindcss/tailwind.css";

//Load JSON NOTES

// import notes from "@/seed.json";
// store.commit("setNotes", notes);


store.dispatch("checkAuth");

createApp(App)
  .use(store)
  .mount("#app");
