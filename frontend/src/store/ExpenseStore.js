import { defineStore } from 'pinia'
import axios from 'axios'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useExpenseStore = defineStore('expense', {
  // other options...
  state: () => (
    { 
      totalExpense: 0,
      recentTransaction: []
    }
  ),
  getters: {
    total(state) {
      return 
    },
  },
  actions: {
    async getRecentTransaction() {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/expense')
        this.recentTransaction = response.data.data
      } catch (error) {
        console.log(error)
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
      try {
          const response = await axios.post(import.meta.env.VITE_API_URL + '/expense/insert', param)
          if(response.data.data.status === 'success') {
            await this.getTotalExpense()
          }
      } catch (err) {
          console.log(err)
      }
    }
  },
})