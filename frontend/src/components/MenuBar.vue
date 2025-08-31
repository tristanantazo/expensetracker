<template>
<div class="text-gray-800 p-5 flex items-center justify-between">
  <div class="text-2xl font-bold">
    <h3>My Expense</h3>
  </div>
  <div>
    <User size="20" class="mx-auto" />
  </div>
</div>

</template>

<script setup>
import { User, Search } from 'lucide-vue-next';
import { ref, defineProps } from 'vue'

const props = defineProps(['pageName'])
console.log(props)
</script>
