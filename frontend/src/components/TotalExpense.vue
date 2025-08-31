<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'

const total = ref('');

async function getTotalExpense() {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + '/expense/total')
    let amnt = formatAmount(response.data.data)
    total.value = amnt
  } catch (error) {
    console.log(error)
  }
}

function formatAmount(amountStr) {
  const number = typeof amountStr === 'string' ? parseFloat(amountStr.replace(/,/g, '')) : amountStr;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number);
}

onMounted(async () => {
  await getTotalExpense()
})
</script>

<template>
  <div class="w-full">
    <div class="mx-auto w-90 items-center gap-x-4 rounded-2xl bg-gray-200 p-5 text-gray-800">
      <div>
          <div class="font-xs">Current Balance</div>
          <div class="text-3xl font-bold pt-1 pb-1">PHP {{ total }}</div>
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
          PHP {{ total }}
        </div>
      </div>
    </div>  
  </div>
</template>
