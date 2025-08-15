<script setup>
import TotalExpense from './components/TotalExpense.vue'
import MenuBar from './components/MenuBar.vue'
import RecentTransaction from './components/RecentTransaction.vue'
import { Plus, CalendarDays, ChartLine, House, Wallet } from 'lucide-vue-next';

import { ref } from 'vue'

let current_payload = ref('home')

function changePayload(payload) {
  current_payload.value = payload;
}
</script>

<template>
  <MenuBar/>
  <Transition name="slide-fade">
    <div class="card" v-if="current_payload == 'home'">
      <TotalExpense/>
      <RecentTransaction/>
    </div>
  </Transition>
  <div class="fixed h-15 text-gray-700 bg-white w-100 bottom-0 flex">
    <div class="w-1/2 text-center">
      <button class="bg-white h-full">
        <House 
          size="20"
          color="red"
        />
      </button>
    </div>
    <div class="w-1/2 text-center">
      <button class="bg-white h-full">
        <ChartLine
          size="20"
          color="red"
        />
      </button>
    </div>
    <div class="w-1/2 text-center">
      <button class="bg-white h-full" @click="changePayload('add')">  
        <Plus
          size="20"
          color="red"
        />
      </button>
    </div>
    <div class="w-1/2 text-center">
      <button class="bg-white h-full">
        <CalendarDays
          size="20"
          color="red"
        />
      </button>
    </div>
    <div class="w-1/2 text-center">
      <button class="bg-white h-full">
        <Wallet
          size="20"
          color="red"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s linear;
}

.slide-fade-leave-active {
  transition: all 0.8s linear;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-900px);
}
</style>
