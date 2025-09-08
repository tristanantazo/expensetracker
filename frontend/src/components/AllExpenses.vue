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
        <div class="wrapper overflow-y-auto bg-gray-200 rounded-2xl p-3 h-120">
            <div class="" v-for="(group, group_key) in store.groupByMonthDate" :key="group_key">
              <div class="px-3 bg-gray-200 border-y border-gray-400 flex items-center justify-between">
                <div>
                  {{ getDay(group_key) }}
                </div>
                <div class="mx-4">
                 Total: {{ getTotalForDay(group) }}
                </div>
              </div>
              <div v-for="(e, i) in group" :key="i" class="box border-gray-400 flex text-base text-left py-3 items-center">
                <div class="mx-3">
                  <component :is="findCategoryIcon(e['category'])" />
                </div>
                <div class="w-1/2">
                  <div class="font-semibold">
                    {{ e['note'] }}
                  </div>
                  <div class="text-xs">
                    {{ e['date'] }}
                  </div>
                </div>
                <div class="w-1/2 text-center">{{ e['amount'] }}</div>
              </div>
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

function getTotalForDay(group) {
  const total = group.reduce((sum, item) => {
      return sum + parseFloat(String(item.amount).replace(/,/g, ''))
  }, 0);

  return formatAmount(total);
}

function getDay(params) {
  const date = new Date(params);

  // Get day of the week (e.g. "Thursday")
  const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

  const dayOnly = new Intl.DateTimeFormat('en-US', {
    day: 'numeric'
  }).format(date);

  return dayOnly + ' ' + day
}

function formatAmount(amountStr) {
  const number = typeof amountStr === 'string' ? parseFloat(amountStr.replace(/,/g, '')) : amountStr;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number);
}

</script>
