<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useExpenseStore } from '../store/ExpenseStore';

const store = useExpenseStore()

onMounted(async () => {
  try {
    console.log('get all expense')
    store.getRecentTransaction()
  } catch (err) {
    console.log(err)
  }
})

</script>

<template>
    <div class="pr-5 pl-5 text-gray-800">
        <div class="text-lg font-bold mb-3">Recent Transaction</div>
        <div class="divide-y wrapper overflow-y-auto bg-gray-200 rounded-2xl px-3 h-75">
            <div class="box border-gray-400 flex text-base text-left py-3 items-center"
            v-for="(t, i) in store.recentTransaction" :key="i">
                <div class="w-1/2">
                  <div class="font-semibold">
                    {{ t['note'] }}
                  </div>
                  <div class="text-xs">
                    {{ t['date'] }}
                  </div>
                </div>
                <div class="w-1/2 text-center">{{ t['amount'] }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
