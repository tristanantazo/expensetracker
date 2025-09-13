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
      allExpenses: [],
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
      loader: false,
      api_error: '',
      form: {
        amount: 0,
        date: '',
        note: '',
        category: '',
      }
    }
  ),
  getters: {
    getThisMonthExpense(state) {
      const today = new Date()
      
      return state.allExpenses.filter((e, i, a) => {
        const inputDate = new Date(e.date)
        return (
          inputDate.getFullYear() === today.getFullYear() && inputDate.getMonth() === today.getMonth()
        )
      })
    },
    getThisMonthTotal() {
      const total = this.getThisMonthExpense.reduce((sum, item) => {
        return sum + parseFloat(String(item.amount).replace(/,/g, ''))
      }, 0);

      return total;
    },
    getRecentExpenses(state) {
      state.recentTransaction = state.allExpenses.slice(0, 10);

      return state.recentTransaction
    },
    groupByMonthDate(state) {
      const dateMap = {};

      for (const obj of state.allExpenses) {
        const date = obj.date;
        if (!dateMap[date]) {
          dateMap[date] = [];
        }
        dateMap[date].push(obj);
      }

      return dateMap;
    },
    getAPIError(state) {
      return state.api_error;
    }
  },
  actions: {
    async getTotalExpense() {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/expense/total')
        this.totalExpense = response.data.data
      } catch (error) {
        console.log(error)
        this.api_error = error
      }
    },
    async getAllExpenses() {
      this.loader = true;
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/expense')
        this.allExpenses = response.data.data
      } catch (error) {
        console.log(error)
        this.api_error = error
      } finally {
        this.loader = false
      }
    },
    async createExpenseTransaction(param) {

      this.form.date = param.date;
      this.form.note = param.store;
      this.form.amount = param.amount;
      this.form.category = typeof param.category !== "undefined" ? param.category : 'other';

      this.loader = true;
      try {
          const response = await axios.post(import.meta.env.VITE_API_URL + '/expense/insert', this.form)
          this.allExpenses.unshift(response.data.data)
          await this.getAllExpenses();
      } catch (err) {
          console.log(err)
          this.api_error = err
      } finally {
        // always runs (cleanup, loading false, etc.)
        this.loader = false
      }
    }
  },
})