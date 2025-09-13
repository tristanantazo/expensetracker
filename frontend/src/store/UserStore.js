import { defineStore } from 'pinia'
import axios from 'axios'
import { HandCoins, Utensils, CircleQuestionMark, TreePalm, MessageSquareHeart } from 'lucide-vue-next';

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useUserStore = defineStore('user', {

    state: () => ({
        first_name: '',
        last_name: '',
        account: [],
        category: [],
        loader: false
    }),
    getters: {

    },
    actions: {
        async getUserSetting() {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + '/user')
                this.first_name = response.data.data.first_name;
                this.last_name = response.data.data.last_name;
                this.account = response.data.data.account;
                this.category = response.data.data.category;
            } catch (error) {
                console.log(error)
                this.api_error = error
            }
        },
        async saveUser(params) {
            try {
                this.loader = true
                const response = await axios.post(import.meta.env.VITE_API_URL + '/user', params)
                this.user = response.data.data
            } catch (error) {
                console.log(error)
                this.api_error = error
            } finally {
                this.loader = false;
            }
        },
    }
});