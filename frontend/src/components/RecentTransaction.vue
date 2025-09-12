<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useExpenseStore } from '../store/ExpenseStore';

const props = defineProps(['changePayload'])
const store = useExpenseStore()

function changePageHandler(params) {
  props.changePayload(params);
}

function findCategoryIcon(category) {
  const selected = store.categorySelection.find(item => item.value === category);
  return selected ? selected.icon:'';
}

</script>

<template>
    <div class="pr-5 pl-5 text-gray-800">
      <div class="flex items-center justify-between mb-3">
        <div class="text-lg font-bold">Recent Transaction</div>
        <div><button class="text-sm" @click="changePageHandler('all_expenses')"> See All </button></div>
      </div>
        <div class="divide-y wrapper overflow-y-auto bg-gray-200 rounded-2xl px-3 h-75">
            <div @click="changePageHandler('edit_expenses')" class="box border-gray-400 flex text-base text-left py-3 items-center"
            v-for="(t, i) in store.getRecentExpenses" :key="i">
                <div class="mx-3">
                  <component :is="findCategoryIcon(t['category'])" />
                </div>
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
