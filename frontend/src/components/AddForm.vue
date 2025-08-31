<template>
    <div class="px-5 text-black">
        <div class="bg-gray-200 p-5 rounded-2xl w-full max-w-md">
            <div class="mb-4">
                <label for="amount" class="block text-gray-700 font-semibold mb-2">Amount</label>
                <input v-model="amount" type="number" id="amount" name="amount" placeholder="e.g., 45.50" step="0.01" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
            </div>

            <div class="mb-4">
                <label for="date" class="block text-gray-700 font-semibold mb-2">Date</label>
                <input v-model="date" type="date" id="date" name="date" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
            </div>

            <div class="mb-4">
                <label for="category" class="block text-gray-700 font-semibold mb-2">Category</label>
                <select v-model="category" id="category" name="category" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                    <option value="" disabled selected>Select a category</option>
                    <option v-for="(option, id) in store.categorySelection" :key="id" :value="option.value">
                        {{ option.label }}
                    </option>
                </select>
            </div>

            <div class="mb-6">
                <label for="note" class="block text-gray-700 font-semibold mb-2">Note</label>
                <textarea v-model="note" id="note" name="note" rows="3" placeholder="Add a short description..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"></textarea>
            </div>

            <div class="flex">
                <button @click="create" class="w-80 bg-gray-400 mr-3 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">
                    Save
                </button>
                <button @click="save" class="w-50 bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">
                    Continue
                </button>                    
            </div>
        </div>
        <div class="bg-gray-200 my-5 p-5 rounded-2xl w-full max-w-md">
            <div class="font-semibold">
                Previous Created Transaction
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useExpenseStore } from '../store/ExpenseStore';

const props = defineProps(['changePage'])
const store = useExpenseStore()

const date = ref(getTodayPH())
const amount = ref('')
const note = ref('')
const category = ref('')

async function create() {
    try {
        await store.createExpenseTransaction({
            note: note.value,
            amount: amount.value,
            date: date.value,
            category: category.value
        }) 
        props.changePage('home');
    } catch (err) {
        console.log(err)
    }
}

function getTodayPH() {
  const now = new Date()
  // Convert to Philippine time by adding 8 hours (in milliseconds)
  const offset = 8 * 60 * 60 * 1000
  const phDate = new Date(now.getTime() + offset)
  return phDate.toISOString().slice(0, 10)
}

async function save() {
    try {
    } catch (err) {
    }
}

function validate() {

}

</script>

