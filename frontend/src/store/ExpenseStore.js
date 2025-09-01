import { defineStore } from 'pinia'
import axios from 'axios'
import { HandCoins, Utensils, CircleQuestionMark, TreePalm, MessageSquareHeart } from 'lucide-vue-next';

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useExpenseStore = defineStore('expense', {
  // other options...
  state: () => (
    { 
      totalExpense: 0,
      recentTransaction: [],
      categorySelection: [
        { 'icon': HandCoins, 'value': 'Bj Allowance', 'label': "Bj Allowance"},
        { 'icon': HandCoins, 'value': 'Tristan Allowance', 'label': "Tristan Allowance"},
        { 'icon': Utensils, 'value': 'Lunch', 'label': "Lunch"},
        { 'icon': Utensils, 'value': 'Dinner', 'label': "Dinner"},
        { 'icon': Utensils, 'value': 'Breakfast', 'label': "Breakfast"},
        { 'icon': TreePalm, 'value': 'Leisure', 'label': "Leisure"},
        { 'icon': MessageSquareHeart, 'value': 'Date', 'label': "Date"},
        { 'icon': Utensils, 'value': 'Merienda', 'label': "Merienda"},
        { 'icon': CircleQuestionMark, 'value': 'Others', 'label': "Others"},
      ],
      loader: false
    }
  ),
  getters: {
    total(state) {
      return 
    },
  },
  actions: {
    async getRecentTransaction() {
      this.loader = true;
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/expense')
        this.recentTransaction = response.data.data
      } catch (error) {
        console.log(error)
      } finally {
        this.loader = false
      }
    },
    async getTotalExpense() {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/expense/total')
        this.totalExpense = response.data.data
      } catch (error) {
        console.log(error)
      }
    },
    async createExpenseTransaction(param) {
      this.loader = true;
      try {
          const response = await axios.post(import.meta.env.VITE_API_URL + '/expense/insert', param)
          this.recentTransaction.unshift(response.data.data)
          if(response.data.data.status === 'success') {
            await this.getTotalExpense()
          }
      } catch (err) {
          console.log(err)
      } finally {
        // always runs (cleanup, loading false, etc.)
        this.loader = false
      }
    }
  },
})