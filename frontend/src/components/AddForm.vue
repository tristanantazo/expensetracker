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
                    <option v-for="(option, id) in categorySelection" :key="id" :value="option.value">
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
import axios from 'axios'

const props = defineProps(['changePage'])

const date = ref('')
const amount = ref('')
const note = ref('')
const category = ref('')
const categorySelection = [
    { 'value': 'Bj Allowance', 'label': "Bj Allowance"},
    { 'value': 'Tristan Allowance', 'label': "Tristan Allowance"},
    { 'value': 'Lunch', 'label': "Lunch"},
    { 'value': 'Dinner', 'label': "Dinner"},
    { 'value': 'Breakfast', 'label': "Breakfast"},
    { 'value': 'Leisure', 'label': "Leisure"},
    { 'value': 'Date', 'label': "Date"},
    { 'value': 'Merienda', 'label': "Merienda"},
    { 'value': 'Others', 'label': "Others"},
]

async function create() {
    try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/expense/insert', {
            note: note.value,
            amount: amount.value,
            date: date.value,
            category: category.value
        })
        console.log(response)
        props.changePage('home');
        //go to all expenses for this day
    } catch (err) {
        console.log(err)
    }
}


async function save() {
    try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/expense/insert', {
            note: note.value,
            amount: amount.value,
            date: date.value,
            category: category.value
        })

        //reload and add notif that the record added
    } catch (err) {
        console.log(err)
    }
}

function validate() {

}

</script>

