<script setup>
import { ref, onMounted, reactive } from 'vue'

const recent_test = reactive([
    {
        amount: '20000'
    },
    {
        amount: '20000'
    },
    {
        amount: '20000'
    },
    {
        amount: '20000'
    },
    {
        amount: '20000'
    },
    {
        amount: '20000'
    },
    {
        amount: '20000'
    },
    {
        amount: '20000'
    },
    {
        amount: '20000'
    },
    {
        amount: '20000'
    },
    {
        amount: '20000'
    },
    {
        amount: '20000'
    },
])

</script>

<template>
    <div class="p-4">
        <div class="text-lg font-semibold text-gray-700 mb-3">Recent Transaction</div>
        <div class="wrapper overflow-y-auto h-125">
            <div class="box flex bg-white rounded-lg shadow-lg h-15 text-gray-700 text-base text-left mb-3 p-3 items-center"
                v-for="t in recent_test">
                <div class="w-1/2 text-center">{{ t['amount'] }}</div>
                <div class="w-1/2 text-center">Menudo</div>
                <div class="w-1/2 text-center">Apr 17, 2025</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
