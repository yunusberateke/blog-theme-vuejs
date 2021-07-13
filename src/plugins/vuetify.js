import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import light from '@/core/containts/themes/light.js'
import dark from '@/core/containts/themes/dark.js'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: light,
            dark: dark
        },
        options: {
            themeCache: {
                get: key => localStorage.getItem(key),
                set: (key, value) => localStorage.setItem(key, value),
            },
        },
    }
});
