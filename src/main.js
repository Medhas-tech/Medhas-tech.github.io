import { bootstrapApp } from "./app.js";
import { siteContent } from "./data/siteContent.js";

const root = document.querySelector("#app");
bootstrapApp(root, siteContent);
