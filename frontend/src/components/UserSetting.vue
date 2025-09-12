<template>
    <div class="px-5 text-black">
        <div class="bg-gray-200 p-5 rounded-2xl w-full max-w-md">
            <label for="first_name" class="block text-gray-700 font-semibold mb-2">First Name</label>
            <input v-model="firstName" type="input" id="first_name" name="first_name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">

            <label for="last_name" class="block text-gray-700 font-semibold mb-2">Last Name</label>
            <input v-model="lastName" type="input" id="last_name" name="last_name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">

            <div class="py-3">
                <div class="block text-gray-700 mb-2 flex items-center justify-between">
                    <div class="font-semibold">
                        <h3>Accounts</h3>
                    </div>
                    <div class="text-xs">
                        <button @click="triggerModal('account')"> Add account </button>
                    </div>
                </div>
                <div class="wrapper">
                    <div v-for="(data, index) in account" :key="data.id" class="px-3 flex items-center justify-between divide-y text-sm">
                        <div class="w-60 p-1 border-gray-400">
                            {{ data.name }}
                        </div>
                        <div>
                            <Trash class="mr-2" size="15"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-3">
                <div class="block text-gray-700 mb-2 flex items-center justify-between">
                    <div class="font-semibold">
                        <h3>Expense Category</h3>
                    </div>
                    <div class="text-xs">
                        <button @click="triggerModal('category')"> Add category </button>
                    </div>
                </div>
                <div class="wrapper">
                    <div v-for="(data, index) in category" :key="data.id" class="px-3 flex items-center justify-between divide-y text-sm">
                        <div class="w-60 p-1 border-gray-400">
                            {{ data.name }}
                        </div>
                        <div>
                            <Trash class="mr-2" size="15"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex">
                <button @click="saveRecord" class="w-80 bg-gray-400 mr-3 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">
                    Save
                </button>
                <button class="w-50 bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">
                    Continue
                </button>                    
            </div>
        </div>
        <div v-if="modalStatus" class="w-full text-center bg-gray-600/80 fixed inset-0">
            <div class="w-60 bg-gray-200 p-3 rounded-2xl mx-auto fixed top-70 left-20">
                <div class="pb-3">
                    <input v-model="addValue" type="input" id="addValue" name="addValue" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                </div>
                <div class="flex">
                    <button @click="addValueSave" class="w-full bg-gray-400 mr-3 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">
                        Add
                    </button>
                    <button @click="closeModal" class="w-full bg-gray-800 mr-3 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">
                        Close
                    </button>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Trash, Plus } from 'lucide-vue-next';
import { ref, onMounted } from 'vue'
import { useUserStore } from '../store/UserStore';
const store = useUserStore()

const addValue = ref('');
const account = ref(store.account);
const category = ref(store.category);
const addedClick = ref('');
const modalStatus = ref(false);
const firstName = ref(store.first_name);
const lastName = ref(store.last_name);

function addValueSave() {

    let obj = { id: generateId(addValue.value), name: addValue.value };
    if(addedClick.value == 'account') {
        account.value.push(obj)
    } else {
        category.value.push(obj)
    }

    closeModal()
}

function triggerModal(data) {
    console.log(modalStatus.value)
    modalStatus.value = modalStatus.value ? false:true;
    addedClick.value = data;
}

function closeModal() {
    console.log(modalStatus.value)
    modalStatus.value = false;
    addedClick.value = '';
    addValue.value = '';
}

function generateId(data) {
    return data.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '_').toLowerCase();
}

function sampleData() {
    return [
        {'id': 'cash', 'name':'Cash'},
        {'id': 'cc', 'name':'Credit Cash'},
    ]
}

async function saveRecord() {
    await store.saveUser({
        first_name: firstName.value,
        last_name: lastName.value,
        account: account.value,
        category: category.value,
    }) 
}

</script>

<style>

</style>