import {createApp} from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/app.css'
import "toastify-js/src/toastify.css"
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add some free styles */
import { fab } from '@fortawesome/free-brands-svg-icons'

/* import specific icons */
import { fas  } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(fab, fas)
import router from './router'

createApp(App).component('fa', FontAwesomeIcon).use(router).mount('#app')
