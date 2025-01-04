import { createApp, h, provide } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'
// import { store, key } from './store/index'
import mitt from 'mitt'
// @ts-ignore
import VueApolloComponents from '@vue/apollo-components'
import { Quasar, Notify } from 'quasar'
// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'
import { apolloProvider } from './apollo'
import { apolloClient } from './apollo'
import { DefaultApolloClient } from '@vue/apollo-composable'
import {pinia} from "@/store";
import './native.extension';
import './style.css';
import * as Sentry from "@sentry/vue";

const emitter = mitt();

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
})

app.config.globalProperties.$emitter = emitter;
app.provide('$emitter', emitter);

Sentry.init({
  app,
  dsn: "https://a467c072f1bbfd87e6a1140909dc2707@o4507289629163520.ingest.de.sentry.io/4507289631195216",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/terrainsympa\.fr/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

app.use(pinia).use(router).use(Quasar, {
  plugins: {
    Notify
  },
  config: {
    notify: { }
  },
}).use(i18n).mount('#app')

// TODO: use apollo with use but it doesn't work for now: https://v4.apollo.vuejs.org/guide-components/setup.html#_4-add-the-provider-to-your-app

// const app = createApp(App);

//const app = createApp({
// render: () => h(App),
//})
//app.use(store, key).use(router).use(vuetify).use(i18n).use(apolloProvider).use(VueApolloComponents).mount("#app");
