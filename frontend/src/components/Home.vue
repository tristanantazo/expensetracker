<template>
    <div class="card">
      <TotalExpense/>
      <div class="p-5">
        <div class="text-gray-800 mb-3 flex items-center justify-between">
          <button @click="changePageHandler('add')" class="bg-gray-200 font-semibold w-42 h-16 rounded-2xl flex items-center justify-between">
            <CirclePlus class="mr-2" size="20"/>
            Add Expense
          </button>
          <button class="bg-gray-200 font-semibold w-42 h-16 round-lg flex items-center justify-between">
            <CirclePlus class="mr-2" size="20"/>
            Add Income
          </button>
        </div>
        <div class="text-gray-800 flex items-center justify-between">
          <button class="bg-gray-200 font-semibold w-42 h-16 round-lg flex items-center justify-between">
            <LibraryBig class="mr-2" size="20"/>
            Reports
          </button>
          <button @click="changePageHandler('user_setting')" class="bg-gray-200 font-semibold w-42 h-16 round-lg flex items-center justify-between">
            <Settings class="mr-2" size="20"/>
            Settings
          </button>
        </div>
      </div>
      <RecentTransaction :changePayload="changePageHandler"/>
    </div>
</template>

<script setup>
import { User, Search, CirclePlus, LibraryBig, Settings } from 'lucide-vue-next';
import TotalExpense from './TotalExpense.vue'
import RecentTransaction from './RecentTransaction.vue'

const props = defineProps(['changePage'])

function changePageHandler(params) {
  props.changePage(params);
}

</script>