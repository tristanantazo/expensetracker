<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'

const recent_test = ref(null)


onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3301/expense')
    
    console.log(response.data)
    recent_test.value = response.data.data
  } catch (err) {
    console.log(err)
  } finally {
  }
})

</script>

<template>
    <div class="p-4">
        <div class="text-lg font-semibold text-gray-700 mb-3">Recent Transaction</div>
        <div class="wrapper overflow-y-auto h-125">
            <div class="box flex bg-white rounded-lg shadow-lg h-15 text-gray-700 text-base text-left mb-3 p-3 items-center"
                v-for="t in recent_test">
                <div class="w-1/2 text-center">{{ t['amount'] }}</div>
                <div class="w-1/2 text-center">{{ t['note'] }}</div>
                <div class="w-1/2 text-center">{{ t['date'] }}</div>
                <div class="w-1/2 text-center">{{ t['category'] }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
