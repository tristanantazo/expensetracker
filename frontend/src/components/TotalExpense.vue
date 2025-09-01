<script setup>

import { ref, onMounted } from 'vue'
import { useExpenseStore } from '../store/ExpenseStore';

const store = useExpenseStore()

function formatAmount(amountStr) {
  const number = typeof amountStr === 'string' ? parseFloat(amountStr.replace(/,/g, '')) : amountStr;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number);
}

onMounted(async () => {
  console.log('get total')
  await store.getTotalExpense();
})
</script>

<template>
  <div class="w-full">
    <div class="mx-auto w-90 items-center gap-x-4 rounded-2xl bg-gray-200 p-5 text-gray-800">
      <div>
          <div class="font-xs">Current Balance</div>
          <div class="text-3xl font-bold pt-1 pb-1">PHP {{ formatAmount(store.getThisMonthTotal) }}</div>
      </div>
      <div class="flex items-center justify-between pt-1">
        <div>
          This Month's Income
        </div>
        <div class="font-semibold">
          WALA!!!
        </div>
      </div>
      <div class="flex items-center justify-between pt-1">
        <div>
          This Month's Expense
        </div>
        <div class="font-semibold">
          PHP {{ formatAmount(store.totalExpense) }}
        </div>
      </div>
    </div>  
  </div>
</template>
