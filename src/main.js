import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import router from "./router"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"

library.add(faMoon, faSun)
createApp(App).use(router).mount("#app")
