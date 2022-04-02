import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue, {
    BIconAlarm,
    BIconLockFill
} from 'bootstrap-vue/dist/bootstrap-vue.esm'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

import {
    VBHoverPlugin,
    VBPopoverPlugin,
    NavbarPlugin,
    AspectPlugin,
    ModalPlugin,
    NavPlugin,
    BIcon,
    VBTogglePlugin,
    CardPlugin,
    SpinnerPlugin,
    IconsPlugin,
    TabsPlugin,
    CarouselPlugin,
    CalendarPlugin
} from 'bootstrap-vue'
import loader from 'vue-ui-preloader'
import VueTelInput from 'vue-tel-input'
import Axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import '@/assets/main.css'
import JsonCSV from 'vue-json-csv'

Vue.component('downloadCsv', JsonCSV)
Vue.use(CarouselPlugin)
Vue.use(TabsPlugin)
Vue.use(VueSweetalert2)
Vue.prototype.$http = Axios
Vue.use(loader)
Vue.use(VueTelInput)
Vue.use(SpinnerPlugin)
Vue.use(CardPlugin)
Vue.use(VBTogglePlugin)
Vue.use(BootstrapVue)
Vue.use(ModalPlugin)
Vue.use(AspectPlugin)
Vue.use(NavbarPlugin)
Vue.use(VBPopoverPlugin)
Vue.use(VBHoverPlugin)
Vue.use(NavPlugin)
Vue.use(IconsPlugin)
Vue.use(CalendarPlugin)
    //Vue.component('b-icon', BIconChevronBarDown, BIconChevronBarUp, BIcon)
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
    mounted() {
        AOS.init({
            // Global settings:
            disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
            startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
            initClassName: 'aos-init', // class applied after initialization
            animatedClassName: 'aos-animate', // class applied on animation
            useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
            disableMutationObserver: false, // disables automatic mutations' detections (advanced)
            debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
            throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

            // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
            offset: 120, // offset (in px) from the original trigger point
            delay: 0, // values from 0 to 3000, with step 50ms
            duration: 400, // values from 0 to 3000, with step 50ms
            easing: 'ease', // default easing for AOS animations
            once: false, // whether animation should happen only once - while scrolling down
            mirror: false, // whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom' // defines which position of the element regarding to window should trigger the animation
        })
    }
}).$mount('#app')