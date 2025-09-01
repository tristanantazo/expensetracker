<template>
    <div class="px-5 text-gray-800">
        <div class="text-lg font-bold mb-3">All Expenses</div>
        <div class="p-5 flex items-center justify-between mb-3">
            <div>
                {{ '<' }}
            </div>
            <div class="font-bold">
                {{ 'September' }}
            </div>
            <div>
                {{ '>' }}
            </div>
        </div>
        <div class="divide-y wrapper overflow-y-auto bg-gray-200 rounded-2xl px-3 h-120">
            <div class="box border-gray-400 flex text-base text-left py-3 items-center"
            v-for="(t, i) in store.getThisMonthExpense" :key="i">
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

        <div class="bg-gray-200 rounded-2xl my-5 p-3 text-center">
            <div class="text-lg">
                Total: 
                <span class="font-semibold">
                    {{ formatAmount(store.getThisMonthTotal) }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useExpenseStore } from '../store/ExpenseStore';

const props = defineProps(['changePage'])
const store = useExpenseStore()

function findCategoryIcon(category) {
  const selected = store.categorySelection.find(item => item.value === category);
  return selected.icon;
}

function formatAmount(amountStr) {
  const number = typeof amountStr === 'string' ? parseFloat(amountStr.replace(/,/g, '')) : amountStr;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number);
}

</script>
