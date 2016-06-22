import Vue from 'vue'
import Router from 'vue-router'
import {
    filterGender,
    changeName,
    prettyBytes,
    changeRadioOptions,
    changeSelectOptions,
    changeCheckboxOptions,
    changeArray,
    formatMIME,
    changeOrderInfo
} from './filter'
import App from './components/App.vue'
import Home from './components/Home.vue'
import Event from './components/Event.vue'
import Protocol from './components/Protocol.vue'
import Register from './components/Register.vue'
import Reglist from './components/Reglist.vue'
import Checkinfo from './components/Checkinfo.vue'
import Order from './components/Order.vue'
import Ordersuccess from './components/Ordersuccess.vue'
import Orderfail from './components/Orderfail.vue'
import Paid from './components/Paid.vue'
import Checkdetail from './components/Checkdetail.vue'
import Orderinfo from './components/Orderinfo.vue'


Vue.use(Router)
const router = new Router()

Vue.filter('filterGender', filterGender)
Vue.filter('changeName', changeName)
Vue.filter('prettyBytes', prettyBytes)
Vue.filter('changeRadioOptions', changeRadioOptions)
Vue.filter('changeSelectOptions', changeSelectOptions)
Vue.filter('changeCheckboxOptions', changeCheckboxOptions)
Vue.filter('changeArray', changeArray )
Vue.filter('formatMIME', formatMIME )
Vue.filter('changeOrderInfo', changeOrderInfo )

router.map({
    '/': {
        component: Home
    },
    '/event': {
        component: Event
    },
    '/protocol/:id': {
        component: Protocol
    },
    '/register/:id': {
        component: Register
    },
    '/reglist/:id': {
        component: Reglist
    },
    '/checkinfo': {
        component: Checkinfo
    },
    '/order': {
        component: Order
    },
    '/ordersuccess': {
        component: Ordersuccess
    },
    '/orderfail': {
        component: Orderfail
    },
    '/paid': {
        component: Paid
    },
    '/checkdetail': {
        component: Checkdetail
    },
    '/orderinfo': {
        component: Orderinfo
    }
})

router.redirect({
    '*': '/'
})

//切换动画
router.beforeEach(function (transition) {
    transition.next();
});

//路由的路口
router.start(App, '#app')
