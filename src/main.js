import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "./filters/date-filter";
import currencyFilter from './filters/currency-filter';
import tooltipDirective from './directives/tooltip.directives';
import messagePlugin from "./utils/message.plugin";
import Loader from './components/app/Loader';
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import firebase from "../../node_modules/firebase/app";
import "../../node_modules/firebase/auth";
import "../../node_modules/firebase/database";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);

firebase.initializeApp({
    apiKey: "AIzaSyCS13msqIhWYb5yjj1Bh8-tLzo-Cy3VMpg",
    authDomain: "vue-crm-d352f.firebaseapp.com",
    databaseURL: "https://vue-crm-d352f.firebaseio.com",
    projectId: "vue-crm-d352f",
    storageBucket: "vue-crm-d352f.appspot.com",
    messagingSenderId: "448182710647",
});

let app;

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: (h) => h(App),
        }).$mount("#app");
    }
});