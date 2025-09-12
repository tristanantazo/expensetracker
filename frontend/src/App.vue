<script setup>
import MenuBar from './components/MenuBar.vue'
import Home from './components/Home.vue'
import AddForm from './components/AddForm.vue';
import EditForm from './components/EditForm.vue';
import UserSetting from './components/UserSetting.vue';
import AllExpenses from './components/AllExpenses.vue';
import { Plus, CalendarDays, ChartLine, House, Wallet } from 'lucide-vue-next';
import { ref, markRaw, watchEffect, onMounted } from 'vue'
import Loader from './components/Loader.vue'
import { useExpenseStore } from './store/ExpenseStore';
import { useUserStore } from './store/UserStore';
const userStore = useUserStore()
const expenseStore = useExpenseStore()
const currentTab = ref(markRaw(Home));
const currentTabName = ref('Home');

function changePayload(payload) {
  currentTab.value = component_map[payload];
  currentTabName.value = payload;
}

const component_map = {
  'home': markRaw(Home),
  'add': markRaw(AddForm),
  'all_expenses': markRaw(AllExpenses),
  'edit_expenses': markRaw(EditForm),
  'user_setting': markRaw(UserSetting),
}

onMounted(async () => {
  try {
    console.log('get all expense')
    await expenseStore.getAllExpenses();
    await userStore.getUserSetting();
  } catch (err) {
    console.log(err)
  }
})

</script>

<template>
  <div class="text-slate-300">
    <Loader v-if="expenseStore.loader"/>
    <MenuBar :page-name="currentTabName" />
    <keep-alive>
      <component :is="currentTab" :changePage="changePayload"/>
    </keep-alive>
    <div class="h-15"></div>
    <div class="fixed h-15 text-gray-700 bg-gray-200 w-100 bottom-0 flex">
      <div class="w-1/2 text-center">
        <button class=" h-full" @click="changePayload('home')">
          <House 
            size="20"
          />
        </button>
      </div>
      <div class="w-1/2 text-center">
        <button class=" h-full">
          <ChartLine
            size="20"
          />
        </button>
      </div>
      <div class="w-1/2 text-center">
        <button class=" h-full" @click="changePayload('add')">  
          <Plus
            size="20"
          />
        </button>
      </div>
      <div class="w-1/2 text-center">
        <button class=" h-full">
          <CalendarDays
            size="20"
          />
        </button>
      </div>
      <div class="w-1/2 text-center">
        <button class=" h-full">
          <Wallet
            size="20"
          />
        </button>
      </div>
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
